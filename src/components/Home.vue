<template lang="pug">
 article(:data-theme="theme", :class="{'loading': loading, 'loaded': !loading}")
    header
      nav
        router-link(:to="{name: 'Info'}")
          span ARPA Studio
          span Information
        router-link.menu-icon-link(:to="{name: 'Info'}")
          menu-icon
        .progress(:style="progressWidth")
    transition(name="showcase")
      section(v-if="showcase", v-show="!loading")
        flicker(:slides="showcase.data.body", :interval="showcase.data.flicker_rate", @play="theme = 'play'", @pause="theme = 'pause'", @loading="setProgress", :timeout="showcase.data.loading_timeout")
</template>

<script>
import Flicker from '@/components/Flicker'
import MenuIcon from '@/components/MenuIcon'
export default {
  name: 'Home',
  props: ['showcase', 'entryPage'],
  components: {
    Flicker,
    MenuIcon
  },
  data () {
    return {
      loaded: false,
      theme: 'play',
      progress: 0,
      bodyVisible: false
    }
  },
  computed: {
    loading () {
      return this.entryPage && !this.loaded
    },
    progressWidth () {
      const value = 1 - this.progress
      return `transform: scale(${value}, 1)`
    }
  },
  methods: {
    setProgress (value) {
      this.progress = value
      if (value === 1 && this.entryPage) {
        setTimeout(() => {
          this.loaded = true
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

article{
  position: relative;
  // padding:0 3rem;

  // pause / play theme
  color: $blue;
  stroke:$blue;
  background-color:$white;
  &[data-theme="pause"]{
    color:$white;
    stroke:$white;
    background-color:$black;
    @include oval('active');
  }
}

header{
  position: fixed;
  top:0; right:0;
  z-index:50;
  text-align: right;
  padding:3rem;
  line-height: 1;

  a {
    display: inline-block;
    span:last-child{
      display:none;
    }
    .no-touchevents .loaded &:hover{
      color:$primary;
      span:first-child{
        display:none;
      }
      span:last-child{
        display:inline;
      }
    }
  }
  .menu-icon-link{
    display:none;
  }
}

section{
  overflow:hidden;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}

@include on('landscape') {
  header{
    display:flex;
    align-items:center;
    justify-content: center;

    .slideleft-leave-active & {
      display:none;
    }
    transition:font-size $logo-collapse-dur, transform $logo-collapse-dur;
    .loading &{
      font-size: em(86px);
      transform:translateX(calc(-50vw + 50%)) translateY(calc(50vh - 50%));
    }
  }
  nav{
    position: relative;
    display: block;
    .progress{
      display:none;
      position: absolute;
      top:0; right:0;
      width:100%; height:100%;
      background:$white;
      transform-origin: top right;
      .loading &{
        display:block;
      }
    }
  }
}

@include on('portrait') {
  article{
    height:100vh;
    overflow:hidden;
    padding:0 $pad-m;
  }
  header{
    position:fixed;
    top:0; left:0;
    width:100%;
    background-color:inherit;
    padding:$pad-m;
    nav{
      display:flex;
      justify-content: space-between;
      .progress{
        display:none;
      }
    }
    a{
      padding:0;
      color:inherit;
    }
    .menu-icon-link{ 
      display:inline-block;
    }
  }
}

</style>