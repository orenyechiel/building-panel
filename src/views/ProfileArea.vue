<template>
  <main>
    <SidebarMenu />
    <ProfilePanel />
  </main>
</template>

<script>
import SidebarMenu from "@/components/SidebarMenu";
import ProfilePanel from "@/components/ProfilePanel";

export default {
  name: "ProfileArea",
  components: {
    SidebarMenu,
    ProfilePanel
  },
}
</script>

<style scoped lang="scss">
main {
  display: flex;
  min-height: 100vh;
}
</style>