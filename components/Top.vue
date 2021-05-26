<template>
  <div class="bg-blue-700 font-nova-semi text-sm text-white flex items-center  py-3">
      <h1>ИНСТИТУТ ДАЛЬНЕГО ВОСТОКА РАН | ОСНОВАН В 1966 ГОДУ</h1>
      <div class="ml-10">{{ user }}</div>
      <div class="ml-10 cursor-pointer" @click="logout" v-if="user">Logout</div>
  </div>
</template>

<script>
import { projectAuth } from '../plugins/firebaseConf'
export default {
  data() {
    return {
      user: null,
    }
  },
  methods: {
    getUser: async function() {
      this.user = projectAuth.onAuthStateChanged(u => {
        if (u) {
          this.user = u.email
        } else {
          this.user = null
        }
      })
    },
    logout: async function() {
      projectAuth.signOut()
      this.user = null
    }
  },
  mounted() {
    this.getUser()
  }
}
</script>

<style>

</style>