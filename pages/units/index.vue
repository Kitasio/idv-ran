<template>
  <div>
      <h1 class="text-3xl font-nova-bold">Подразделения</h1>

      <div class="mt-5 grid lg:grid-cols-4 gap-x-14 text-lg">
          <div class="col-span-4 lg:col-span-3">
              <div class="stag mb-5">В составе Института функционируют следующие научно-исследовательские центры:</div>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div class="relative w-full" v-for="unit in units" :key="unit.id">
                    <NuxtLink :to="`/units/${unit.id}`" class="relative flex flex-col justify-between rounded-lg shadow h-48 p-3">
                        <div class="font-nova-semi" v-html="unit.title"></div>
                        <div class="text-sm text-gray-500">{{ unit.name }}</div>
                        <img class="absolute w-7 top-2 right-2" :src="unit.img" alt="">
                    </NuxtLink>
                    <Delete collection="units" :docId="unit.id" :imgName="unit.imgName" />
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
import { projectStorage, projectFirestore } from '../../plugins/firebaseConf.js'
export default {
  data() {
      return {
          units: [],
      }
  },
  methods: {
      load: async function() {
          try {
              const res = projectFirestore.collection('units')
              const snap = await res.get()
              let docs = snap.docs.map(doc => {
                return { ...doc.data(), id: doc.id }
              })
              this.units = docs
          } catch(err) {
              console.log(err)
          }
      },
  },
  mounted() {
      this.load()
  }
}
</script>

<style>

</style>