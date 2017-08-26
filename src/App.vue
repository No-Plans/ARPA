<template lang="pug">
  #app.app
    transition(:name="transition")
      router-view(:showcase="showcase", :info="info")
</template>

<script>
import Vue from 'vue'
import Prismic from 'prismic-javascript'
export default {
  name: 'App',
  data () {
    return {
      docs: null,
      transition: 'slideleft'
    }
  },
  computed: {
    showcase () {
      return this.getDocByType('showcase')
    },
    info () {
      return this.getDocByType('info')
    }
  },
  watch: {
    '$route' (to, from) {
      this.transition = to.name === 'Info' ? 'slideleft' : 'slideright'
    }
  },
  methods: {
    getDocs () {
      Prismic.getApi(Vue.config.PRISMIC.API).then(function (api) {
        return api.query('')
      }).then((response) => {
        this.docs = response.results
      }, (err) => {
        console.log('Error: getDocs failed', err)
      })
    },
    getDocByType (type) {
      if (this.docs) {
        const index = this.docs.map(function (obj) { return obj.type }).indexOf(type)
        return this.docs[index]
      }
    }
  },
  created () {
    this.getDocs()
  }
}
</script>

<style lang="scss">
@import './style/variables';
@import './style/reset';
@import './style/transitions';

html{
  font-size:$rem;
}

.app {
  position: relative;
  width:100%;
  font-size:$basefont;
  overflow-x:hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  a{
    color:inherit;
    text-decoration: none;
  }

  .content{
    white-space:pre-wrap;
    * + *{
      margin-top: 1em;
    }
  }
}
</style>
