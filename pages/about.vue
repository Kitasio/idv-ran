<template>
  <div class="">
      <h1 class="text-3xl font-bold">О нас</h1>

      <div class="mt-5 grid lg:grid-cols-4 gap-x-10">
          <div class="col-span-3">
              <div class="mb-5">Институт Дальнего Востока РАН создан на основании постановления Президиума АН СССР в сентябре 1966 года.</div>
              <div class="mb-5">Его главной задачей было комплексное изучение проблем Китая, Японии, Корейской Народно-Демократической Республики, Республики Корея, отношений Советского Союза/России с этими государствами, опыта социально-экономического развития названных стран, их истории и культуры, содействие межцивилизационному диалогу со странами СВА.</div>
              <div class="mb-5 font-semibold">В настоящее время основными направлениями деятельности Института являются:</div>
              <div class="grid md:grid-cols-2 gap-5">
                  <div class="flex items-start" v-for="(card, index) in cards" :key="index">
                      <img class="mr-3 w-10 mt-1" :src="card.img" alt="">
                      <p v-html="card.text"></p>
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
export default {
    data() {
        return {
            cards: [
                {
                    img: '/about/1.svg',
                    text: 'Становление полицентричного мира и&nbsp;Восточно-азиатское измерение национальной безопасности России. Россия и&nbsp;АТР в&nbsp;XXI&nbsp;веке.',
                },
                {
                    img: '/about/2.svg',
                    text: 'Комплексный анализ и&nbsp;прогноз социально-политического и&nbsp;экономического развития стран Восточной Азии.',
                },
                {
                    img: '/about/3.svg',
                    text: 'Роль России, Китая и&nbsp;Индии в&nbsp;обеспечении стратегической стабильности в&nbsp;Центральной Азии. Проблемы развития ШОС.',
                },
                {
                    img: '/about/4.svg',
                    text: 'Межцивилизационный диалог в&nbsp;Восточной Азии.',
                },
                {
                    img: '/about/5.svg',
                    text: 'Процессы экономической интеграции в&nbsp;Восточной Азии и&nbsp;АТР и&nbsp;пути оптимизации включения России и&nbsp;ее&nbsp;восточных регионов в&nbsp;этот процесс.',
                },
                {
                    img: '/about/6.svg',
                    text: 'Реформирующиеся Россия и&nbsp;Китай в&nbsp;мировых процессах глобализации и&nbsp;регионализации в&nbsp;XXI&nbsp;веке. Потенциал их&nbsp;соразвития.',
                },
                {
                    img: '/about/6.svg',
                    text: 'Исторический опыт развития отношений России с&nbsp;Китаем, Японией и&nbsp;корейскими государствами. Документы и&nbsp;прогнозы.',
                },
            ]
        }
    }
}
</script>

<style>

</style>