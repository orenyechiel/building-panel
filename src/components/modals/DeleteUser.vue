<template>
  <div class="modal-wrap">
    <div class="modal">
      <img class="big-info" :src=bigInfo alt="">
      <img class="back-image" src="../../assets/images/modal_bck.png" alt="">

      <div class="modal-content">

        <div class="content">
          <h3>פרטי המשתמש ימחקו מן המערכת</h3>
          <p>באישור פעולה זו, אנחנו נמחק את המשתמש ואת פרטי החשבון מן המערכת
            האם להמשיך?</p>
        </div>

        <div class="buttons">
          <button class="confirm-delete">אני רוצה למחוק</button>
          <button class="cancel-btn" @click="closeSelf">ביטול</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import bigInfo from "@/assets/images/icons/info-big.svg"

export default {
  name: "DeleteUser",
  setup() {
    return {
      bigInfo
    }
  },
  methods: {
    closeSelf() {
      this.$emit("close-self");
    },
  },
  computed: {
    ...mapGetters(['getWpLabels'])
  }
}
</script>

<style scoped lang="scss">

.modal-wrap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.45);
  z-index: 2;
}

.modal {
  color: #49382a;
  border-radius: 10px;
  margin: auto;
  background: white;
  width: 600px;
  height: 360px;
  padding: 0 40px 20px;
  text-align: center;
  position: absolute;
  inset: 0;
  z-index: 2;
  overflow: hidden;

  .back-image {
    z-index: -1;
    bottom: -30px;
    right: -10px;
  }

  .big-info {
    margin-bottom: 30px;
  }

  .content {
    color: #49382a;
    h3 {
      font-size: 26px;
      margin-bottom: 10px;
    }
    p {
      font-family: Almoni-light;
      font-size: 22px;
    }
  }

  .buttons {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    .confirm-delete {
      color: white;
      font-size: 20px;
      font-family: Almoni-bold;
      padding: 10px 40px;
      border-radius: 3px;
      box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.15);
      background-color: #453a2d;
      border: none;
      margin: 0 auto 20px;
      cursor: pointer;
      display: block;

      &:hover,
      &:focus {
        background-color: #6e655b;
      }
    }

    .cancel-btn {
      font-family: Almoni;
      font-size: 26px;
      color: #49382a;
      border: none;
      text-decoration: underline;
      background: none;
      margin-bottom: 32px;
      cursor: pointer;
    }
  }

}
</style>