<template>
  <div class="terms-box">
    <h2>תנאי שימוש וסודיות</h2>

    <div class="terms-wrapper">
      <p v-html="terms"></p>
    </div>

    <button @click="closeSelf" class="btn-brown">קראתי והבנתי</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "TermsAgreement",
  data() {
    return {
      terms: "",
    };
  },
  methods: {
    closeSelf() {
      this.$emit("close-self");
    },
    getWpData() {
      let config = {
        method: "get",
        url: "https://dimri-cms.azurewebsites.net/wp-json/wp/v2/pages?page=2",
        headers: {},
      };
      return axios(config);
    },
  },
  async created() {
    this.$store.commit("switchLoader", true);
    try {
      const response = await this.getWpData();
      this.terms = response.data[0].content.rendered;
      this.$store.commit("switchLoader", false);
    } catch (err) {
      console.log(err);
    }
  },
};
</script>

<style lang="scss">
$brown: #453a2d;

.terms-box {
  h2 {
    font-family: Almoni;
    font-size: 22px;
    margin-bottom: 10px;
  }
  strong {
    font-family: Almoni-bold;
  }

  .terms-wrapper {
    width: 64%;
    max-height: 300px;
    overflow: scroll;
    margin: 0 auto;
    padding: 5px 10px;
    overflow-x: hidden;
    scrollbar-width: thin; /* firefox */
    scrollbar-color: blue orange;

    &::-webkit-scrollbar {
      width: 2px;
    }

    &::-webkit-scrollbar-track {
      background: #e4e2da;
    }

    &::-webkit-scrollbar-thumb {
      background-color: $brown;
    }

    p {
      font-family: Almoni-light;
      font-size: 22px;
    }
  }

  button {
    margin-top: 14px;
  }
}
</style>