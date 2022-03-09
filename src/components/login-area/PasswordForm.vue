<template>
  <div class="login-form-wrapper">
    <form id="loginPasswordForm" @submit.prevent="login">

      <div class="form-input">
        <label for="email">{{ getWpLabels.email }}</label>
        <input type="email" id="email" placeholder="הזן דוא״ל"
               v-model="userEmail"
               @blur="v$.userEmail.$touch(); checkEmail();"
               :class="{ error: v$.userEmail.$error }">
        <div class="errors">
          <span class="errorMsg" v-if="v$.userEmail.$error">{{ getWpLabels.empty_email_error }}</span>
<!--          <span class="errorMsg" v-if="isEmailServerError">{{ getWpLabels.email_doesnt_exist_error }}</span>-->
        </div>
      </div>

      <div class="form-input">
        <label for="password">סיסמא</label>
        <input type="password" id="password" placeholder="הזן סיסמא"
               v-model="password"
               :class="{ error: v$.password.$error }">
        <div class="errors">
          <span class="errorMsg" v-if="v$.password.$error">סיסמא שגויה</span>
        </div>
      </div>

      <button class="btn-brown" type="submit" id="loginSubmitBtn">התחבר</button>
    </form>
  </div>
</template>

<script>
import useVuelidate from "@vuelidate/core";
import {email, required} from "@vuelidate/validators";
import {mapGetters} from "vuex";

export default {
  name: "PasswordForm",
  data() {
    return {
      userEmail: '',
      password: '',
    }
  },
  setup() {
    return {v$: useVuelidate()}
  },
  validations() {
    return {
      userEmail: {
        required,
        email
      },
      password: {
        required,
      }
    }
  },
  computed: {
    ...mapGetters(['getWpLabels'])
  },
  methods: {
    login() {
      //todo: when api ready
    },
    checkEmail() {
      const mailFormat = /^\S+@\S+$/;
      const mail = this.userEmail
      this.isDisabled = mail.match(!mailFormat);
    },
  }
}
</script>

<style scoped>

</style>