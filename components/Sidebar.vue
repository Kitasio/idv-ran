<template>
  <div class="flex flex-col justify-between">
      <div class="flex flex-col">
          <div class="flex justify-center mt-5">
              <img src="/sidebar/ru.svg" alt="">
              <img class="mx-3" src="/sidebar/ch.svg" alt="">
              <img src="/sidebar/uk.svg" alt="">
          </div>
          <div class="flex justify-center mt-5">
              <img src="/sidebar/logo.png" alt="">
          </div>
          <div class="mt-5 ml-8 mr-3">
              <div class="my-3">
                <NuxtLink to="/" class="text-md uppercase font-semibold hover:text-blue-600">Главная</NuxtLink>
              </div>
              <div>
                <div class="my-3 flex justify-between">
                    <h1 to="/" class="text-md uppercase font-semibold hover:text-blue-600">Институт</h1>
                    <img @click="links1.show = !links1.show" class="w-5 mr-7 cursor-pointer" src="/icons/chevron-down.svg" alt="">
                </div>
                <div v-if="links1.show" class="ml-3 flex flex-col">
                    <NuxtLink :to="link.link" class="mb-1 hover:text-blue-600" v-for="(link, index) in links1.items" :key="index">
                        {{ link.name }}
                    </NuxtLink>
                </div>
              </div>

              <div>
                <div class="my-3 flex justify-between">
                    <h1 to="/" class="text-md uppercase font-semibold hover:text-blue-600">ОБРАЗОВАНИЕ</h1>
                    <img @click="links2.show = !links2.show" class="w-5 mr-7 cursor-pointer" src="/icons/chevron-down.svg" alt="">
                </div>
                <div v-if="links2.show" class="ml-3 flex flex-col">
                    <NuxtLink to="/" class="mb-1 hover:text-blue-600" v-for="(link, index) in links2.items" :key="index">
                        {{ link }}
                    </NuxtLink>
                </div>
              </div>

              <div>
                <div class="my-3 flex justify-between">
                    <h1 to="/" class="text-md uppercase font-semibold hover:text-blue-600">НАУКА</h1>
                    <img @click="links3.show = !links3.show" class="w-5 mr-7 cursor-pointer" src="/icons/chevron-down.svg" alt="">
                </div>
                <div v-if="links3.show" class="ml-3 flex flex-col">
                    <NuxtLink to="/" class="mb-1 hover:text-blue-600" v-for="(link, index) in links3.items" :key="index">
                        {{ link }}
                    </NuxtLink>
                </div>
              </div>
              <div class="my-3">
                <NuxtLink to="/#########" class="text-md uppercase font-semibold hover:text-blue-600">Контакты</NuxtLink>
              </div>
          </div>
      </div>

      <div>
        <div class="ml-8 bottom-20 font-thin text-sm text-gray-400 mx-10">Copyright © 2020<br>ИДВ РАН</div>
        <img class="" src="/sidebar/bot-icon.svg" alt="">
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            links1: {
                show: false,
                items: [
                    { name: 'О нас', link: '/about' },
                    { name: 'Дирекция', link: '/#' },
                    { name: 'Подразделения', link: '/#######' },
                    { name: 'Ученый совет', link: '/##' },
                    { name: 'Документы', link: '/###' },
                    { name: 'Партнеры', link: '/####' },
                    { name: 'Вакансии и конкурсы', link: '/#####' },
                ]
            },
            links2: {
                show: false,
                items: [
                    'Аспирантура',
                    'Диссертационный совет',
                ]
            },
            links3: {
                show: false,
                items: [
                    'События',
                    'Издания',
                    'Библиотеки и базы данных',
                    'Проекты',
                ]
            },
        }
    }
}
</script>

<style>

</style>