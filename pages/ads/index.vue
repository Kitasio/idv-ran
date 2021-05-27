<template>
  <div>
      <h1 class="text-3xl font-nova-bold">Анонсы и события института</h1>

      <div class="mt-10 grid gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div class="relative" v-for="singleAd in ads" :key="singleAd.id">
          <NuxtLink :to="`/ads/${singleAd.id}`">
            <div class="text-sm font-nova-bold mt-2" v-html="singleAd.time"></div>
            <div class="text-blue-600 text-xs font-nova-bold" v-html="singleAd.tag"></div>
            <div class="font-nova-bold mt-1 leading-none" v-html="singleAd.title"></div>
            <div class="text-xs" v-html="singleAd.date"></div>
          </NuxtLink>
          <Delete collection="ads" :docId="singleAd.id" />
        </div>
      </div>
  </div>
</template>

<script>
import { projectStorage, projectFirestore } from '../../plugins/firebaseConf.js'

export default {
  data() {
      return {
          ads: [
            {
              img: '',
              tag: '',
              title: '',
              date: '',
              body: '',
              id: '',
            },
          ]
      }
  },
  methods: {
      load: async function() {
          try {
              const res = projectFirestore.collection('ads')
              const snap = await res.get()
              let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
              })
              this.ads = docs
          } catch(err) {
              console.log(err)
          }
      }
  },
  mounted() {
      this.load()
  }
}
</script>

<style>

</style>