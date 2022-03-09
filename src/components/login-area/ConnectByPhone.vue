<template>

  <div class="form-input">
    <label for="phone">טלפון נייד</label>
    <input type="tel" id="phone" placeholder="הזן טלפון נייד"
           v-model="userPhone"
           @input="checkValidLength"
           @blur="v$.userPhone.$touch"
           :class="{ error: v$.userPhone.$errors.length }">
    <div class="errors">
      <span class="errorMsg" v-if="v$.userPhone.$error">מספר הטלפון שגוי, יש לנסות שנית.</span>
      <span class="errorMsg" v-if="isPhoneServerError">מספר הטלפון שהוזן אינו קיים במערכת.</span>
    </div>
  </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'

export default {
  name: "ConnectByPhone",
  props: {isPhoneServerError: Boolean},
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      userPhone: "",
    }
  },
  validations() {
    return {
      userPhone: {
        required,
        minLength: minLength(9),
      }
    }
  },
  methods: {
    checkValidLength() {
      // if user add a "-" it will be removed.
      const phoneStr = this.userPhone.replace('-', '');
      this.$emit('check-length', phoneStr);
    },
  }
}
</script>