(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/dailyword/dailyword"],{"3b91":function(t,n,u){},6811:function(t,n,u){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=i(u("be82"));function i(t){return t&&t.__esModule?t:{default:t}}var o={data:function(){return{val:{},clickNum:0,tianqi:{humidity:"",temp:"",weather:"",windDirection:"",windPower:""},amapPlugin:new e.default.AMapWX({key:"cf28af542b7fb05eced50d62f8f00056"})}},onLoad:function(){this.getData(),this.getTianqi(),this.getTianqi()},methods:{getTianqi:function(){var t=this;this.amapPlugin.getWeather({success:function(n){console.log(n),t.tianqi=n},fail:function(n){console.log(n),t.$u.toast("获取位置失败，请开启定位")}})},getData:function(){var n=this;t.request({url:"https://www.mxnzp.com/api/daily_word/recommend?count=1&app_id="+this.APP_ID+"&app_secret="+this.APP_SECRET,success:function(t){console.log(t),n.val=t.data.data[0]}})},goImg:function(){this.clickNum<4?(this.clickNum++,this.$u.toast("再点".concat(5-this.clickNum,"次有惊喜哦"))):this.$u.toast("啥也没有，嘻嘻嘻")}}};n.default=o}).call(this,u("543d")["default"])},"8b57":function(t,n,u){"use strict";u.r(n);var e=u("6811"),i=u.n(e);for(var o in e)"default"!==o&&function(t){u.d(n,t,(function(){return e[t]}))}(o);n["default"]=i.a},af19:function(t,n,u){"use strict";var e=u("3b91"),i=u.n(e);i.a},b8cc:function(t,n,u){"use strict";u.d(n,"b",(function(){return i})),u.d(n,"c",(function(){return o})),u.d(n,"a",(function(){return e}));var e={uRow:function(){return u.e("node-modules/uview-ui/components/u-row/u-row").then(u.bind(null,"62bd"))},uCol:function(){return u.e("node-modules/uview-ui/components/u-col/u-col").then(u.bind(null,"1a8c"))},uButton:function(){return u.e("node-modules/uview-ui/components/u-button/u-button").then(u.bind(null,"5927"))}},i=function(){var t=this,n=t.$createElement;t._self._c},o=[]},d88a:function(t,n,u){"use strict";u.r(n);var e=u("b8cc"),i=u("8b57");for(var o in i)"default"!==o&&function(t){u.d(n,t,(function(){return i[t]}))}(o);u("af19");var a,c=u("f0c5"),r=Object(c["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],a);n["default"]=r.exports},e40a:function(t,n,u){"use strict";(function(t){u("4b32");e(u("66fd"));var n=e(u("d88a"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,u("543d")["createPage"])}},[["e40a","common/runtime","common/vendor"]]]);