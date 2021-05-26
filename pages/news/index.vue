<template>
  <div>
      <h1 class="text-3xl font-nova-bold">Новости института</h1>

      <div class="mt-10 grid lg:grid-rows-2 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div class="relative" v-for="singleNews in news" :key="singleNews.id">
          <NuxtLink :to="`/news/${singleNews.id}`">
            <img class="w-full rounded" :src="singleNews.img" alt="">
            <div class="text-blue-600 text-xs font-nova-bold mt-2" v-html="singleNews.tag"></div>
            <div class="font-nova-bold mt-1 text-sm" v-html="singleNews.title"></div>
            <div class="mt-1 text-sm" v-html="singleNews.date"></div>
          </NuxtLink>
          <Delete collection="news" :docId="singleNews.id" :imgName="singleNews.imgName" />
        </div>
        
      </div>

      <div class="flex mt-5">
        <!-- <div @click="prev" class="font-nova-semi text-lg cursor-pointer py-1 px-3 transition text-blue-600 hover:text-white hover:bg-blue-600 rounded">Назад</div> -->
        <div @click="next" class="font-nova-semi text-lg cursor-pointer text-blue-600">Далее</div>
      </div>
  </div>
</template>

<script>
import { projectStorage, projectFirestore } from '../../plugins/firebaseConf.js'

export default {
  data() {
      return {
          last: null,
          previousId: null,
          news: [
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
              const first = projectFirestore.collection('news').orderBy('title').limit(8)
              const snapshot = await first.onSnapshot(snap => {
                let docs = snap.docs.map(doc => {
                  return { ...doc.data(), id: doc.id }
                })
                this.news = docs
              })
          } catch(err) {
              console.log(err)
          }
      },
      next: async function() {
              const next = projectFirestore.collection('news')
                .orderBy('title')
                .startAfter(this.last.data().title)
                .limit(8)
              const snapshot = await next.get()
              let docs = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
              })
              this.news = docs
      },
      prev: async function() {

              const getFirst = await projectFirestore.collection('news').doc(this.previousId).get()
              const prev = projectFirestore.collection('news')
                      .orderBy('title')
                      .startAt(getFirst.data().title)
                      .limit(8)
              const snapshot = await prev.get()
              let docs = snapshot.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
              })
              this.news = docs

      }
  },
  mounted() {
      this.load()
  }
}
</script>

<style>

</style>