<template>
  <div class="panel">

    <div class="loader-wrap" v-show="showLoader">
      <LoaderDots/>
    </div>

    <TopProgress/>

    <DeleteImage v-if="showModal" @close-self="closeModal"/>

    <div class="swiper-wrap" v-show="showGallery">
      <div class="w" style="width: 920px; margin: 0 auto">
        <button class="close-swiper" @click="closeSwiper">
          <img :src=CloseGallery alt="">
          <span>סגירה</span>
        </button>
        <ResidentPhotosSwiper />
      </div>
    </div>

    <div class="boxes-wrapper">

      <div class="head-bar">
        <h3>גלריית תמונות</h3>

        <div class="bar-actions">
          <DefaultBtn :text="getWpLabels.insert_photos" @click="openSwiper"/>
          <div class="choose-layout">
            <label>
              <input type="radio" checked
                     value="listGallery"
                     v-model="galleryLayout">

              <img :src=List alt="">
            </label>

            <label>
              <input type="radio"
                     value="gridGallery"
                     v-model="galleryLayout">

              <img :src=Grid alt="">
            </label>
          </div>

        </div>
      </div>

      <ul class="albums-wrap">
        <li class="album" v-for="item in items" :key="item" :class="[galleryLayout]">
          <span class="album-date">31/12/2021</span>
          <ul class="pictures">
            <li v-for="item in items" :key="item">
              <div class="pic" :class="[galleryLayout]">
                <div class="img-wrap">
                  <img src="../assets/images/demo.jpeg" alt="">
                </div>
                <div class="texts-wrap">
                  <span>אלוני</span>
                  <p>קרמיקה דקורטיבית מקלחת</p>
                </div>
                <div class="trash" @click="openModal">
                  <img :src=Trash alt="">
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Grid from "@/assets/images/icons/grid.svg";
import List from "@/assets/images/icons/materialist-dark.svg";
import Trash from "@/assets/images/icons/trash.svg";
import CloseGallery from "@/assets/images/icons/close-gallery.svg";

import TopProgress from "@/components/TopProgress";
import LoaderDots from "@/components/mini-components/LoaderDots"
import DefaultBtn from "@/components/mini-components/DefaultBtn"
import DeleteImage from "@/components/modals/DeleteImage";
import ResidentPhotosSwiper from "@/components/pictures-area/ResidentPhotosSwiper";

import toggleModal from "@/mixing/toggleModal";

import {mapGetters} from "vuex";
export default {
  name: "GalleryPanel",
  mixins: [toggleModal],
  components: {
    LoaderDots,
    TopProgress,
    DefaultBtn,
    DeleteImage,
    ResidentPhotosSwiper,
  },
  data() {
    return {
      galleryLayout: 'listGallery',
      showLoader: false,
      showGallery: false,
      items: [{},{},],
    }
  },
  setup() {
    return {
      Grid,
      List,
      Trash,
      CloseGallery,
    };
  },
  methods: {
    openSwiper() {
      this.showGallery = true;
      // document.querySelector('.swiper-button-prev').style.visibility = "hidden";
      // document.querySelector('.swiper-button-next').style.visibility = "hidden";
    },
    closeSwiper() {
      this.showGallery = false;
    },
  },
  computed: {
    ...mapGetters(['getWpLabels']),
  }
}
</script>

<style scoped lang="scss">

.swiper-wrap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: rgba(0, 0, 0, .6);
  z-index: 10;

  .swiper-button-next,
  .swiper-button-prev {
    visibility: hidden !important;
  }
}

.close-swiper {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 24px;
  padding: 0;
  img {
    width: 42px;
  }
  span {
    color: white;
    font-family: Almoni;
    font-size: 20px;
  }
}

.boxes-wrapper {
  position: relative;
  top: -20px;
  padding: 0 40px;

  .head-bar {
    color: white;
    background-color: #b3a08a;
    padding: 8px;
    border-radius: 3px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: space-between;

    h3 {
      font-size: 18px;
      font-family: Almoni-bold;
    }

    .bar-actions {
      display: flex;
      align-items: center;
      gap: 30px;

      .choose-layout {
        display: flex;
        gap: 8px;

        label {
          cursor: pointer;
          img {
            padding: 4px;
          }
        }

        input[type="radio"] {
          display: none;

          &:checked {
            + img {
              background-color: white;
              border-radius: 3px;
            }
          }
        }
      }

    }
  }

  .album {
    padding: 24px 32px;
    text-align: right;
    &.gridGallery {
      background-color: #f7f9fc;
      margin-bottom: 24px;
      .pic {
        border-radius: 3px;
        border: solid 1px #b3a08a;
      }
      .pictures {
        display: flex;
        flex-wrap: wrap;
        gap: 33px 2.5%;
        li {
          flex-basis: 22.5%;
        }
      }
    }
    .album-date {
      color: #453a2d;
      font-size: 20px;
      font-family: Almoni-bold;
      display: inline-block;
      margin-bottom: 17px;
      &:before {
        content:"\A";
        width:7px;
        height:7px;
        border-radius:50%;
        background: #b3a08a;
        display:inline-block;
        margin-bottom: 2px;
        margin-left: 8px;
      }
    }
  }

  .pic {
    position: relative;
    &.gridGallery {
      background-color: white;
      .img-wrap {
        aspect-ratio: 1.1 / 1;
        img {
          max-height: 100%;
          width: 100%;
          object-fit: cover;
        }
      }
      .texts-wrap {
        padding: 16px;
        text-align: center;
      }
      .trash {
        position: absolute;
        top: 7px;
        left: 7px;
      }
    }
    &.listGallery {
      display: flex;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid rgba(111, 101, 91, .25);
      .img-wrap {
        width: 72px;
        height: 72px;
        img {
          max-height: 100%;
          max-width: 100%;
          object-fit: cover;
        }
      }
      .texts-wrap {
        margin-right: 23px;
      }
    }
    .texts-wrap {
      color: #6f655b;
      font-size: 20px;
      font-family: Almoni;
      p {
        color: #453a2d;
        font-family: Almoni-bold;
      }
    }
    .trash {
      cursor: pointer;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f7f9fc;
      margin-right: auto;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover,
      &:focus {
        background-color: #d1b28e;
      }
      img {
        width: 24px;
        height: 24px;
      }
    }
  }
}
</style>