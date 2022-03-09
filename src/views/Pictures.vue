<template>
  <main>
    <SidebarMenu />
    <GalleryPanel />
  </main>
</template>

<script>
import SidebarMenu from "@/components/SidebarMenu";
import GalleryPanel from "@/components/GalleryPanel";

export default {
  name: "PicturesArea",
  components: {
    SidebarMenu,
    GalleryPanel
  },
}
</script>

<style scoped lang="scss">
main {
  display: flex;
  min-height: 100vh;
}
</style>