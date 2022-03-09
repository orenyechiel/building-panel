<template>

  <div class="top-progress">

    <div class="img-wrap">
      <img :src="back" alt="">
    </div>

    <div class="top">
      <h3>מצב התקדמות</h3>
      <p>שלב 2 מתוך 6</p>
    </div>

    <div class="progress-circles">
      <div class="step">
        <div class="inner-step">
          <img src="../assets/images/progress/progress1.png" alt="">
        </div>
        <p>תכנון עבודה</p>
      </div>

      <ProgressDots/>

      <div class="step" :class="{active: true}">
        <div class="inner-step">
          <img src="../assets/images/progress/progress2.png" alt="">
        </div>
        <p>הכנת השטח</p>
      </div>

      <ProgressDots/>

      <div class="step">
        <div class="inner-step">
          <img src="../assets/images/progress/progress3.png" alt="">
        </div>
        <p>יסודות</p>
      </div>

      <ProgressDots/>

      <div class="step">
        <div class="inner-step">
          <img src="../assets/images/progress/progress4.png" alt="">
        </div>
        <p>בנייה</p>
      </div>

      <ProgressDots/>

      <div class="step">
        <div class="inner-step">
          <img src="../assets/images/progress/progress5.png" alt="">
        </div>
        <p>הכנת הדירה</p>
      </div>

      <ProgressDots/>

      <div class="step">
        <div class="inner-step">
          <img src="../assets/images/progress/progress6.png" alt="">
        </div>
        <p>קבלת מפתח</p>
      </div>

    </div>
  </div>
</template>

<script>
import ProgressDots from "@/components/mini-components/ProgressDots";
import back from '@/assets/images/progress_bck.png'

export default {
  name: "TopProgress",
  components: {ProgressDots},
  setup() {
    return {
      back
    }
  }
}
</script>

<style scoped lang="scss">
$primary: #49382a;
$secondary: #6f655b;

.top-progress {
  position: relative;
  padding: 20px 80px 90px;
  text-align: right;
  background-image: linear-gradient(to left, #efeeeb 100%, #c5beb5);

  .img-wrap {
    position: absolute;
    top: 0;
    left: 0;
    img {
      max-height: 240px;
    }
  }

  .top {
    font-family: Almoni;
    margin-bottom: 10px;

    h3 {
      color: $primary;
      font-size: 26px;
    }

    p {
      color: $secondary;
      font-size: 18px;
    }
  }

  .progress-circles {
    display: flex;
    gap: 10px;
    align-items: center;

    .step {
      width: 6%;
      position: relative;

      &.active {
        width: 9%;

        .inner-step {
          + p {
            font-size: 26px;
            opacity: 1;
          }
        }
      }

      .inner-step {
        + p {
          position: absolute;
          margin-top: 4px;
          left: 0;
          right: 0;
          text-align: center;
          opacity: 0.8;
          font-size: 18px;
          font-family: Almoni;
        }

        img {
          width: 100%;
          position: relative;
          &:after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
            background: rgba(0,0,0, .5);
          }
        }
      }

      img {

      }
    }
  }

}
</style>