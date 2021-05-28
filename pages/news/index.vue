<template>
  <div>
      <div class="flex justify-between">
        <h1 class="text-3xl font-nova-bold">Новости института</h1>
        <div v-if="admin" @click="showForm = !showForm" class="p-2 text-blue-600 border-2 border-blue-600 transition cursor-pointer rounded-md hover:text-white hover:bg-blue-600">Добавить новость</div>
      </div>

      <form v-if="showForm" class="flex flex-col border-b border-blue-600 pb-10" @submit.prevent="saveToDb">
        <label for="image">Выберите картинку</label>
        <input @change="handleChange" class="mb-5" name="image" type="file" placeholder="Картинка">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.title" type="text" placeholder="Заголовок">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.tag" type="text" placeholder="Тег">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.date" type="text" placeholder="Дата">
        <textarea class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.body" type="text" placeholder="Текст"></textarea>

        <div>
            <button class="text-left p-3 rounded text-blue-600 transition bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white" v-if="!isLoading">Сохранить</button>
            <button class="text-left p-3 rounded text-blue-600 transition bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white" v-else disabled>Загрузка...</button>        
        </div>
      </form>

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
        <div @click="loadMore" class="font-nova-semi text-lg cursor-pointer text-blue-600">Показать еще</div>
      </div>
  </div>
</template>

<script>
import { projectStorage, projectFirestore, projectAuth } from '../../plugins/firebaseConf.js'

export default {
  data() {
      return {
          admin: null,
          last: null,
          previousId: null,
          isLoading: false,
          news: [],
          showForm: false,
          doc: {},
          file: null,
          lastSnap: null,
      }
  },
  methods: {
      load: async function() {
          try {
              const first = projectFirestore.collection('news').orderBy('date', 'desc')
              const snap = await first.get()
              this.lastSnap = snap.docs[snap.docs.length - 1]
              let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
              })
              this.news = docs
          } catch(err) {
              console.log(err)
          }
      },
      toUnix: function(date) {
        try {
          const lst = date.split('.')
          let day = lst[0]
          let month = lst[1]
          let year = lst[2]
          const unixDate = Date.parse(`${year}-${month}-${day}`)
          return unixDate
        } catch(err) {
          console.log(err)
        }
      },
      loadMore: async function() {
        try {
              const next = projectFirestore.collection('news').orderBy('title')
              const snap = await next.startAfter(this.lastSnap.data().title).get()
              const docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
              })
              console.log(docs)
              this.news += docs
          } catch(err) {
              console.log(err)
          }
      },
      saveToDb: async function() {
            try {
                if (this.doc.date) {
                  this.doc.unixDate = this.toUnix(this.doc.date)
                }
                if (this.file) {
                    this.isLoading = true
                    await this.uploadImage(this.file)
                }
                await projectFirestore.collection('news').add(this.doc)
                this.isLoading = false
                this.file = null
                this.doc = {}
                this.news = []
                this.load()
                this.showForm = false
            } catch(err) {
                console.log(err)
            }
        },
        handleChange: function(e) {
        // allowed file types
        const types = ['image/png', 'image/jpeg']

        // selected file
        const selected = e.target.files[0]
        console.log(selected)

        if (selected && types.includes(selected.type)) {
                this.file = selected
                this.doc.imgName = selected.name
            } else {
                this.file = null
            }
        },
        uploadImage: async function(file) {
        const filePath = `news/${file.name}`
        const storageRef = projectStorage.ref(filePath)

        try {
              const res = await storageRef.put(file)
              this.doc.imgPath = filePath
              this.doc.img = await res.ref.getDownloadURL()
            } catch(err) {
              console.log(err)
            }
        },
  },
  mounted() {
      this.load()
      projectAuth.onAuthStateChanged(user => {
        if (user) {
          this.admin = user
        } else {
          this.admin = null
        }
      })
  }
}
</script>

<style>

</style>