<template>
  <div>
      <div class="flex justify-between mb-3">
          <div class="uppercase text-lg font-nova-semi">анонсы</div>
          <NuxtLink to="/ads" class="text-blue-600">все анонсы</NuxtLink>
      </div>
      <NuxtLink v-if="singleAd.title.length" :to="`/ads/${singleAd.id}`">
        <div class="font-nova-bold mt-1" v-html="singleAd.time"></div>
        <div class="text-blue-600 text-xs font-nova-bold mt-2" v-html="singleAd.tag"></div>
        <div class="font-nova-bold mt-1 text-sm" v-html="singleAd.title"></div>
        <div class="mt-1 text-sm" v-html="singleAd.date"></div>
      </NuxtLink>
  </div>
</template>

<script>
import { projectStorage, projectFirestore } from '../plugins/firebaseConf.js'
export default {
    data() {
        return {
            singleAd: {
                time: '',
                tag: '',
                title: '',
                date: '',
                id: '',
            }
        }
    },
    methods: {
        load: async function() {
            try {
                const res = projectFirestore.collection('ads').limit(1)
                const snap = await res.get()
                let docs = snap.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                this.singleAd = docs[0]
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