<template lang="pug">
 article(:data-theme="theme", :class="{'loading': !loaded, 'loaded': loaded}")
    //- header ARPA Studio
    header(@click="loaded = !loaded")
      nav
        router-link(:to="{name: 'Info'}")
          span ARPA Studio
          span Information
        router-link.menu-icon-link(:to="{name: 'Info'}")
          menu-icon
    section(v-if="showcase")
      flicker(:slides="showcase.data.body", :interval="showcase.data.flicker_rate", @play="theme = 'play'", @pause="theme = 'pause'")
</template>

<script>
import Flicker from '@/components/Flicker'
import MenuIcon from '@/components/MenuIcon'
export default {
  name: 'Home',
  props: ['showcase'],
  components: {
    Flicker,
    MenuIcon
  },
  data () {
    return {
      loaded: false,
      theme: 'play'
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
  text-align: center;
  padding:3rem;
  display:flex;
  align-items:center;
  justify-content: center;

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
  
  transition:all 1s;
  .loading &{
    font-size: em(86px);
    transform:translateX(calc(-50vw + 50%)) translateY(calc(50vh - 50%));
  }
}

section{
  overflow:hidden;
}

@include on('landscape') {
  nav{
    .slideleft-leave-active & {
      display:none;
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
    display:flex;
    justify-content: space-between;
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