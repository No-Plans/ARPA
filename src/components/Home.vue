<template lang="pug">
 article(:data-theme="theme")
    //- header ARPA Studio
    nav
        router-link(:to="{name: 'Info'}")
          span ARPA Studio
          span Information
        router-link.menu-icon-link(:to="{name: 'Info'}")
          menu-icon
    section(v-if="showcase")
      flicker(:slides="showcase.data.body", :interval="showcase.data.flicker_rate", @play="theme = 'light'", @pause="theme = 'dark'")
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
      theme: 'light'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

article{
  position: relative;
  color: $blue;
  stroke:$blue;
  background-color:$white;
  &[data-theme="dark"]{
    color:$white;
    stroke:$white;
    background-color:$black;
    @include oval('active');
  }
}

nav{
  position: fixed;
  top:0; right:0;
  z-index:50;
  text-align: left;

  a {
    padding:3rem;
    display: inline-block;
    span:last-child{
      display:none;
    }
    .no-touchevents &:hover{
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
  nav{
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
  section{
    overflow:hidden;
  }
}

</style>