<template>
	<view class="rf-index">
		<!--搜索导航栏-->
		<!-- <rf-search-bar
				@link="toCategory"
				@search="navToSearch"
				title="分类"
				icon="iconfenlei1"
				:placeholder="hotSearchDefault"/> -->
				
		<!-- 轮播图1 -->
		<view class="swiper inx">
			<view class="swiper-box">
				<rf-swipe-dot :info="carouselList" mode="round" :current="current" :dotsStyles="dotsStyles" >
					<swiper @change="handleDotChange" autoplay="true">
						<swiper-item
								v-for="(item, index) in carouselList"
								@tap="indexTopToDetailPage"
								:key="index">
							<view class="swiper-item">
								<image :src="item.path" mode="scaleToFill"/>
							</view>
						</swiper-item>
					</swiper>
				</rf-swipe-dot>
			</view>
		</view>
		<!--通知-->
		<rf-swiper-slide :list="announceList" class="rf-skeleton">
			<view slot="header" class="swiper-slide-header">
				<view class="titleC">公告</view>
			</view>
		</rf-swiper-slide>
		<!--新闻咨询-->
		<uni-section title="新闻资讯" type="line" subTitle="更多" @tap="more"></uni-section>
		<cell v-for="(newsitem,index2) in newsData.slice(0,3)" :key="newsitem.id">
			<media-item :options="newsitem" @close="close(index1,index2)" @click="goDetail(newsitem)"></media-item>
		</cell>
		<!-- 轮播图1 -->
		<view class="swiper">
			<view class="swiper-box">
				<rf-swipe-dot :info="carouselTeacherList" mode="round" :current="current" :dotsStyles="dotsStyles" >
					<swiper @change="handleDotChange" autoplay="true">
						<swiper-item
								v-for="(item, index) in carouselTeacherList"
								@tap="indexTopToDetailPage"
								:key="index">
							<view class="swiper-item">
								<image :src="item.path" mode="scaleToFill"/>
							</view>
						</swiper-item>
					</swiper>
				</rf-swipe-dot>
			</view>
		</view>
		<!-- <view class="uni-list">
			<view>
				<text>新闻咨询</text>
				<text>更多</text>
			</view>
			<view class="lsit">
				
			</view>
		</view> -->
		<!--网站备案号-->
		<!--页面加载动画-->
		<rf-loading v-if="loading"></rf-loading>
	</view>
