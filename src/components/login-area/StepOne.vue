<template>

  <div class="step">
    <div class="inner-top-modal">
      <h3>{{ getWpLabels.go_to_my_area }}</h3>
      <p>{{ getWpLabels.login_by_phone_page_subtitle }}</p>
    </div>

    <div class="inner-bottom-modal">
      <OtpForm v-if="otp" />
      <PasswordForm v-else />
    </div>
  </div>

  <a class="switch-method" @click="switchLoginMethod">כניסה עם כתובת מייל וסיסמא</a>

</template>

<script>
import OtpForm from "@/components/login-area/OtpForm";
import PasswordForm from "@/components/login-area/PasswordForm";
import {mapGetters} from "vuex";

export default {
  name: "StepOne",
  components: {OtpForm,PasswordForm},
  data() {
    return {
      otp: true,
    }
  },
  computed: {
    ...mapGetters(['getWpLabels']),
  },
  methods: {
    switchLoginMethod() {
      this.otp = !this.otp
    },
  },
}
</script>

<style scoped>
.switch-method {
  cursor: pointer;
  font-size: 22px;
  font-family: Almoni-light;
  text-decoration: underline;
  position: absolute;
  bottom: 14px;
  right: 0;
  left: 0;
}
</style>
