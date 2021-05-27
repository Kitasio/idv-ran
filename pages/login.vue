<template>
  <div>
      <form class="flex flex-col md:w-1/2" @submit.prevent="handleSubmit">
          <input class="p-2 mb-5 focus:bg-gray-100 rounded-md border-2 border-blue-600" v-model="email" type="email" required placeholder="email">
          <input class="p-2 mb-5 focus:bg-gray-100 rounded-md border-2 border-blue-600" v-model="password" type="password" required placeholder="password">
          <div>
            <button class="text-left p-2 border-2 border-blue-600 transition text-blue-600 hover:text-white hover:bg-blue-600 rounded-md">login</button>
          </div>
          <div class="mt-3 text-red-400">{{ error }}</div>
      </form>
  </div>
</template>

<script>
import { projectAuth } from '../plugins/firebaseConf'
export default {
    data() {
        return {
            email: null,
            password: null,
            error: null,
        }
    },
    methods: {
        handleSubmit: async function() {
            try {
                await projectAuth.signInWithEmailAndPassword(this.email, this.password)
            } catch(err) {
                this.error = err.message
            }
            await projectAuth.onAuthStateChanged(u => {
                if (u) {
                    this.error = null
                    this.$router.push('/admin')
                } else {
                    this.error = 'somethig went wrong'
                }
            })
        }
    }
}
</script>

<style>

</style>