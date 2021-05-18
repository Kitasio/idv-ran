<template>
  <div>
      <div class="flex justify-between mb-3">
          <div class="uppercase text-lg font-semibold">анонсы</div>
          <NuxtLink to="/ads" class="text-blue-600">все анонсы</NuxtLink>
      </div>
      <NuxtLink to="/">
        <div class="font-bold mt-1" v-html="singleAd.time"></div>
        <div class="text-blue-600 text-xs font-bold mt-2" v-html="singleAd.tag"></div>
        <div class="font-bold mt-1 text-sm" v-html="singleAd.title"></div>
        <div class="mt-1 text-sm" v-html="singleAd.date"></div>
      </NuxtLink>
  </div>
</template>

<script>
export default {
    data() {
        return {
            singleAd: {
                time: '25 ДЕКАБРЯ 2020 ГОДА 12:00 — 14:00',
                tag: 'ОНЛАЙН-КОНФЕРЕНЦИЯ',
                title: 'Международная конференция «The Challenges for Euro-Asia: Past – Present – Future»',
                date: '16.10.2020',
            }
        }
    }
}
</script>

<style>

</style>