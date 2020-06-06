/**
 *@des 公用基础
 *@author stav stavyan@qq.com
 *@blog https://stavtop.club
 *@date 2019/11/19 14:56:57
 *@param registerByPass
 */

// 获取省市区列表
const provinceList = '/tiny-shop/v1/common/provinces/index';
// 收藏商品
const collectCreate = '/tiny-shop/v1/common/collect/create';
// 删除收藏商品
const collectDel = '/tiny-shop/v1/common/collect/delete';

// 分享/转发
const transmitCreate = '/tiny-shop/v1/common/transmit/create';

// 广告
const advList = '/tiny-shop/v1/common/adv/index';

// 配置
const configList = '/tiny-shop/v1/common/config/index';

// 充值
const payCreate = '/tiny-shop/v1/common/pay/create';

// 充值配置
const wechatConfig = '/tiny-shop/v1/third-party/wechat-js-sdk';

// 公告
// 公告列表
const notifyAnnounceIndex = '/app/notice/list';
// 公告详情
const notifyAnnounceView = '/app/notice';

//新闻首页前三条
const indexNews = '/system/news/list'
//新闻详情
const indexNewsDetile = '/system/news/'


export {
	indexNewsDetile,
    provinceList,
    collectCreate,
    collectDel,
    transmitCreate,
    advList,
    payCreate,
    configList,
    wechatConfig,
    notifyAnnounceIndex,
    notifyAnnounceView,
	indexNews
};
