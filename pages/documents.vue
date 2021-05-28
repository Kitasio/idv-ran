<template>
  <div>
      <div class="flex justify-between">
        <h1 class="text-3xl font-nova-bold">Документы</h1>
        <div v-if="admin" @click="showForm = !showForm" class="p-2 text-blue-600 border-2 border-blue-600 transition cursor-pointer rounded-md hover:text-white hover:bg-blue-600">Добавить документ</div>
      </div>

      <form v-if="showForm" class="flex flex-col border-b border-blue-600 pb-10" @submit.prevent="saveToDb">
        <label for="image">Выберите картинку</label>
        <input @change="handleChange" class="mb-5" name="image" type="file" placeholder="Картинка">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.name" type="text" placeholder="Имя">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.link" type="text" placeholder="Ссылка">

        <div>
            <button class="text-left p-3 rounded text-blue-600 transition bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white" v-if="!isLoading">Сохранить</button>
            <button class="text-left p-3 rounded text-blue-600 transition bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white" v-else disabled>Загрузка...</button>        
        </div>
      </form>

      <div class="mt-5 grid lg:grid-cols-4 gap-x-14 text-lg">
          <div class="col-span-4 lg:col-span-3">
              <p>Главные информационные ресурсы института</p>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div class="relative w-full" v-for="document in documents" :key="document.id">
                    <a :href="document.link" class="flex h-full flex-col justify-between rounded-lg transition duration-500 shadow-brand hover:shadow-bigger p-3">
                        <div class="flex h-32 items-center justify-center">
                            <img class="max-h-28" :src="document.img" alt="">
                        </div>
                        <div class="text-blue-600" v-html="document.name"></div>
                    </a>
                    <Delete collection="documents" :docId="document.id" :imgName="document.imgName" />
                  </div>
              </div>
          </div>
          <div class="mt-10 lg:mt-0 col-span-4 lg:col-span-1 mb-5">
              <div class="grid sm:grid-cols-2 gap-5 lg:grid-cols-1">
                  <SingleNews class="mb-5"></SingleNews>
                  <SingleAd></SingleAd>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { projectStorage, projectFirestore, projectAuth } from '../plugins/firebaseConf.js'
export default {
  data() {
      return {
          admin: null,
          documents: [],
          showForm: false,
          isLoading: false,
          file: null,
          doc: {},
      }
  },
  methods: {
      load: async function() {
          try {
              const res = projectFirestore.collection('documents')
              const snap = await res.get()
              let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
              })
              this.documents = docs
          } catch(err) {
              console.log(err)
          }
      },
      saveToDb: async function() {
            try {
                if (this.file) {
                    this.isLoading = true
                    await this.uploadImage(this.file)
                }
                await projectFirestore.collection('documents').add(this.doc)
                this.isLoading = false
                this.file = null
                this.doc = {}
                this.documents = []
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
        const filePath = `documents/${file.name}`
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