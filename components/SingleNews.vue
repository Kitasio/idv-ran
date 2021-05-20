<template>
  <div>
      <div class="flex justify-between mb-3">
          <div class="uppercase text-lg font-nova-semi">новости</div>
          <NuxtLink to="/news" class="text-blue-600">все новости</NuxtLink>
      </div>
      <NuxtLink v-if="singleNews.img.length" :to="`/news/${singleNews.id}`">
        <img class="w-full rounded" :src="singleNews.img" alt="">
        <div class="text-blue-600 text-xs font-nova-bold mt-2" v-html="singleNews.tag"></div>
        <div class="font-nova-bold mt-1 text-sm" v-html="singleNews.title"></div>
        <div class="mt-1 text-sm" v-html="singleNews.date"></div>
      </NuxtLink>
      <LoadingNews v-else></LoadingNews>
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
                await projectFirestore.collection('news').onSnapshot((snap) => {
                    let docs = snap.docs.map(doc => {
                     return { ...doc.data(), id: doc.id }
                    })
                    this.singleNews = docs[0]
                })
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