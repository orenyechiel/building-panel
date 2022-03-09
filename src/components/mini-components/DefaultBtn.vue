<template>
  <button>
    <img :src="Plus" alt="">
    <span>{{ text }}</span>
  </button>
</template>

<script>
import Plus from '@/assets/images/icons/plus.svg'
export default {
  name: "DefaultBtn",
  props: ['text'],
  setup() {
    return {
      Plus
    }
  }
}
</script>

<style scoped lang="scss">
  button {
    padding: 10px 20px;
    border-radius: 3px;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
    background-color: #453a2d;
    border: none;
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: center;
    margin: 0 auto;
    cursor: pointer;

    &:hover,
    &:focus {
      background-color: #6e655b;
    }

    span {
      color: white;
      font-size: 20px;
      line-height: 1;
      font-family: Almoni;
    }

    img {
      width: 18px;
      height: 18px;
    }
  }
</style>