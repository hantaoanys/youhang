<template>
	<view class="root">
		<view class="uni-padding-wrap">
			<view class="uni-title">
				<text class="title">{{form.newsTitle}}</text>
				<view class="title-icon">
					<view class="app-font iconfenleiliebiao icon">
						<text  class="title-text">{{form.newsType}}</text>
					</view>
					<view class="app-font iconicon-test icon">
						<text  class="title-text">{{form.updateTime}}</text>
					</view>
				</view>
			</view>
			<view class="ql-container ql-snow">
				<rich-text class="ql-editor" :nodes="newsBody" style="font-size: 14px;"></rich-text> 
			</view>
			<view class="icon-botton">
				<view class="app-font iconyanjing icon">
					<text class="title-text">{{form.viewNumber}}</text>
				</view>
				<view class="app-font iconjianyi icon">
					<text class="title-text">{{form.commentNumber}}</text>
				</view>
				<view class="app-font icondianzan icon">
					<text class="title-text">{{form.likeNumber}}</text>
				</view>
			</view>
			
		</view>
		<view class="comment">
			<text class="title">评价</text>
			<view class="text">
				<view class="empty-content" v-if="form.newComment.length ==0">
					<i class="iconfont iconnodata-search"></i>
					<text class="empty-content-info">暂无评价</text>
				</view>
				<view else class="content">
					<review :reviewMsg="form.newComment" ></review>
				</view>
			</view>
		</view>
		<view class="bottom-view">
			<view class="buon" @click="czlc('sc')">
				<i class="app-font iconshoucang icon clk-icon" :class="{'onCol':form.collect}"></i>
				收藏
			</view>
			<view class="buon" @click="czlc('fx')">
				<i class="app-font iconfenxiang1 icon clk-icon" ></i>
				分享
			</view>
			<view class="buon" @click="czlc('dz')">
				<i class="app-font icondianzan icon clk-icon" :class="{'onCol':form.like}"></i>
				点赞
			</view>
			<view class="plput">
				 <view class="uni-input"  @click="togglePopup('center', 'tip')">
					 请输入评论
				 </view>
			</view>
		</view>
		<rf-loading v-if="loading"></rf-loading>
		<uni-popup ref="showtip" :type="type" :mask-click="false" @change="change">
			<view class="uni-tip">
				<text class="uni-tip-title">评论</text>
				<view class="uni-tip-content">
					<view class="uni-textarea">
						<textarea  placeholder="请输入评论内容" v-model="contett"/>
					</view>
				</view>
				<view class="uni-tip-group-button">
					<text class="uni-tip-button" @click="cancel('tip')">取消</text>
					<text class="uni-tip-button" @click="ckgtitle()">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>
