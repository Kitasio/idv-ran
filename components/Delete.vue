<template>
  <div v-if="admin" class="absolute opacity-0 hover:opacity-100 bg-white rounded transition text-blue-600 cursor-pointer top-2 right-2">
      <div class="text-xs p-1" @click.alt.self="del($event)">Удалить</div>
  </div>
</template>

<script>
import { projectFirestore, projectAuth, projectStorage } from '../plugins/firebaseConf'
export default {
    props: ['docId', 'collection', 'imgName'],
    data() {
        return {
            admin: null,
        }
    },
    mounted() {
        projectAuth.onAuthStateChanged(user => {
            if (user) {
                this.admin = user
            } else {
                this.admin = null
            }
        })
    },
    methods: {
        del: async function(e) {
            try {
                await projectFirestore.collection(this.collection).doc(this.docId).delete()
                if (this.imgName) {
                    const storageRef = projectStorage.ref(this.collection)
                    storageRef.child(this.imgName).delete().then(() => {
                        console.log('image deleted from the storage')
                    })
                }
                const parent = e.target.parentElement.parentElement
                parent.remove()
            } catch(err) {
                console.log(err)
            }
        }
    }
}
</script>

<style>

</style>