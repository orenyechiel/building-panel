<template>
  <div class="step">
    <a class="prev-step" @click.prevent="prevStep">חזרה</a>
    <div class="inner-top-modal" v-if="!showTerms">
      <h3>{{ getWpLabels.go_to_my_area }}</h3>
      <p>{{ getWpLabels.enter_code_subtitle_sms }}</p>
    </div>

    <div class="inner-bottom-modal">
      <div class="enter-code-wrapper">
        <form @submit.prevent="login" v-if="!showTerms">
          <input type="text" id="codeInput"
                 v-model="enteredCode"
                 @input="checkCodeLength"
                 @blur="v$.enteredCode.$touch"
                 @keydown="onlyNumberKey($event)"
                 inputmode="numeric"
                 autocomplete="one-time-code"
                 pattern="\d{6}" maxlength="6"
                 :class="{ error: v$.enteredCode.$errors.length || incorrectCode }"
                 required>
          <p class="errorMsg" v-if="incorrectCode">{{ getWpLabels.wrong_code_403 }}</p>
          <p class="errorMsg" v-if="serverError">ישנה תקלה, נא לנסות שנית מאוחר יותר</p>
          <p v-if="newCodeSended">קוד חדש נשלח אליך</p>
          <br>

          <div class="checkbox-wrap">
            <label for="terms">
              <input type="checkbox" id="terms" required>
              קראתי והבנתי את
              <a @click.prevent="openTerms">תנאי שימוש וסודיות.</a>
            </label>
          </div>

          <button type="submit"
                  :disabled="isDisabled"
                  class="btn-brown">{{ getWpLabels.continue }}</button>

          <br>
          <a class="underscore-link" @click.prevent="reSendCode">{{ getWpLabels.resend_code }}</a>
        </form>

        <TermsAgreement @close-self="closeTerms" v-if="showTerms"/>

      </div>
    </div>

  </div>
</template>

<script>
import TermsAgreement from "@/components/login-area/TermsAgreement";
import authService from "@/services/authService";
import useVuelidate from '@vuelidate/core';
import {required, minLength} from '@vuelidate/validators';
import {mapActions, mapGetters, mapMutations} from "vuex";

export default {
  name: "StepTwo",
  components: {TermsAgreement},
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      enteredCode: "",
      incorrectCode: false,
      serverError: false,
      showTerms: false,
      newCodeSended: false,
      isDisabled: true,
    }
  },
  validations() {
    return {
      enteredCode: {
        required,
        minLength: minLength(6),
      }
    }
  },
  computed: {
    ...mapGetters(['getWpLabels']),
  },
  methods: {
    ...mapActions(['userContract']),
    ...mapMutations(['prevStep']),
    checkCodeLength() {
      this.isDisabled = this.enteredCode.length !== 6;
    },
    openTerms() {
      this.showTerms = true;
    },
    closeTerms() {
      this.showTerms = false;
    },
    login() {
      this.$store.commit('switchLoader', true);

      authService.login(this.enteredCode).then(res => {
        this.incorrectCode = false;
        this.$store.commit('setApartmentsList', res.data.apartmentsList);
        localStorage.setItem('loginCode', this.enteredCode);

        if (res.data.apartmentsList.length <= 1) {
          const singleContract = res.data.apartmentsList[0].contractId;
          localStorage.setItem('contractIdStorage', singleContract);
          const storageContract = localStorage.getItem('contractIdStorage');

          this.userContract(storageContract);
          this.$router.replace('private-area');

        } else {
          this.$store.commit('nextStep');
        }

      }).catch(err => {
        console.log('login error:: ', err);
        if (err.response.status === 403) {
          this.incorrectCode = true;
        } else if (err.response.status !== 403) {
          this.serverError = true;
        }
      }).finally(() => {
        this.$store.commit('switchLoader', false);
      });
    },
    reSendCode() {
      this.enteredCode = "";
      this.$store.commit('switchLoader', true);
      const reqBody = this.$store.state.reqBody;

      authService.getCodeReq(reqBody).then(res => {
        console.log('get new code', res);
        this.newCodeSended = true;
      }).catch(err => {
        console.log('Error: ', err);
      }).finally(() => {
        this.$store.commit('switchLoader', false);
      });
    },
    onlyNumberKey(e) {
      let ASCIICode = e.which ? e.which : e.keyCode;
      if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
        e.preventDefault();
        return false;
      } else {
        return true;
      }
    },
  },

}
</script>

<style scoped lang="scss">
form {
  min-width: 350px;

  label {
    font-size: 22px;
    font-family: Almoni-light;
    line-height: 32px;


    a {
      font-family: Almoni;
      text-decoration: underline;
      cursor: pointer;
    }
  }

  #codeInput {
    font-size: 32px;
    font-family: Almoni;
    font-variant-numeric: tabular-nums lining-nums;
    border: 0;
    height: 45px;
    width: 305px;
    padding: 0 16px;
    margin-bottom: 8px;
    text-align: left;
    direction: ltr;
    letter-spacing: 47px;
    background-image: linear-gradient(to left, black 45px, rgba(255, 255, 255, 0) 0%);
    background-size: 58px 2px;
    background-position: bottom;
    background-position-x: 45px;
    background-repeat: repeat-x;

    &.error {
      background-image: linear-gradient(to left, #d73f3f 45px, rgba(255, 255, 255, 0) 0%);
    }
  }

  .checkbox-wrap {
    text-align: right;
  }

  button {
    margin: 22px auto 10px;
  }
}
</style>