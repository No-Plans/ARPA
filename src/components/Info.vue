<template lang="pug">
  article
    template(v-if="info")
      header
        nav
          router-link.close(:to="{name: 'Home'}", aria-role="Close")
          router-link(:to="{name: 'Home'}") ARPA Studio
        .content(v-html="html(info.data.studio_info)")
      section
        .news
          .content(v-if="news.length > 0", v-html="news")
        .about
          .content.is-large(v-html="html(info.data.about)")
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

article{
  min-height:100vh;
  background-color:$primary;
  color:$white;
  padding:3rem 4rem 4.75rem;
}

header{
  position: fixed;
  top:0; left:0;
  padding:3rem 4rem;
  width:32%;

  .close{
    position: absolute;
    left:rem(19px);
    padding:.27em;
    margin-left: -.27em;
    &:after{
      content:'';
      display:block;
      font-size:(11/17)*1em;
      width:1em;
      height:1em;
      background:url('../assets/icons/close.svg') center center no-repeat;
      background-size:contain;
    }
    
    transition: opacity .5s;
    .slideleft-enter-active &,
    .slideleft-enter-active &{
      opacity:0;
    }
  }
}

section{
  max-width:50em;
  margin-left:32%;
  .news{
    max-width:em(395px);
    margin-bottom: em(114px);
  }
}

@include on('portrait') {
  article{
    padding-top:8rem;
  }
  nav{
    position:fixed;
    top:0; left:0;
    width:100%;
    padding:$pad-m 4rem;
    background:$blue;
  }
  header{
    position: static;
    width:auto;
    padding:0;
    margin-bottom: 4em;
  }
  section{
    margin:0 auto;
    .news{
      margin-bottom: 4em;
    }
  }
}
</style>