<script>
	import rfSwipeDot from '@/components/rf-swipe-dot';
	import rfFloorIndex from '@/components/rf-floor-index';
	import rfSearchBar from '@/components/rf-search-bar';
	import rfSwiperSlide from '@/components/rf-swiper-slide';

	import rfCountDown from '@/components/rf-count-down';

	
	import uniSection from '@/components/uni-section/uni-section.vue'
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	import review from '@/components/dl-review/review.vue';
	/* import review from '@/components/dl-review/item' */
	import 'quill/dist/quill.core.css'
	import 'quill/dist/quill.snow.css'
	import 'quill/dist/quill.bubble.css'
	import { Base64 } from 'js-base64';
	import htmlParser from '@/common/html-parser'
	import {indexNewsDetile} from '@/api/basic';
	function parseImgs(nodes) {
		nodes.forEach(node => {
			if (
				node.name === 'img' &&
				node.attrs &&
				node.attrs['data-img-size-val']
			) {
				const sizes = node.attrs['data-img-size-val'].split(',')
				const width = uni.upx2px(720 * 0.9)
				const height = parseInt(width * (sizes[1] / sizes[0]))
				node.attrs.style = `width:${width};height:${height};`
			}
			if (Array.isArray(node.children)) {
				parseImgs(node.children)
			}
		})
		return nodes
	}
	export default {
		components: {
			review,
			uniSection,
			uniPopup,
			uniIcons,
			rfFloorIndex, rfSwipeDot, rfSearchBar, rfSwiperSlide, rfCountDown,
		},
		data() {
			return {
				type: '',
				isShowCompile: false,
				// 列表详情数据
				childData: [],
				// 评论列表
				reviewMsg: [],
				contett: '',
				id: '',
				loading:true,
				newsBody: null,
				form: null,
				userInfo: { // 用户信息
				    
				},
				hasLogin: false
			}
		},
		onPullDownRefresh() {
			  console.log(11111111)
	
		},
		methods: {
			czlc(type){
				if (!this.hasLogin) {
				    uni.showModal({
				        content: '你暂未登陆，是否跳转登录页面？',
				        success: (confirmRes) => {
				            if (confirmRes.confirm) {
				                this.$mRouter.push({route: '/pages/public/logintype'});
				            }
				        }
				    });
				} else {
				    if(type=='sc'){
						this.scdz('/system/collect/app','收藏成功')
					}else if(type=='fx'){
						
					}else if(type=='dz'){
						this.scdz('/system/like/app','点赞成功')
					}
				}
			},
			togglePopup(type, open) {
				console.log(this.hasLogin)
				if (!this.hasLogin) {
				    uni.showModal({
				        content: '你暂未登陆，是否跳转登录页面？',
				        success: (confirmRes) => {
				            if (confirmRes.confirm) {
				                this.$mRouter.push({route: '/pages/public/logintype'});
				            }
				        }
				    });
				} else {
				    console.log(open)
				    this.type = type
				    this.$nextTick(() => {
				    	this.$refs['show' + open].open()
				    })
				}
				
			},
			async scdz(url,text){
				var param ={
					newsId:this.id,
					userId:this.userInfo.userId, 
				}
				
				await this.$http.post(url, JSON.stringify(param)).then(r => {
					console.log(111111111)
					console.log(r)
					this.$mHelper.toast(r.data.msg);
					this.$refs['showtip'].close()
					this.getDetileRf(this.id) 
				}); 
			},
			async ckgtitle(){
				var param ={
					comment: this.contett,
					 newsId:this.id,
					userId:this.userInfo.userId, 
				}
				await this.$http.post('/system/comment/app', JSON.stringify(param)).then(r => {
					this.$mHelper.toast(`评论成功`);
					this.$refs['showtip'].close()
					this.getDetileRf(this.id) 
				}); 
			},
			cancel(type) {
				this.$refs['show' + type].close()
			},
			change(e) {
				console.log('是否打开:' + e.show)
			},
			plck(){
				this.isShowCompile = true;
			},
			//输入内容
			onConfirm(value) {
			  console.log(value);
			},
			//更新输入框的状态
			onUpdate(event) {
			  this.isShowCompile = event;
			},
			async getDetile(id) {
				 await this.$http.get(`${indexNewsDetile}`+id, {}).then(async r => {
					this.loading = false;
					let  data =Base64.decode(r.data.data.newsBody);
					const nodes = htmlParser(data);
					parseImgs(nodes)
					this.newsBody = nodes;
					this.form =r.data.data;
				 }).catch(() => {
					 this.loading = false;
				 })
			 },
			 async getDetileRf(id) {
			 	 await this.$http.get(`/system/news/app/`+id, {}).then(async r => {
			 		this.loading = false;
			 		let  data =Base64.decode(r.data.data.newsBody);
			 		const nodes = htmlParser(data);
			 		parseImgs(nodes)
			 		this.newsBody = nodes;
			 		this.form =r.data.data;
			 	 }).catch(() => {
			 		 this.loading = false;
			 	 })
			  },
		},
		onLoad(e) {
			this.hasLogin = this.$mStore.getters.hasLogin;
			this.userInfo= uni.getStorageSync('userInfo')
			console.log(e.id)
			this.id = e.id;
			this.getDetile(e.id) 
			
		}
		
	}
