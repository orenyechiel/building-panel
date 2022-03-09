<template>

  <div class="loader-wrap" v-show="showLoader">
    <p>מתבצע חיבור, אנא המתן</p>
    <LoaderDots />
  </div>

  <router-view>

  </router-view>
</template>
<script>
import LoaderDots from "@/components/mini-components/LoaderDots";
import {mapActions} from "vuex";
import showLoader from "@/mixing/showLoader";

export default {
  components: {LoaderDots},
  mixins: [showLoader],
  methods: {
    ...mapActions(['wpLabels']),
    getMobileOperatingSystem() {
      const userAgent = navigator.userAgent || navigator.vendor;
      if (/android/i.test(userAgent)) {
        return "Android";
      }

      // iOS detection from: http://stackoverflow.com/a/9039885/177710
      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
      }
      return "unknown";
    }
  },
  async created() {
    if (window.matchMedia('screen and (max-width: 1200px)').matches) {
      let os = this.getMobileOperatingSystem();
      if (os === "Android") {
        window.location.href = "https://play.google.com/store/apps/details?id=com.tingz.dimriApp";
      } else if (os === "iOS") {
        window.location.href = "https://apps.apple.com/il/app/%D7%93%D7%9E%D7%A8%D7%99-%D7%93%D7%99%D7%99%D7%A8%D7%99%D7%9D/id1589670050";
      }
      document.getElementById('app').style.display = 'none';
    }

    await this.wpLabels();
    this.loaderOff()
    console.log('version: 0.0.8');
  }
}
</script>

<style lang="scss">
$brown: #453a2d;
$background: #efeeeb;
$error: #d73f3f;

html, body {
  direction: rtl
}

.loader-wrap {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 10px;
  background: rgba(0, 0, 0, .45);
  z-index: 10;
  p {
    color: white;
    font-family: Almoni;
    font-size: 20px;
  }
}
</style>
