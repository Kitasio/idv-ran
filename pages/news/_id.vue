<template>
  <div>
      <div class="mt-5 grid lg:grid-cols-4 gap-x-10">
          <div class="col-span-4 md:col-span-3 mt-2">
              <img class="w-full rounded-lg shadow-md" :src="singleNews.img" alt="">
              <div class="my-3 text-sm">{{ singleNews.date }}</div>
              <div class="font-nova-bold mt-1 text-lg">{{ singleNews.title }}</div>
              <div class="text-blue-600 text-xs font-nova-bold mt-2">{{ singleNews.tag }}</div>
              <div class="mt-10" v-html="singleNews.body"></div>
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
            singleNews: {
                img: '',
                tag: '',
                title: '',
                body: '',
                date: '',
                id: '',
            }
        }
    },
    methods: {
        load: async function() {
            try {
                const ref = await projectFirestore.collection('news').doc(this.$route.params.id)
                const doc = await ref.get()
                this.singleNews = doc.data()
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