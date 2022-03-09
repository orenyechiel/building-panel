<template>
  <div class="gallery">

    <button class="arrow nav-right" @click="prev"><img :src=ArrowRight alt=""></button>
    <button class="arrow nav-left" @click="next"><img :src=ArrowLeft alt=""></button>

    <swiper
        :slides-per-view="1"
        :navigation="true"
        :thumbs="thumbsSwiper"
        :modules="modules"
        grab-cursor
        class="mainSwiper"
    >
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-1.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-2.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-3.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-1.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-2.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-3.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-1.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-2.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-3.jpg"/></swiper-slide>
    </swiper>
    <swiper
        @swiper="setThumbsSwiper"
        :spaceBetween="24"
        :slidesPerView="8"
        :watchSlidesProgress="true"
        :watchSlidesVisibility="true"
        :slideToClickedSlide="true"
        :modules="modules"
        class="thumbSwiper"
    >
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-1.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-2.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-3.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-1.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-2.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-3.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-1.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-2.jpg"/></swiper-slide>
      <swiper-slide><img
          src="https://swiperjs.com/demos/images/nature-3.jpg"/></swiper-slide>
    </swiper>

  </div>
</template>

<script>
// Import Swiper Vue.js components
import {Swiper, SwiperSlide} from 'swiper/vue';

// Import Swiper styles
import 'swiper/css';
import "swiper/css/thumbs"

import ArrowRight from "@/assets/images/icons/arrow-right.svg"
import ArrowLeft from "@/assets/images/icons/arrow-left.svg"

// import required modules
import {Navigation, Thumbs} from 'swiper';
// import { useSwiper } from 'swiper/vue';

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    let thumbsSwiper = null
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper = swiper
    }

    return {
      modules: [Navigation, Thumbs],
      thumbsSwiper,
      setThumbsSwiper,
      ArrowRight,
      ArrowLeft,
    }
  },
  methods: {
    next() {
      const nextBtn = document.querySelector('.swiper-button-next');
      nextBtn.click();
    },
    prev() {
      const prevBtn = document.querySelector('.swiper-button-prev');
      prevBtn.click();
    }
  }
}
</script>

<style scoped lang="scss">

.gallery {
  position: relative;

  .arrow {
    width: 48px;
    height: 48px;
    background-color: white;
    border: none;
    border-radius: 50%;
    padding: 0;
    cursor: pointer;
    position: absolute;
    top: 34%;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;

    &.nav-right {
      right: -72px;
    }

    &.nav-left {
      left: -72px;
    }

    img {
      pointer-events: none;
    }
  }
}

.swiper {
  width: 100%;
  height: 420px;
  margin: 0 auto 24px;

  .swiper-slide {
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
    background-size: cover;
    background-position: center;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}

.mainSwiper {
  width: 920px;
}

.thumbSwiper {
  width: 920px;
  height: 20%;
  box-sizing: border-box;
  padding-bottom: 10px;
}

.thumbSwiper .swiper-slide {
  width: 25%;
  height: 72px;
}

//.thumbSwiper .swiper-slide-active {
//  border: 4px solid white;
//}

</style>