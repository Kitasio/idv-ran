<template>
  <div>
    <div class="mb-10 text-3xl font-nova-semi">Добавить новость</div>
    <form class="flex flex-col" @submit.prevent="saveToDb">
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
import { projectAuth, projectFirestore, projectStorage } from '../../plugins/firebaseConf'
export default {
    data() {
        return {
            isLogged: null,
            isLoading: false,
            doc: {
                title: '',
                tag: '',
                date: '',
                img: '',
                imgName: '',
                body: '',
            },
            file: null,
        }
    },
    methods: {
        saveToDb: async function() {
            try {
                if (this.file) {
                    this.isLoading = true
                    await this.uploadImage(this.file)
                }
                await projectFirestore.collection('news').add(this.doc)
                this.isLoading = false
                this.file = null
                this.doc = {}
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
    watch: {
        isLogged: function() {
            if (!this.isLogged) {
                this.$router.push('/')
            }
        }
    },
    mounted() {
        projectAuth.onAuthStateChanged(async u => {
            this.isLogged = u
            if (!u) {
                await this.$router.push('/')
            }
        })
    },
}
</script>

<style>

</style>