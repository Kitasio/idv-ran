<template>
  <div>
      <div class="mt-5 grid lg:grid-cols-4 gap-x-10">
          <Edit class="col-span-4 md:col-span-3 mt-2 mb-10" :edit="edit" coll="units" :doc="unit" />
          <div class="col-span-4 md:col-span-3 mt-2">
              <div class="font-nova-bold mt-1 text-lg">{{ unit.title }}</div>
              <div class="mt-10" v-html="unit.body"></div>
          </div>
          <div class="mt-10 lg:mt-0 col-span-4 lg:col-span-1 mb-5">
              <div class="grid sm:grid-cols-2 gap-5 lg:grid-cols-1 sticky top-3">
                  <SingleNews class="mb-5"></SingleNews>
                  <SingleAd class="mb-5"></SingleAd>
                  <div class="flex">
                    <div class="text-blue-600 border p-3 rounded border-blue-600 transition hover:bg-blue-600 hover:text-white cursor-pointer" @click="edit = !edit" v-if="admin">Редактировать</div>
                  </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import { projectStorage, projectFirestore, projectAuth } from '../../plugins/firebaseConf.js'
export default {
    data() {
        return {
            admin: null,
            edit: false,
            unit: {},
        }
    },
    methods: {
        load: async function() {
            try {
                const ref = await projectFirestore.collection('units').doc(this.$route.params.id)
                const doc = await ref.get()
                this.unit = doc.data()
            } catch(err) {
                console.log(err)
            }
        }
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