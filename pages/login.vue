<template>
  <div>
      <form @submit.prevent="handleSubmit">
          <input v-model="email" type="email" required placeholder="email">
          <input v-model="password" type="password" required placeholder="password">
          <button>login</button>
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