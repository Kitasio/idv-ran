<template>
  <div>
      <div class="flex justify-between mb-3">
          <div class="uppercase text-lg font-nova-semi">новости</div>
          <NuxtLink to="/news" class="text-blue-600">все новости</NuxtLink>
      </div>
      <NuxtLink  :to="`/news/${singleNews.id}`">
        <img v-if="singleNews.img" class="w-full rounded" :src="singleNews.img" alt="">
        <div class="text-blue-600 text-xs font-nova-bold mt-2" v-html="singleNews.tag"></div>
        <div class="font-nova-bold mt-1 text-sm" v-html="singleNews.title"></div>
        <div class="mt-1 text-sm" v-html="singleNews.date"></div>
      </NuxtLink>
  </div>
</template>

<script>
import { projectStorage, projectFirestore } from '../plugins/firebaseConf.js'
export default {
    data() {
        return {
            singleNews: {
                img: '',
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
                const res = projectFirestore.collection('news').limit(1)
                const snap = await res.get()
                let docs = snap.docs.map(doc => {
                    return { ...doc.data(), id: doc.id }
                })
                this.singleNews = docs[0]
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