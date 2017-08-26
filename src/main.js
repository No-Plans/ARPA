// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import PrismicDOM from 'prismic-dom'

Vue.config.productionTip = false
Vue.config.PRISMIC = process.env.PRISMIC

Vue.$html = (key) => {
  return PrismicDOM.RichText.asHtml(key, () => {
    return '/'
  })
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
