<template lang="pug">
  .flicker
    figure(
    v-for="(slide, index) in slides", 
    :data-visible="index === current",
    @touchend="play"
    @mouseup="play",
    @mousedown="stop", 
    @touchstart="stop")
      div
        template(v-if="slide.slice_type === 'image'")
          img.landscape(v-if="!portrait", :src="slide.primary.landscape_image.url")
          img.portrait(v-else, :src="slide.primary.portrait_image.url")
        template(v-if="slide.slice_type === 'video'")
          video(v-if="!portrait", :src="slide.primary.file.url", preload, loop)
          img.portrait(v-else, :src="slide.primary.portrait_image.url")
</template>

<script>
import _ from 'lodash'
export default {
  name: 'Flicker',
  props: {
    slides: Array,
    interval: {
      type: Number,
      default: 150
    }
  },
  data () {
    return {
      playable: process.env.FLICKER,
      current: 0,
      flicker: null,
      portrait: window.innerWidth < window.innerHeight,
      resizeTmOut: null
    }
  },
  methods: {
    play () {
      this.$emit('play')
      if (this.playable) {
        this.flicker = setInterval(() => {
          this.current = this.current + 1 > this.slides.length - 1 ? 0 : this.current + 1
        }, this.interval)
        // pause videos
        const videos = this.$el.querySelectorAll('video')
        for (var i = 0; i < videos.length; i++) {
          videos[i].pause()
        }
      }
    },
    stop (playVideos = true) {
      this.$emit('pause')
      clearInterval(this.flicker) // pause
      // play video ?
      if (playVideos) {
        const active = this.$el.querySelector('[data-visible]')
        if (active) {
          const video = active.querySelector('video')
          if (video) video.play()
        }
      }
    },
    onResize: _.throttle(function () {
      this.portrait = window.innerWidth < window.innerHeight
    }, 100)
  },
  created () {
    window.addEventListener('resize', this.onResize)
  },
  mounted () {
    this.play()
  },
  destroyed () {
    this.stop(false)
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
  user-select:none;

  figure{
    position: absolute;
    top:0; left:0;
    width:100%; height:100%;
    display:flex;
    align-items:center;
    justify-content: center;
    
    visibility:hidden;
    &[data-visible]{
      visibility:visible;
    }

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
  }
}
</style>