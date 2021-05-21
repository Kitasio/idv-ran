<template>
  <div>
      <h1 class="text-3xl font-bold">Дирекция института</h1>

      <div class="mt-5 grid lg:grid-cols-4 gap-x-10">
          <div class="col-span-3">
              <table class="table-fixed w-full">
                <thead class="stag shadow-md h-14 sticky top-3 rounded-lg">
                    <tr class=" overscroll-x-auto">
                        <th class="w-1/4 text-left pl-5">Должность</th>
                        <th class="w-1/4 text-left pl-5">ФИО</th>
                        <th class="w-1/4 text-left pl-5">Телефон</th>
                        <th class="w-1/4 text-left pl-5">E-mail</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="person in people" :key="person.id" class="stag h-20 border-b border-black">
                        <td class="pl-5 py-3 select-all">{{ person.position }}</td>
                        <td class="pl-5 py-3 select-all text-blue-600">{{ person.name }}</td>
                        <td class="pl-5 py-3 select-all">{{ person.phone }}</td>
                        <td class="pl-5 py-3 select-all">{{ person.email }}</td>
                    </tr>
                </tbody>
               </table>
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
import { projectStorage, projectFirestore } from '../plugins/firebaseConf.js'

export default {
    data() {
        return {
            people: [
                {
                    position: '',
                    name: '',
                    phone: '',
                    email: '',
                    id: '',
                },
            ]
        }
    },
    methods: {
        load: async function() {
            try {
                await projectFirestore.collection('management').onSnapshot((snap) => {
                    let docs = snap.docs.map(doc => {
                     return { ...doc.data(), id: doc.id }
                    })
                    this.people = docs
                })
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