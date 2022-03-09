<template>
  <div class="no-changes">
    <p>כלום לא השתנה</p>
    <img :src="BigNote" alt="">
    <p>
      <strong>אנחנו מזמינים אותך לתאם פגישה</strong>
      <br>
      עם מתאם השינויים שלנו
    </p>
  </div>
</template>

<script>
import BigNote from '@/assets/images/big_note.svg'
export default {
  name: "NoChangesMade",
  setup() {
    return {
      BigNote
    }
  }
}
</script>

<style scoped lang="scss">
.no-changes {
  text-align: center;
  padding: 20px;
  p {
    color: #453a2d;
    font-size: 26px;
    font-family: Almoni;
    strong {
      font-family: Almoni-bold;
    }
  }
  img {
    margin: 20px auto;
    height: 80px;
  }
}
</style>