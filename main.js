import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
import uView from "uview-ui";
Vue.use(uView);
App.mpType = 'app'
Vue.prototype.APP_ID = 'tamx8gspkrhmltgk';
Vue.prototype.APP_SECRET = 'RHVVdkJYaEw2UlBDMCthcm8yclNKQT09';
let mpShare = require('./static/mpShare.js')
Vue.mixin(mpShare)
const app = new Vue({
	...App
})
app.$mount()
