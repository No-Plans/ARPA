<template lang="pug">
  .flicker
    figure(v-for="(slide, index) in slides", v-show="index === current", @mousedown="play = false", @mouseup="play = true", :data-visible="index === current")
      div
        template(v-if="slide.slice_type === 'image'")
          img.landscape(v-if="!isPortrait", :src="slide.primary.landscape_image.url")
          img.portrait(v-else, :src="slide.primary.portrait_image.url")
        template(v-if="slide.slice_type === 'video'")
          video(v-if="!isPortrait", :src="slide.primary.file.url", preload, loop)
          img.portrait(v-else, :src="slide.primary.portrait_image.url")
</template>

<script>
export default {
  name: 'Flicker',
  props: {
    slides: Array,
    interval: {
      type: Number,
      default: 400
    }
  },
  data () {
    return {
      playEnabled: process.env.FLICKER,
      play: false,
      current: 0,
      isPortrait: window.innerWidth < window.innerHeight,
      resizeTmOut: null,
      flicker: null
    }
  },
  watch: {
    play (play) {
      if (this.playEnabled) {
        if (play) return this.startFlicker()
        return this.stopFlicker()
      }
    }
  },
  methods: {
    onResize () {
      clearTimeout(this.resizeTmOut)
      this.resizeTmOut = setTimeout(() => {
        this.isPortrait = window.innerWidth <= window.innerHeight
      }, 300)
    },
    startFlicker () {
      this.flicker = setInterval(() => {
        this.current = this.current + 1 > this.slides.length - 1 ? 0 : this.current + 1
      }, this.interval)
      // pause videos
      const videos = this.$el.querySelectorAll('video')
      for (var i = 0; i < videos.length; i++) {
        videos[i].pause()
      }
    },
    stopFlicker (playVideos = true) {
      clearInterval(this.flicker) // pause
      // play video ?
      if (playVideos) {
        const active = this.$el.querySelector('[data-visible]')
        if (active) {
          const video = active.querySelector('video')
          if (video) video.play()
        }
      }
    }
  },
  created () {
    window.addEventListener('resize', this.onResize)
  },
  mounted () {
    this.play = true
  },
  destroyed () {
    this.stopFlicker(false)
    window.removeEventListener('resize', this.onResize)
  }
}
</script>

<style lang="scss" scoped>
@import '../style/variables';

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
      @include oval();
      &:active{
        @include oval('active');
      }
    }

    img, video{
      display:block;
      height: 75vh;
      pointer-events:none;
    }

    &:active{
      background-color: black;
      @include oval('active');
    }
  }
}
</style>