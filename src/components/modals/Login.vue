<template>
  <div class="modal">
    <img class="back-image" src="../../assets/images/modal_bck.png" alt="">

    <StepOne v-if="getStep === 1"/>

    <StepTwo v-else-if="getStep === 2"/>

    <StepThree v-else-if="getStep === 3"/>

    <div class="loader-wrap" v-show="getLoader">
      <LoaderDots/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';

import StepOne from "@/components/login-area/StepOne";
import StepTwo from "@/components/login-area/StepTwo";
import StepThree from "@/components/login-area/StepThree";
import LoaderDots from "@/components/mini-components/LoaderDots";

export default {
  components: {LoaderDots, StepOne, StepTwo, StepThree},
  name: "LoginModal",
  data() {
    return {}
  },
  methods: {
    ...mapMutations(['nextStep', 'prevStep']),
  },
  computed: {
    ...mapGetters(['getStep', 'getLoader']),
  },
}
</script>

<style lang="scss">
$brown: #453a2d;
$background: #efeeeb;
$error: #d73f3f;

.errors {
  right: 0;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  .errorMsg {
    color: $error;
    text-align: right;
    font-size: 18px;
  }
}

button {
  &.btn-brown {
    width: 250px;
    height: 50px;
    font-size: 28px;
    font-family: Almoni-light;
    margin: 20px 0 10px;
    border: none;
    color: white;
    background-color: $brown;
    cursor: pointer;

    &[disabled] {
      opacity: .5;
    }
  }
}

a {
  &:visited {
    color: $brown;
  }
}

.prev-step {
  position: absolute;
  top: -10px;
  left: 0;
  font-size: 20px;
  cursor: pointer;
}

.underscore-link {
  font-size: 26px;
  font-family: Almoni-light;
  margin-top: 10px;
  text-decoration: underline;
}

.modal {
  color: #49382a;
  border-radius: 10px;
  margin: auto;
  background: white;
  width: 600px;
  height: 410px;
  padding: 40px 40px 20px;
  text-align: center;
  font-family: Almoni;
  position: absolute;
  inset: 0;
  z-index: 2;

  .step {
    position: relative;
    z-index: 1;
  }

  .back-image {
    position: absolute;
    bottom: 0;
    right: 0;
    max-width: 100%;
    transform: translate(17%, 22%);
    pointer-events: none;
  }

  .loader-wrap {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background: rgba(0, 0, 0, .25);
    z-index: 10;
  }

  .inner-top-modal {
    margin-bottom: 50px;

    h3 {
      font-size: 26px;
      margin-bottom: 10px;
    }

    p {
      font-size: 22px;
      font-family: Almoni-light;
    }
  }

  .inner-bottom-modal {
    display: flex;
    flex-direction: column;

    form {
      width: 52%;
      margin: 0 auto;

      .form-input {
        text-align: right;
        position: relative;
        margin-bottom: 20px;

        label {
          font-size: 18px;
        }

        input {
          width: 100%;
          padding: 10px 20px;
          height: 45px;
          border: 1px solid $brown;
          border-radius: 5px;
          box-sizing: border-box;
          font-size: 26px;
          font-family: Almoni-light;

          &.error {
            border: 1px solid $error;
          }
        }
      }

      &#loginMethodForm {
        .form-input {
          margin-bottom: 46px;
        }
      }
    }

  }
}
</style>