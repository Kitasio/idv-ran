<template>
  <div class="grid grid-cols-12 font-nova">
    <img @click="showSidebar = !showSidebar" class="fixed z-30 bottom-4 right-4 m-3 md:hidden w-10 cursor-pointer" src="/icons/menu.svg" alt="">
    <div :class="{ 'fixed': showSidebar, 'hidden': !showSidebar }" class="bg-white z-30 md:static md:grid md:col-span-3 lg:col-span-2 min-h-screen shadow-big">
      <div class="">
        <Sidebar id="sidebar" class="sticky top-0 h-screen overflow-y-scroll"></Sidebar>
      </div>
    </div>
    <div class="col-span-12 md:col-span-9 lg:col-span-10">
      <div>
        <Top class="pl-5 lg:px-14 xl:px-20"></Top>
        <Nuxt class="px-5 lg:px-14 xl:px-20 py-10"></Nuxt>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSidebar: false,
    }
  }
}
</script>

<style>
.nuxt-link-exact-active {
  color: #2563EB;
}
</style>
