import Vue from 'vue'
import * as echarts from 'echarts'

import App from './app.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
