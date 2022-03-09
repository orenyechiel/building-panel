<template>

  <div class="form-input">
    <label for="email">{{ getWpLabels.email }}</label>
    <input type="email" id="email" placeholder="הזן דוא״ל"
           v-model="userEmail"
           @blur="v$.userEmail.$touch(); commitEmail();"
           :class="{ error: v$.userEmail.$error }">
    <div class="errors">
      <span class="errorMsg" v-if="isEmailServerError">{{ getWpLabels.email_doesnt_exist_error }}</span>
      <span class="errorMsg" v-if="v$.userEmail.$error">{{ getWpLabels.empty_email_error }}</span>
    </div>
  </div>

</template>

<script>
import useVuelidate from '@vuelidate/core'
import {required, email} from '@vuelidate/validators'
import {mapGetters} from "vuex";

export default {
  name: "ConnectByEmail",
  props: {isEmailServerError:Boolean},
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      userEmail: null,
    }
  },
  validations() {
    return {
      userEmail: {
        required,
        email
      }
    }
  },
  computed: {
    ...mapGetters(['getWpLabels'])
  },
  methods: {
    commitEmail() {
      this.$emit('check-mail', this.userEmail)
    }
  },
}
</script>