</template>
<script>
    /**
     * @des 首页
     */
	import mediaItem from '@/components/tabbar/news-item.nvue';
	import uniCard from '@/components/uni-card/uni-card.vue'
	import {imgList} from '@/api/product';
	import {imgTeacherList} from '@/api/product';
	import {indexNews} from '@/api/basic';
    import {indexList} from '@/api/product';
    import rfSwipeDot from '@/components/rf-swipe-dot';
    import rfFloorIndex from '@/components/rf-floor-index';
    import rfSearchBar from '@/components/rf-search-bar';
    import rfSwiperSlide from '@/components/rf-swiper-slide';
    import {notifyAnnounceIndex} from '@/api/basic';
    import rfCountDown from '@/components/rf-count-down';
	import uniSection from '@/components/uni-section/uni-section.vue'
    export default {
        components: {mediaItem,uniSection,rfFloorIndex, rfSwipeDot, rfSearchBar, rfSwiperSlide, rfCountDown,uniCard},
        data() {
            return {
				dotsStyles:{
					selectedBackgroundColor:'#2E3192',
					selectedBorder:'#2E3192',
				},
                current: 0, // 轮播图index
                carouselList: [], // 广告图
				carouselTeacherList: [],
                hotProductList: [], // 热门商品列表
                recommendProductList: [], // 推荐商品列表
                guessYouLikeProductList: [], // 猜你喜欢商品列表
                newProductList: [], // 新品上市商品列表
                productCateList: [],  // 商品栏目
                config: {}, // 商户配置
                announceList: [], // 公告列表
                loading: true,
                hotSearchDefault: '请输入关键字',
                newsBg: this.$mAssetsPath.newsBg,
                errorImage: this.$mAssetsPath.errorImage,
				newsData: [
					/* {
					"datetime": "一天前",
					"article_type": 2,
					"title": "中国技术界小奇迹：HBuilder开发者突破200万",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				}, {
					"datetime": "一天前",
					"article_type": 2,
					"title": "DCloud完成B2轮融资，uni-app震撼发布!",
					"image_url": "https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg?imageView2/3/w/200/h/100/q/90",
					"source": "DCloud",
					"comment_count": 11395
				}, */
				],//新闻
            };
        },
        onShow() {
            this.initData();
        },
        computed: {
            // 计算倒计时时间
            second() {
                return function (val) {
                    return Math.floor(15 * 60 - (new Date() / 1000 - val))
                }
            }
        },
        onShareAppMessage() {
            return {
                title: '欢迎来到优航',
                path: '/pages/index/index'
            }
        },
        filters: {
            filterDiscountPrice(val) {
                const price = val.product && val.product.price * val.discount / 100;
                switch (val.decimal_reservation_number) {
                    case 0:
                        return (Math.floor(price * 100) / 100).toFixed(2);
                    case 1:
                        return (Math.floor(price * 100) / 100).toFixed(0);
                    case 2:
                        return (Math.floor(price * 100) / 100).toFixed(1);
                    default:
                        return (Math.floor(price * 100) / 100).toFixed(2);
                }
            }
        },
        //下拉刷新
        onPullDownRefresh() {
            this.getIndexList('refresh');
			this.getTeacherIndexList('refresh');
			this.getNotifyAnnounceIndex('refresh');
			this.getNewsIndexList('refresh');
        },
        methods: {
			goDetail(e) {
				console.log(e)
			    if (this.navigateFlag) {
			        return;
			    }
			    this.navigateFlag = true;
			    uni.navigateTo({
			        url: './../category/detail/detail?id=' + e.id
			    });
			    setTimeout(() => {
			        this.navigateFlag = false;
			    }, 200)
			},
			more() {
                console.log('点击了更多')
				this.$mRouter.reLaunch({route: '/pages/category/category'});
            },
            // 监听轮播图切换
            handleDotChange(e) {
                this.current = e.detail.current
            },
            // 数据初始化
            initData() {
              this.getIndexList();
			  this.getTeacherIndexList();
			  this.getNotifyAnnounceIndex();
			  this.getNewsIndexList();
            },
            // 通用跳转
            navTo(route) {
                this.$mRouter.push({route});
            },
            // 通用跳转
            navToSearch() {
                this.$mRouter.push({route: `/pages/index/search/search?data=${JSON.stringify(this.search)}`});
            },
            // 跳至广告图指定页面
            indexTopToDetailPage() {
				console.log(1)
                if (isNaN(parseInt(data.id, 10))) {
                    // #ifdef  APP-PLUS
		                window.location.href = data.id;
										// #endif
                }
                let url;
                let type;
                let id;
                if (!link) {
                    type = data.type;
                    id = data.id;
                } else {
                    id = link;
                    type = data;
                }
                switch (type) {
                    case 'product_view':  // 产品详情
                        url = `/pages/product/product?id=${id}`;
                        break;
                    case 'article_view':  // 文章详情
                        this.$mHelper.toast('article_view');
                        break;
                    case 'coupon_view': // 优惠券详情
                        url = `/pages/user/coupon/detail?id=${id}`;
                        break;
                    case 'helper_view': //   站点帮助详情
                        this.$mHelper.toast('helper_view');
                        break;
                    case 'product_list_for_cate': // 某分类下产品列表
                        url = `/pages/product/list?cate_id=${id}`;
                        break;
                    default:
                        break;
                }
                if (url) {
			              this.$mRouter.push({route: url});
                }
            },
            // 获取主页数据
            async getIndexList(type) {
				console.log(`${imgList}`)
                await this.$http.get(`${imgList}`, {}).then(async r => {
                    this.loading = false;
                    if (type === 'refresh') {
                        uni.stopPullDownRefresh();
                    }
					console.log(r)
					this.carouselList = r.data.rows;
					console.log(this.carouselList)
                    // 获取公告列表
                    // await this.getNotifyAnnounceIndex(); 
                    // 首页参数赋值
                    /* this.initIndexData(r.data); */
                }).catch(() => {
                    this.loading = false;
                    if (type === 'refresh') {
                        uni.stopPullDownRefresh();
                    }
                })
            },
			// 获取教师轮播图
			async getTeacherIndexList(type) {
				console.log(`${imgTeacherList}`)
			    await this.$http.get(`${imgTeacherList}`, {}).then(async r => {
			        this.loading = false;
			        if (type === 'refresh') {
			            uni.stopPullDownRefresh();
			        }
					this.carouselTeacherList = r.data.rows;
					console.log(this.carouselTeacherList)
			    }).catch(() => {
			        this.loading = false;
			        if (type === 'refresh') {
			            uni.stopPullDownRefresh();
			        }
			    })
			},
			
			// 获取新闻前三条
			async getNewsIndexList(type) {
				console.log(`${indexNews}`)
			    await this.$http.get(`${indexNews}`, {}).then(async r => {
			        this.loading = false;
			        if (type === 'refresh') {
			            uni.stopPullDownRefresh();
			        }
			        for (var i = r.data.rows.length - 1; i >= 0; i--) {
			        	r.data.rows[i].newsType =2;
			        }
					this.newsData = r.data.rows;
					console.log(this.newsData)
			    }).catch(() => {
			        this.loading = false;
			        if (type === 'refresh') {
			            uni.stopPullDownRefresh();
			        }
			    })
			},
            // 首页参数赋值
            initIndexData(data) {
                this.productCateList = data.cate;
                this.carouselList = data.adv;
				this.carouselTeacherList = data.teacher;
				this.newsData = data.indexNews;
                this.search = data.search;
                uni.setStorageSync('search', this.search);
                this.hotSearchDefault = '请输入关键字' + (data.search.hot_search_default ? `如: ${data.search.hot_search_default}` : '');
                uni.setStorage({
                    key: 'hotSearchDefault',
                    data: data.search.hot_search_default
                });
                this.hotProductList = data.product_hot;
                this.recommendProductList = data.product_recommend;
                this.guessYouLikeProductList = data.guess_you_like;
                this.newProductList = data.product_new;
                this.config = data.config;
            },
            // 获取通知列表
            async getNotifyAnnounceIndex() {
                await this.$http.get(`${notifyAnnounceIndex}`).then(r => {
                    this.announceList = r.data.rows
                })
				// this.announceList = [{cover: "",created_at: "1584588580",id: "2",synopsis: "",title: "RageFrame 微商城新功能上线了",view: "0"}]
            },
            // 跳转至商品详情页
            navToDetailPage(data) {
                const {id} = data;
                if (!id) return;
                this.$mRouter.push({route: `/pages/product/product?id=${id}`});
            },
            // 跳转至分类页
            toCategory() {
                this.$mRouter.switchTab({route: '/pages/category/category'});
            }
        }
    }
