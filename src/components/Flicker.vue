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
        //- image
        template(v-if="slide.slice_type === 'image'")
          img.landscape(v-if="!portrait", @load="loaded", :src="media(slide.primary.landscape_image)")
          img.portrait(v-else, @load="loaded", :src="media(slide.primary.portrait_image)")
        //- video
        template(v-if="slide.slice_type === 'video'")
          template(v-if="!portrait")
            video(:src="media(slide.primary.file)", preload, loop, muted, playsinline, :poster="media(slide.primary.poster)")
            img.video-poster-loader(@load="loaded", :src="media(slide.primary.poster)")
          template(v-else)
            img.portrait(@load="loaded", :src="media(slide.primary.portrait_image)")
      figcaption.is-large(v-html="html(slide.primary.title)")
</template>

<script>
import Vue from 'vue'
// import _ from 'lodash'
export default {
  name: 'Flicker',
  props: {
    slides: Array,
    interval: {
      type: Number,
      default: 150
    },
    timeout: {
      type: Number,
      default: 6000
    }
  },
  data () {
    return {
      playable: true, // process.env.FLICKER,
      current: 0,
      flicker: null,
      portrait: window.innerWidth < window.innerHeight,
      resizeTmOut: null,
      html: Vue.$html,
      loadedMedia: 0
    }
  },
  methods: {
    media (key) {
      if (key) return key.url
      return false
    },
    play () {
      this.$emit('play')
      if (this.playable) {
        clearInterval(this.flicker)
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
    loaded () {
      this.loadedMedia++
      const value = this.loadedMedia / this.slides.length
      this.$emit('loading', value)
      // timeout
      setTimeout(() => { this.$emit('loading', 1) }, this.timeout)
    },
    onResize () {
      this.stop()
      setTimeout(() => {
        this.portrait = window.innerWidth < window.innerHeight
        this.play()
      }, 100)
      console.log(this.portrait)
    }
  },
  created () {
    window.addEventListener('orientationchange', this.onResize)
  },
  mounted () {
    this.play()
  },
  destroyed () {
    this.stop(false)
    window.removeEventListener('orientationchange', this.onResize)
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
}

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

figcaption{
  position: absolute;
  left: 2rem; bottom:2rem;
  visibility:hidden;
  [data-theme="pause"] [data-visible] &{
    visibility:visible;
  }
}

.video-poster-loader{
  display:none;
  visibility:hidden;
}

@include on('portrait') {
  figcaption{
    left: 0;
    bottom:$pad-m;
  }
}
</style>