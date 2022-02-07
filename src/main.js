import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'; //1.导入vantui库
import 'vant/lib/index.css'; // 2.导入vant组件css样式
// import { Swipe, SwipeItem } from 'vant';
import { Lazyload } from 'vant';
import axios from './utils/axios.js' //引入axios到main.js
Vue.prototype.$axios = axios; //然后通过原型链把axios挂载到整个vue实例里面,凡是带$的都意思是全局使用，所以挂载后在别的页面直接用$axios就可以使用了

Vue.use(Vant); //3.在Vue实例中使用vantui插件
// Vue.use(Swipe);
// Vue.use(SwipeItem);
Vue.use(Lazyload);


Vue.config.productionTip = false

new Vue({
  router, //router:router ES6的简写 key=value时可简写
  store,
  render: h => h(App)
}).$mount('#app')