</script>
<style lang="scss">
	/* #ifndef APP-NVUE */
	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}
	
	view {
		font-size: 14px;
		line-height: inherit;
	}

	.example {
		padding: 0 15px 15px;
	}

	.example-info {
		padding: 15px;
		color: #3b4144;
		background: #ffffff;
	}

	.example-body {
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
	}

	/* #endif */
	.example {
		padding: 0 15px;
	}

	.example-info {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 15px;
		color: #3b4144;
		background-color: #ffffff;
		font-size: 14px;
		line-height: 20px;
	}

	.example-info-text {
		font-size: 14px;
		line-height: 20px;
		color: #3b4144;
	}


	.example-body {
		flex-direction: column;
		padding: 15px;
		background-color: #ffffff;
	}

	.word-btn-white {
		font-size: 18px;
		color: #FFFFFF;
	}

	.word-btn {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
		justify-content: center;
		border-radius: 6px;
		height: 48px;
		margin: 15px;
		background-color: #007AFF;
	}

	.word-btn--hover {
		background-color: #4ca2ff;
	}


	.example-body {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		padding: 5px 15px;
	}

	.button {
		flex: 1;
		margin: 10px 0;
	}

	.popup-content {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		background-color: #fff;
		padding: 15px;
		font-size: 14px;
	}

	/* 提示窗口 */
	.uni-tip {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		padding: 15px;
		width: 300px;
		background-color: #fff;
		border-radius: 10px;
	}

	.uni-tip-title {
		margin-bottom: 10px;
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		/* padding: 15px;
*/
		font-size: 14px;
		color: #666;
	}

	.uni-tip-group-button {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		margin-top: 20px;
	}

	.uni-tip-button {
		flex: 1;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}

	/* 插屏广告 */
	.uni-image {
		position: relative;
	}

	.image {
		width: 200px;
		height: 200px;
	}

	.uni-image-close {
		margin-top: 20px;
		text-align: center;
	}

	/* 底部分享 */
	.uni-share {
		/* #ifndef APP-NVUE */
		display: flex;
		flex-direction: column;
		/* #endif */
		background-color: #fff;
	}

	.uni-share-title {
		line-height: 60rpx;
		font-size: 24rpx;
		padding: 15rpx 0;
		text-align: center;
	}

	.uni-share-content {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: center;
			padding: 15px;
		}
	
		.uni-share-content-box {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: column;
			align-items: center;
			width: 200rpx;
		}
	
		.uni-share-content-image {
			/* #ifndef APP-NVUE */
			display: flex;
			/* #endif */
			flex-direction: row;
			justify-content: center;
			align-items: center;
			width: 60rpx;
			height: 60rpx;
			overflow: hidden;
			border-radius: 10rpx;
		}
	
		.content-image {
			width: 60rpx;
			height: 60rpx;
		}
	
		.uni-share-content-text {
			font-size: 26rpx;
			color: #333;
			padding-top: 5px;
			padding-bottom: 10px;
		}
	
		.uni-share-btn {
			height: 90rpx;
			line-height: 90rpx;
			font-size: 14px;
			border-top-color: #f5f5f5;
			border-top-width: 1px;
			border-top-style: solid;
			text-align: center;
			color: #666;
		}
	.root{
		/* display: flex; */
	}
	.plput{
		width:55%;
	}
	.onCol{
		color: red;
	}
	.comment{
		min-height:350upx;
		margin:20upx 20upx 105upx 20upx;
		padding: 20upx ;
		background: #fff;
		.title{
			padding-left: 10upx;
			border-left: 6upx solid #3e7af6;
				
		}
		.text{
			.empty-content {
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				line-height:1; 
				.empty-content-info {
					font-size: $font-base - 2upx;
				}
				.iconfont {
					font-size: 180upx;
					color: $base-color;
				}
				&-image {
					width: 200upx;
					height: 200upx;
				}
			}
			.content {
				width: 100%;
				height: 100%;
			}
			.logo {
				height: 200rpx;
				width: 200rpx;
				margin-top: 200rpx;
				margin-left: auto;
				margin-right: auto;
				margin-bottom: 50rpx;
			}
			
			.text-area {
				display: flex;
				justify-content: center;
			}
			
			.title {
				font-size: 36rpx;
				color: #8f8f94;
			}
		};
		
	}
	.icon-botton{
		display: flex;
		justify-content: center;
		.icon{
			padding: 0upx 10upx;
			.title-text{
				padding: 0upx 10upx;
			}
		}
		
	}
	.ql-container.ql-snow {
	    border: 0px solid #ccc;
	}
	.uni-padding-wrap{
		padding: 15upx 30upx 50upx 30upx;
		background-color: #fff;
	}
	.title{
		font-size: 30upx;
		font-weight: 500;
	}
	.title-icon{
			font-size: 20upx;
			display: flex;
			padding: 15upx 0upx;
			justify-content: space-between;
			
	}
	.title-text{
		padding: 0upx 10upx;
	}
	.icon{
		font-size: 25upx;
	}
	.bottom-view{
		    position: fixed;
		    left: 0px;
		    bottom: 0px;
		    z-index: 95;
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
		    -webkit-box-pack: justify;
		    -webkit-justify-content: space-between;
		    justify-content: space-between;
		    -webkit-box-align: center;
		    -webkit-align-items: center;
		    align-items: center;
		    width: 100%;
		    height: 42px;
		    background: #fff;
			.buon{
				width: 18%;
				height: 42px;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction:column;
				font-size: 23upx;
				color: #999999;
				/* border-right: #dadada 1rpx solid; */
				.clk-icon{
					font-size: 42upx;
				}
			}
			 .buon:after {
			            content: '';                 /*CSS伪类用法*/
			            position: absolute;         /*定位背景横线的位置*/
			            right: 0;
			            background: #dadada;       /*宽和高做出来的背景横线*/
			            width: 1px;
			            height: 80%;
			        }
		
			
		   /* -webkit-box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5);
		    box-shadow: 0 0 9px 0 rgba(0, 0, 0, 0.5); */
	}
	.uni-input{
		height: 30px;
		background-color: #e4e4e4;
		border-radius: 14px;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		padding-left:10upx ;
		justify-content: center;
		color: #adabab; 
	}
	    
</style>
