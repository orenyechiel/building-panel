<template>
  <div class="card-wrap">
    <div class="pdf-card">
      <div class="head">
        <p>שם תכתובת</p>
        <span>16.12.19</span>
      </div>
      <div class="icon-wrap">
        <a href="">
          <slot>

          </slot>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FileCard",
}
</script>

<style scoped lang="scss">
.card-wrap {
  padding: 0 10px;
  .pdf-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid rgba(111, 101, 91, .2);

    .head {
      padding: 20px;
      text-align: right;
      p {
        color: #453a2d;
        font-family: Almoni-bold;
        font-size: 20px;
      }
      span {
        color: #49382a;
        font-family: Almoni-light;
        font-size: 18px;
      }
    }

    .icon-wrap {
      padding: 10px;
    }
  }
}
</style>