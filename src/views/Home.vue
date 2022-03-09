<template>
  <main>
    <LoginModal />
  </main>
</template>

<script>
// @ is an alias to /src
// import MainLayout from '@/components/Main.vue'
// import SidebarMenu from '@/components/SidebarMenu.vue'
import LoginModal from "@/components/modals/Login";

export default {
  name: 'HomePage',
  components: {
    LoginModal
  }
}
</script>

<style scoped lang="scss">
main {
  position: relative;
  min-height: 100vh;
  background: url('~@/assets/images/login_bck.png') top center / cover no-repeat;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    pointer-events: none;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, .75);
  }
}
</style>
