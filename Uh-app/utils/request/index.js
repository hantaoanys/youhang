import Request from './request'
import {refreshToken} from '@/api/login';
import indexConfig from '@/config/index.config';
import mHelper from '@/utils/helper';
import store from '@/store';

const http = new Request();

// request全局参数设置
http.setConfig((config) => { /* 设置全局配置 */
	config.baseUrl = indexConfig.baseUrl; /* 根域名不同 */
	const systemInfo = uni.getSystemInfoSync();
	config.header = {
		...config.header,
	};
	return config;
});

let isRefreshing = false;
let requests = [];
/* 请求之前拦截器 */
 http.interceptor.request((config) => { 
 console.log( uni.getStorageSync('accessToken'))
	config.header['token'] = uni.getStorageSync('accessToken');
	return config;
}, error => {
	return Promise.reject(error)
})  
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
	console.log(response.data)
	if(response.data.msg&& response.data.msg =='请先登录'){
		mHelper.toast('登录超时，请重新登录');
		store.commit('logout');
		uni.reLaunch({
			url: '/pages/public/login'
		})
	}
	switch (response.data.code) {
		case 200:
			return response;
		case 400:
			mHelper.toast('错误的请求');
			return response;
			break;
		case 401:
			break;
		case 405:
			mHelper.toast('当前操作不被允许');
			return response;
		case 404:
			mHelper.toast(response.data.message);
			return response;
		case 429:
			mHelper.toast('请求过多，先休息一下吧');
			return response;
		case 500:
			mHelper.toast('服务器打瞌睡了');
			return response;
		default:
			return response;
	}
}, (error) => {
	return Promise.reject(error)
});
export {
	http
}
