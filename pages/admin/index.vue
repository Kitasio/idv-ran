<template>
  <div>
      <div>
          <div class="mb-10 text-3xl font-nova-semi">Добавить:</div>
          <NuxtLink class="mr-5 text-left p-3 rounded text-blue-600 transition bg-white border-2 border-blue-600 hover:bg-blue-600 hover:text-white" v-for="item in collections" :key="item.name" :to="`admin/${item.name}`" >{{ item.ru }}</NuxtLink>
      </div>
  </div>
</template>

<script>
import { projectAuth, projectFirestore } from '../../plugins/firebaseConf'
export default {
    data() {
        return {
            isLogged: null,
            collections: [
                {
                    name: 'news',
                    ru: 'Новость',
                },
                {
                    name: 'ads',
                    ru: 'Анонс',
                },
                {
                    name: 'management',
                    ru: 'Дирекцию',
                },
            ]
        }
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