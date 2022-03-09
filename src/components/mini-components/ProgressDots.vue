<template>
  <div class="dots">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<script>
export default {
  name: "ProgressDots"
}
</script>

<style scoped lang="scss">
.dots {
  display: flex;
  gap: 7px;
  .dot {
    width: 5px;
    height: 5px;
    border-radius: 50%;
    background-color: #6f655b;
  }
}
</style>