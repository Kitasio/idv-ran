<template>
  <div>
    <div class="mb-10 text-3xl font-nova-semi">Добавить в дирекцию</div>
    <form class="flex flex-col" @submit.prevent="saveToDb">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.name" type="text" placeholder="Имя">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.position" type="text" placeholder="Должность">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.email" type="text" placeholder="E-mail">
        <input class="p-2 rounded shadow border-2 border-blue-600 ring-offset-2 mb-5" v-model="doc.phone" type="text" placeholder="Телефон">

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
                name: '',
                position: '',
                email: '',
                phone: '',
            },
        }
    },
    methods: {
        saveToDb: async function() {
            try {
                this.isLoading = true
                await projectFirestore.collection('management').add(this.doc)
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