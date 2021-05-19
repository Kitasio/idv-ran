<template>
  <div>
      <div class="flex justify-between mb-3">
          <div class="uppercase text-lg font-semibold">новости</div>
          <NuxtLink to="/news" class="text-blue-600">все новости</NuxtLink>
      </div>
      <NuxtLink to="/">
        <img class="w-full" :src="singleNews.img" alt="">
        <div class="text-blue-600 text-xs font-bold mt-2" v-html="singleNews.tag"></div>
        <div class="font-bold mt-1 text-sm" v-html="singleNews.title"></div>
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