</script>
<style lang="scss" scoped>
	.rf-index {
		background-color: '$color-white';
		/*爆款拼团*/
		.wrapper {
			background: #fff;
			border-radius: 10upx;

			.sec-header {
				padding: 10upx 0;
				display: flex;
				justify-content: space-between;
				align-items: center;
				line-height: 40upx;
				margin: 0 30upx;
				font-size: $font-lg;
				font-weight: 600;
				border-bottom: 1upx solid rgba(0, 0, 0, 0.05);

				.more {
					font-size: $font-sm;
					color: $font-color-light;
					font-weight: normal;
				}
			}

			.h-list {
				white-space: nowrap;
				margin: 20upx 0;
				height: 290upx;

				.h-item {
					display: inline-block;
					font-size: $font-sm;
					width: 220upx;
					height: 180upx;
					margin-right: 20upx;
					border-radius: 10upx;

					.h-item-img {
						width: 100%;
						height: 100%;
						border-top-left-radius: 12upx;
						border-top-right-radius: 12upx;
					}

					.h-item-text {
						margin: 10upx 0 5upx;
					}

					.last-line {
						margin-bottom: 5upx;
						display: flex;
						justify-content: space-between;
						align-items: center; /* 垂直居中 */
						.red {
							color: $base-color;
							font-size: $font-sm;
							margin-right: 4upx;
						}
					}

					.price {
						font-size: $font-base;
						color: $base-color;
						line-height: 1;

						&:before {
							content: '￥';
							font-size: 26upx;
						}

						.m-price {
							margin-left: 8upx;
							color: $font-color-light;
							font-size: $font-sm;
							text-decoration: line-through;
						}
					}
				}

				image {
				}
			}
		}

		.wrapper-pt {
			padding: 0 30upx;

			.sec-header {
				margin: 0;
			}
		}

		/*轮播图*/
		
		.swiper {
			width: 100%;
			margin-top: 10upx;
			display: flex;
			justify-content: center;

			.swiper-box {
				width: 96%;
				height: 30vw;
				overflow: hidden;
				border-radius: 15upx;
				box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
				//兼容ios，微信小程序
				position: relative;
				z-index: 1;

				swiper {
					width: 100%;
					height: 40vw;

					swiper-item {
						image {
							width: 100%;
							height: 40vw;
						}
					}
				}
			}
		}
		.inx{
			.swiper-box {
				width: 100% !important;
				box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2);
				/* border-bottom: 1px #03A9F4 solid; */
				border-radius:0upx;
				padding-bottom:5upx;
			}	
		}
		/*轮播图2*/
		.swiper-item-text {
			position: absolute;
			bottom: 16upx;
			left: 30upx;
			height: 48upx;
			line-height: 48upx;
			background: rgba(0, 0, 0, 0.2);
			width: 90%;
			color: $color-white;
			border-bottom-left-radius: 12upx;
			padding-left: 20upx;
		}
		/*新闻通知*/
		.swiper-slide-header {
			width: 120upx;
			height: 80upx;
			line-height: 88upx;
			.swiper-slide-image {
				width: 100%;
				height: 30upx;
			}
			.titleC{
				padding-left: 40upx;
				font-size: 30upx;
				line-height: 80upx;
				
			}
		}
		/*分类列表*/
		.category-list {
			width: 100%;
			padding: $spacing-base;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			min-height: 80upx;
			.category {
				width: calc(20% - 20upx);
				display: flex;
				flex-wrap: wrap;
				.img {
					width: 100%;
					display: flex;
					justify-content: center;
					image {
						width: 9vw;
						height: 9vw;
					}
				}
				.text {
					margin-top: 16upx;
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 24upx;
					color: #3c3c3c;
				}
			}
		}

		/*版权显示*/
		.copyright {
			margin: 10upx 0;
			width: 100%;
			text-align: center;
			color: #666;

			a {
				display: block;
				color: #666;
				text-decoration: none;
			}
		}
		/*限时抢购*/
		.order-item {
			display: flex;
			flex-direction: column;
			background: #fff;
			padding: 0 30upx;
			margin-bottom: 20upx;

			.goods-box-single {
				display: flex;
				padding: 40upx 10upx 10upx;
				height: 330upx;
				border-radius: 12upx;
				margin-top: 20upx;
				box-shadow: 2px 2px 10px rgba(66, 135, 193, 0.2); // 阴影
				border-bottom: 1px solid rgba(0, 0, 0, 0.05); // 边框
				position: relative;

				.goods-img {
					display: block;
					border-radius: 12upx;
					width: 190upx;
					height: 200upx;
				}

				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					padding: 0 30upx 0 24upx;
					overflow: hidden;

					.title {
						font-weight: bold;
						line-height: 1.2;
						margin: 10upx 0;
					}

					.attr-box {
						line-height: 1.2;
						margin-bottom: 8upx;
						margin-left: 10upx;
					}

					.last-line {
						margin-top: 3upx;
						display: flex;
						justify-content: space-between;
						align-items: center; /* 垂直居中 */
						.red {
							color: $base-color;
							margin-right: 4upx;
						}
					}

					.price {
						font-size: $font-lg;
						color: $uni-color-error;
						line-height: 1;

						&:before {
							content: '￥';
							font-size: 26upx;
						}

						.m-price {
							margin-left: 8upx;
							color: $font-color-light;
							font-size: $font-sm;
							text-decoration: line-through;
						}
					}

					.triangle-wrapper {
						position: absolute;
						overflow: hidden;
						top: 0;
						right: 0;
						border-radius: 12upx;

						.triangle {
							color: #5eba8f;
							width: 0;
							height: 0;
							border-top: 120upx solid $base-color;
							opacity: 0.8;
							border-left: 120upx solid transparent;
						}

						.triangle-content {
							position: absolute;
							top: 28upx;
							right: 0;
							transform: rotate(45deg);
							font-size: $font-sm - 2upx;
							color: #fff;
						}
					}
				}
			}

			.action-box {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				height: 90upx;
				position: relative;

				.discount-time {
					font-size: $font-sm;
					color: $uni-color-success;
					margin-right: 20upx;
				}
			}

			.action-btn {
				height: 50upx;
				margin-left: 10upx;
				display: flex;
				justify-content: center;
				align-items: center;
				padding: 10upx 24upx;
				font-size: $font-sm + 2upx;

				&.recom {
					background: $base-color;
					color: #fff;

					&:after {
						border-color: #f7bcc8;
					}
				}
			}
		}
	}
</style>
