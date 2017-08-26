<template lang="pug">
  .info-page
    template(v-if="info")
      header
        router-link(:to="{name: 'Home'}") ARPA Studio
        .content(v-html="html(info.data.studio_info)")
      section
        .news
          .content(v-if="news.length > 0", v-html="news")
        .about
          .content(v-html="html(info.data.about)")
</template>

<script>
import Vue from 'vue'
export default {
  name: 'Info',
  props: ['info'],
  data () {
    return {
      html: Vue.$html
    }
  },
  computed: {
    news () {
      if (this.info) return Vue.$html(this.info.data.news)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.info-page{
  min-height:100vh;
  background-color:$primary;
  color:$white;
  padding:4rem 5.4rem 4rem 4.5rem;
}

header{
  position: fixed;
  top:0; left:0;
  padding:4rem 4.5rem;
  width:32%;
}

section{
  max-width:50em;
  margin-left:32%;
  .news{
    max-width:em(395px);
    margin-bottom: em(114px);
  }
  .about{
    font-size:em(30px);
  }
}
</style>