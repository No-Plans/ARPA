<template lang="pug">
  .flicker
    figure(v-for="(slide, index) in slides", v-show="index === current", @mousedown="play = false", @mouseup="play = true")
      div
        template(v-if="slide.slice_type === 'image'")
          img.landscape(v-if="!isPortrait", :src="slide.primary.landscape_image.url")
          img.portrait(v-else, :src="slide.primary.portrait_image.url")
        template(v-if="slide.slice_type === 'video'")
          video(:src="slide.primary.file.url", preload, autoplay, loop)
</template>

<script>
export default {
  name: 'Flicker',
  props: ['slides'],
  data () {
    return {
      playEnabled: process.env.FLICKER,
      play: false,
      current: 0,
      isPortrait: window.innerWidth < window.innerHeight,
      resizeTmOut: null,
      interval: 150,
      flicker: null
    }
  },
  watch: {
    play (play) {
      if (play && this.playEnabled) {
        this.flicker = setInterval(() => {
          this.current = this.current + 1 > this.slides.length - 1 ? 0 : this.current + 1
        }, 150)
      } else {
        clearInterval(this.flicker)
      }
    }
  },
  methods: {
    onResize () {
      clearTimeout(this.resizeTmOut)
      this.resizeTmOut = setTimeout(() => {
        this.isPortrait = window.innerWidth <= window.innerHeight
      }, 300)
    }
  },
  created () {
    window.addEventListener('resize', this.onResize)
  },
  mounted () {
    this.play = true
  },
  destroyed () {
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss" scoped>
.flicker{
  position: relative;
  width:100%;
  height:100vh;
  overflow:hidden;

  figure{
    position: absolute;
    top:0; left:0;
    width:100%; height:100%;
    display:flex;
    align-items:center;
    justify-content: center;

    > div{
      cursor:e-resize;
    }

    img, video{
      display:block;
      height: 75vh;
      pointer-events:none;
    }

    &:active{
      background-color: black;
    }
  }
}
</style>