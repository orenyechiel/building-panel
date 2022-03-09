<template>
  <div class="login-form-wrapper">
    <form id="loginMethodForm" @submit.prevent="sendCode">

      <ConnectByEmail
          v-if="loginMode === 'byEmail'"
          :is-email-server-error="isEmailServerError"
          @check-mail="checkEmail"/>

      <ConnectByPhone
          v-else-if="loginMode === 'byPhone'"
          :is-phone-server-error="isPhoneServerError"
          @check-length="checkLength"/>

      <button
          class="btn-brown"
          type="submit"
          id="loginSubmitBtn"
          :disabled="isDisabled"
          @click="sendCode">
        {{ getWpLabels.send_code }}
      </button>
    </form>

    <a class="underscore-link" @click="switchInputLogin">{{ loginModeStr }}</a>
  </div>
</template>

<script>
import ConnectByPhone from "@/components/login-area/ConnectByPhone";
import ConnectByEmail from "@/components/login-area/ConnectByEmail";
import authService from "@/services/authService";
import {mapGetters} from "vuex";

export default {
  name: "OtpForm",
  components: {ConnectByPhone, ConnectByEmail},
  data() {
    return {
      reqBody: {
        userAuth: "",
        isPhone: true,
        ending: "XuYLVwPNRg9"
      },
      isPhoneServerError: false,
      isEmailServerError: false,
      isDisabled: true,
      loginMode: 'byPhone',
      loginModeStr: "שלח לי קוד לדוא״ל",
    }
  },
  computed: {
    ...mapGetters(['getWpLabels']),
  },
  methods: {
    switchInputLogin(e) {
      e.preventDefault();
      if (this.loginMode === 'byEmail') {
        this.loginMode = 'byPhone';
        this.loginModeStr = 'שלח לי קוד לדוא״ל';
      } else if (this.loginMode === 'byPhone') {
        this.loginMode = 'byEmail';
        this.loginModeStr = 'שלח לי קוד לטלפון הנייד';
      }
      this.isDisabled = true;
    },

    checkLength(phone) {
      this.isDisabled = phone.length < 9;
      this.reqBody.userAuth = phone;
      this.reqBody.isPhone = true;
      this.$store.commit('reqBodyLogin', this.reqBody);
    },

    checkEmail(mail) {
      const mailFormat = /^\S+@\S+$/;
      this.isDisabled = mail.match(!mailFormat);

      this.reqBody.userAuth = mail;
      this.reqBody.isPhone = false;
      this.$store.commit('reqBodyLogin', this.reqBody);
    },

    sendCode(e) {
      if(e) e.preventDefault();
      this.$store.commit('switchLoader', true);

      authService.getCodeReq(this.reqBody).then(res => {
        console.log(res.data.otp);

        if (this.loginMode === 'byEmail') {
          this.isEmailServerError = false;
        } else if (this.loginMode === 'byPhone') {
          this.isPhoneServerError = false;
        }

        if (this.$store.state.step <= 1) {
          this.$store.commit('nextStep');
        }
      }).catch(err => {
        if (err.response.status === 403) {
          if (this.loginMode === 'byEmail') {
            this.isEmailServerError = true;
          } else if (this.loginMode === 'byPhone') {
            this.isPhoneServerError = true;
          }
        }
      }).finally(()=> {
        this.$store.commit('switchLoader', false);
      });
    },
  }
}
</script>

<style scoped>

</style>