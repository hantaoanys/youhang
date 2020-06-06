
var isReady=false;var onReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/index/notice/notice","pages/index/notice/detail","pages/index/search/search","pages/category/category","pages/cart/cart","pages/user/user","pages/user/userinfo/userinfo","pages/user/collection/collection","pages/user/footprint/footprint","pages/user/coupon/coupon","pages/user/coupon/detail","pages/user/coupon/list","pages/user/address/address","pages/user/address/manage","pages/user/money/pay","pages/user/money/success","pages/user/account/recharge","pages/user/account/account","pages/user/account/bill","pages/user/account/integral","pages/set/set","pages/set/authorization/list","pages/set/feedback/detail","pages/set/feedback/list","pages/set/feedback/feedback","pages/set/about/about","pages/set/about/detail","pages/set/invoice/list","pages/set/invoice/invoice","pages/set/invoice/manage","pages/product/list","pages/product/product","pages/order/order","pages/order/refund","pages/order/search","pages/order/refund/refund","pages/order/evaluation/evaluation","pages/order/evaluation/list","pages/order/detail","pages/order/create/order","pages/order/shipping/shipping","pages/order/shipping/return","pages/public/register","pages/public/login","pages/public/logintype","pages/public/password"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"RF微商城","navigationBarBackgroundColor":"#FFFFFF","backgroundColor":"#f8f8f8"},"tabBar":{"color":"#C0C4CC","selectedColor":"#fa436a","borderStyle":"black","backgroundColor":"#ffffff","list":[{"pagePath":"pages/index/index","iconPath":"static/tab-home.png","selectedIconPath":"static/tab-home-current.png","text":"首页"},{"pagePath":"pages/category/category","iconPath":"static/tab-cate.png","selectedIconPath":"static/tab-cate-current.png","text":"资讯"},{"pagePath":"pages/cart/cart","iconPath":"static/tab-cart.png","selectedIconPath":"static/tab-cart-current.png","text":"商城"},{"pagePath":"pages/user/user","iconPath":"static/tab-my.png","selectedIconPath":"static/tab-my-current.png","text":"我的"}]},"renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"优航","compilerVersion":"2.6.16","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"首页","navigationBarBackgroundColor":"#FE5786","navigationBarTextStyle":"white","onReachBottomDistance":50,"bounce":"none","titleNView":true,"pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/index/notice/notice","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"公告","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/index/notice/detail","meta":{},"window":{"navigationBarTitleText":"公告详情"}},{"path":"/pages/index/search/search","meta":{},"window":{"navigationBarTitleText":"搜索"}},{"path":"/pages/category/category","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"分类","onReachBottomDistance":50,"bounce":"none","titleNView":false,"pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/cart/cart","meta":{"isQuit":true,"isTabBar":true},"window":{"enablePullDownRefresh":true,"navigationBarTextStyle":"black","titleNView":false,"softinputNavBar":"none","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/user/user","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","bounce":"none","titleNView":{"type":"transparent","buttons":[{"fontSrc":"/static/yticon.ttf","text":"","fontSize":"24","color":"#303133","width":"46px","background":"rgba(0,0,0,0)"},{"fontSrc":"/static/yticon.ttf","text":"","fontSize":"28","color":"#303133","background":"rgba(0,0,0,0)","redDot":false}]}}},{"path":"/pages/user/userinfo/userinfo","meta":{},"window":{"navigationBarTitleText":"修改资料"}},{"path":"/pages/user/collection/collection","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的收藏","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/user/footprint/footprint","meta":{},"window":{"navigationBarTitleText":"我的足迹"}},{"path":"/pages/user/coupon/coupon","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的优惠券","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/user/coupon/detail","meta":{},"window":{"navigationBarTitleText":"优惠券详情"}},{"path":"/pages/user/coupon/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"领券中心","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/user/address/address","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"收货地址","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/user/address/manage","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/user/money/pay","meta":{},"window":{"navigationBarTitleText":"支付"}},{"path":"/pages/user/money/success","meta":{},"window":{"navigationBarTitleText":"支付成功"}},{"path":"/pages/user/account/recharge","meta":{},"window":{"navigationBarTitleText":"充值中心"}},{"path":"/pages/user/account/account","meta":{},"window":{"navigationBarTitleText":"我的账户"}},{"path":"/pages/user/account/bill","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"账单明细","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/user/account/integral","meta":{},"window":{"navigationBarTitleText":"积分详情"}},{"path":"/pages/set/set","meta":{},"window":{"navigationBarTitleText":"设置"}},{"path":"/pages/set/authorization/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"授权列表","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/set/feedback/detail","meta":{},"window":{"navigationBarTitleText":"意见反馈详情"}},{"path":"/pages/set/feedback/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"意见反馈","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/set/feedback/feedback","meta":{},"window":{"navigationBarTitleText":"意见反馈"}},{"path":"/pages/set/about/about","meta":{},"window":{"navigationBarTitleText":"关于RF商城"}},{"path":"/pages/set/about/detail","meta":{},"window":{"navigationBarTitleText":"关于RF商城"}},{"path":"/pages/set/invoice/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"开票历史","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/set/invoice/invoice","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"发票管理","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/set/invoice/manage","meta":{},"window":{"navigationBarTitleText":""}},{"path":"/pages/product/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"商品列表","onReachBottomDistance":50,"bounce":"none","titleNView":false,"pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/product/product","meta":{},"window":{"navigationBarTitleText":"详情展示","titleNView":{"type":"transparent"}}},{"path":"/pages/order/order","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"我的订单","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"},"bounce":"none"}},{"path":"/pages/order/refund","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"订单售后","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"},"bounce":"none"}},{"path":"/pages/order/search","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"订单搜索","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"},"bounce":"none"}},{"path":"/pages/order/refund/refund","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"订单售后","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"},"bounce":"none"}},{"path":"/pages/order/evaluation/evaluation","meta":{},"window":{"navigationBarTitleText":"发表评价"}},{"path":"/pages/order/evaluation/list","meta":{},"window":{"enablePullDownRefresh":true,"navigationBarTitleText":"评价列表","pullToRefresh":{"support":true,"color":"#fa436a","style":"default"}}},{"path":"/pages/order/detail","meta":{},"window":{"navigationBarTitleText":"订单详情"}},{"path":"/pages/order/create/order","meta":{},"window":{"navigationBarTitleText":"创建订单"}},{"path":"/pages/order/shipping/shipping","meta":{},"window":{"navigationBarTitleText":"物流详情"}},{"path":"/pages/order/shipping/return","meta":{},"window":{"navigationBarTitleText":"退货物流"}},{"path":"/pages/public/register","meta":{},"window":{"navigationBarTitleText":"注册","navigationStyle":"custom","titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/public/login","meta":{},"window":{"navigationBarTitleText":"登录","navigationStyle":"custom","titleNView":false,"animationType":"slide-in-bottom"}},{"path":"/pages/public/logintype","meta":{},"window":{"navigationBarTitleText":"登录"}},{"path":"/pages/public/password","meta":{},"window":{"navigationBarTitleText":"忘记密码","navigationStyle":"custom","titleNView":false,"animationType":"slide-in-bottom"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
