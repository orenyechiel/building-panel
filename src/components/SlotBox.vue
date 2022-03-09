<template>
  <div class="box">

    <header class="top-box">
      <slot name="header">

      </slot>
    </header>

    <div class="box-body">
      <slot></slot>
    </div>

  </div>
</template>

<script>
export default {
  name: "SlotBox"
}
</script>

<style scoped lang="scss">
$primary: #b3a08a;

.box {
  background-color: white;
  border: 1px solid $primary;

  header.top-box {
    color: white;
    background-color: $primary;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
    font-size: 18px;
    font-family: Almoni;
    display: flex;
    align-items: center;
    padding: 8px 20px;
  }
}
</style>