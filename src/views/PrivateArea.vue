<template>
  <main>
    <SidebarMenu />
    <MainPanel />
  </main>
</template>

<script>
import SidebarMenu from "@/components/SidebarMenu";
import MainPanel from "@/components/MainPanel";

export default {
  name: "PrivateArea",
  components: {
    SidebarMenu,
    MainPanel
  },
}
</script>

<style scoped lang="scss">
  main {
    display: flex;
    min-height: 100vh;
  }
</style>