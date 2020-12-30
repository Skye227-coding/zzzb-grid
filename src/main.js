import Vue from 'vue'
import ElementUI from 'element-ui';
import fontawesome from '@fortawesome/fontawesome'
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import solid from '@fortawesome/fontawesome-free-solid'
import regular from '@fortawesome/fontawesome-free-regular'



fontawesome.library.add(solid)
fontawesome.library.add(regular)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  render: h => h(App)
}).$mount('#app')
// vue组件：input功能，保留几位小数点，$单位 百分比，可读（设置属性是否可以），焦点在的时候
// elementUI table
