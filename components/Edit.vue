<template>
  <div v-if="edit">
    <form class="flex flex-col" @submit.prevent="update">
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
  </div>
</template>

<script>
import { projectFirestore, projectStorage } from '../plugins/firebaseConf'
export default {
    props: ['doc', 'coll', 'edit'],
    data() {
        return {
            open: true,
            isLoading: false,
            file: null,
        }
    },
    methods: {
      update: async function() {
          try {
              this.isLoading = true

              if (this.file) {
                await this.uploadImage(this.file)
              }
              const ref = await projectFirestore.collection(this.coll).doc(this.$route.params.id)
              ref.set(this.doc)
              this.isLoading = false
              this.edit = false
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
      const filePath = `${this.coll}/${file.name}`
      const storageRef = projectStorage.ref(filePath)

      try {
            const res = await storageRef.put(file)
            this.doc.imgPath = filePath
            this.doc.img = await res.ref.getDownloadURL()
          } catch(err) {
            console.log(err)
          }
      },
    }
}
</script>

<style>

</style>