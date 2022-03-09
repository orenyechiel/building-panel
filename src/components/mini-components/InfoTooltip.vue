<template>
  <div class="info-wrap">
    <div class="tooltip">
      <p>הסבר כללי על חיובים צפויים הקשור לנכס המוצג</p>
      <div class="arrow"></div>
    </div>
    <img :src="Info">
  </div>
</template>

<script>
import Info from '@/assets/images/icons/info.svg'
export default {
  name: "InfoTooltip",
  setup() {
    return {
      Info,
    }
  },
}
</script>

<style scoped lang="scss">
.info-wrap {
  position: relative;

  &:hover,
  &:focus {
    .tooltip {
      visibility: visible;
    }
  }

  .tooltip {
    padding: 20px 10px;
    width: 300px;
    //border: 1px solid #6f655b;
    text-align: center;
    position: absolute;
    transform: translate(60px,-80px);
    visibility: hidden;
    background-color: white;
    box-shadow: 0 0 40px 0 rgba(0, 0, 0, .5);
    z-index: 1;
    transition: .3s ease;

    p {
      font-family: Almoni;
      font-size: 22px;
    }

    .arrow {
      position: absolute;
      transform: translate(-46px,20px);
      width: 0;
      height: 0;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
      border-top: 10px solid #fff;
    }
  }

  img {
    width: 16px;
    margin-top: 2px;
  }
}
</style>