import Vue from 'vue'
import App from './App.vue'

//dipendencies
global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faUserSecret)

Vue.component('font-awesome-icon', FontAwesomeIcon)

require('@fortawesome/fontawesome-free/js/all.js');

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
