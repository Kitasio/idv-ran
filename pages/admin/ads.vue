<template>
  <div>
    <div class="mb-10 text-3xl font-nova-semi">Добавить анонс</div>
    <form class="flex flex-col" @submit.prevent="saveToDb">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.title" type="text" placeholder="Заголовок">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.tag" type="text" placeholder="Тег">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.time" type="text" placeholder="Время анонса">
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
                time: '',
                body: '',
            },
        }
    },
    methods: {
        saveToDb: async function() {
            try {
                this.isLoading = true
                await projectFirestore.collection('ads').add(this.doc)
                this.isLoading = false
                this.file = null
                this.doc = {}
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