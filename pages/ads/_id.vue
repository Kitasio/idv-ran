<template>
  <div>
      <div class="mt-5 grid lg:grid-cols-4 gap-x-10">
          <div class="col-span-4 md:col-span-3 mt-2">
              <div class="font-nova-bold mt-1 text-lg">{{ singleAd.time }}</div>
              <div class="font-nova-bold mt-1 text-lg">{{ singleAd.title }}</div>
              <div class="text-blue-600 text-xs font-nova-bold mt-2">{{ singleAd.tag }}</div>
              <div class="mt-10" v-html="singleAd.body"></div>
              <div class="my-3 text-sm">{{ singleAd.date }}</div>
          </div>
          <div class="mt-10 lg:mt-0 col-span-4 lg:col-span-1 mb-5">
              <div class="grid sm:grid-cols-2 gap-5 lg:grid-cols-1 sticky top-3">
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
            singleAd: {
                tag: '',
                title: '',
                time: '',
                body: '',
                date: '',
                id: '',
            }
        }
    },
    methods: {
        load: async function() {
            try {
                const ref = await projectFirestore.collection('ads').doc(this.$route.params.id)
                const doc = await ref.get()
                this.singleAd = doc.data()
            } catch(err) {
                console.log(err)
            }
        }
    },
    mounted() {
        this.load()
    }
}
</script>

<style>

</style>