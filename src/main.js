import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'

Vue.config.productionTip = false

const app = new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')

router.beforeEach((to, from, next) => {
  const isAuthenticated = app.$store.getters['auth/isAuthenticated']
  if (isAuthenticated || (to.meta !== undefined && to.meta.requiresAuth === false)) {
    next()
  } else {
    next({ name: 'Login' })
  }
})
