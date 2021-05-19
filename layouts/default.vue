<template>
  <div class="grid grid-cols-12">
    <Sidebar class="hidden md:flex md:col-span-3 lg:col-span-2 h-full min-h-screen shadow overflow-y-scroll"></Sidebar>
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
