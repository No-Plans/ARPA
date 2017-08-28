<template lang="pug">
 .home-page
    //- header ARPA Studio
    section(v-if="showcase")
      nav
        router-link(:to="{name: 'Info'}")
          span ARPA Studio
          span Information
      flicker(:slides="showcase.data.body", :interval="showcase.data.flicker_rate")
</template>

<script>
import Flicker from '@/components/Flicker'
export default {
  name: 'Home',
  props: ['showcase'],
  components: {
    Flicker
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

.home-page{
  position: relative;
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
    &:hover{
      color:$primary;
      span:first-child{
        display:none;
      }
      span:last-child{
        display:inline;
      }
    }
  }

  .slideleft-leave-active & {
    display:none;
  }
}

</style>