import Vue from 'vue'
import Vuex from 'vuex'

import $mRoutesConfig from '@/config/routes.config'
import $mRouter from '@/utils/router'

Vue.use(Vuex);

const ACCESSTOKEN = uni.getStorageSync('accessToken') || '';
const REFERRER = uni.getStorageSync('referrer') || '';
const USER = uni.getStorageSync('userInfo') || {};
const REFRESHTOKEN = uni.getStorageSync('refreshToken') || '';

const store = new Vuex.Store({
    state: {
        //用户token
        accessToken: ACCESSTOKEN,
        //用户信息
        userInfo: USER,
        //推荐人
        referrer: REFERRER,
        //小程序openid
        openId: '',
        //网络状态，用于下载提醒
        networkState: 'unknown',
        refreshToken: REFRESHTOKEN
    },
    getters: {
		// 获取网络状态
		networkStatus: state => {
			return state.networkState;
		},
        // 判断用户是否登录
        hasLogin: state => {
            if (state.accessToken) {
                return true;
            } else {
                return false
            }
        }
    },
    mutations: {
        login(state, provider) {
			console.log(provider)
			state.accessToken=provider.token;
			/* state.refreshToken=provider.refresh_token; */
			let userInfo={
				"userName":provider.userName,
				"phonenumber":provider.phonenumber,
				"userId":provider.userId,
			}
			uni.setStorageSync('accessToken', provider.token);
			/* uni.setStorageSync('refreshToken', provider.refresh_token); */
			uni.setStorageSync('userInfo', userInfo);
        },
        logout(state) {
            state.accessToken = '';
            state.refreshToken = '';
            state.userInfo = {};
            uni.removeStorageSync('accessToken');
            uni.removeStorageSync('refreshToken');
            uni.removeStorageSync('userInfo');
        },
        setReferrer(state, referrer) {
            state.referrer = referrer;
            uni.setStorageSync('referrer', referrer);
        },
        setOpenId(state, openId) {
            state.openId = openId;
            uni.setStorageSync('openId', openId);
        },
        setNetworkState(state, provider) {
            state.networkState = provider;
        }
    },
    actions: {
        networkStateChange({commit}, info) {
            commit('setNetworkState', info);
        },
        reLogin({commit}, info) {
            commit('logout', '');
            $mRouter.redirectTo({
                route: $mRoutesConfig.login
            });
        },
        logout({commit}, info) {
            commit('logout');
        }
    }
})

export default store