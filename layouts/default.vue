<template>
  <div class="grid grid-cols-12 font-nova">
    <div class="hidden md:grid md:col-span-3 lg:col-span-2 min-h-screen shadow-md">
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

<style>
.nuxt-link-exact-active {
  color: #2563EB;
}
</style>
