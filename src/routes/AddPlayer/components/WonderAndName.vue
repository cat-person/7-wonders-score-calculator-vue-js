<script>
  import emblaCarouselVue from 'embla-carousel-vue'
  // import EmblaCarousel from 'embla-carousel'
  import { onMounted } from "vue";

  export default {
    setup() {
      const [emblaRef, emblaApi] = emblaCarouselVue()
      return { emblaRef, emblaApi }
    },
    
    data() {
      return {
        availableWonders: [
          { 
            id: 0, 
            name: 'Artemis Temple',
            img: 'Artemis_temple.jpg',
            background: 'red'
          },
          {
            id: 1,
            name: 'Gardens', 
            img: 'gardens.jpg',
            background: 'green'
          },
          {
            id: 2,
            name: 'Colossus', 
            img: 'Colossus.jpg',
            background: 'blue'
          },
          {
            id: 3,
            name: 'Colossus', 
            img: 'Colossus.jpg',
            background: "#ff0000"
          }
        ],
        currentId: 2
      }
    },
    mounted() {
      this.emblaApi.on('select', (emblaApi) => {
        this.selectWonder(emblaApi)
      })
      console.error(this.emblaApi)
    },
    methods: {
      getImageByWonder(img) {
        return new URL(`../../../assets/${img}`, import.meta.url)
      },
      getWonderByIdx(idx) {
        return this.availableWonders[idx]
      },
      selectWonder(emblaApi) {
        this.currentId = emblaApi.selectedScrollSnap()
      }
    }
  }
  
</script>

<template>
  <div class="container" :style="{'background-color': getWonderByIdx(currentId).background}">
    <div class="embla" ref="emblaRef">
      <li class="embla__container">
        <div class="embla__slide" v-for="wonder in availableWonders">
          <img class="img" v-bind:src="getImageByWonder(wonder.img)"/>
          <p> {{ wonder.name }} </p>
        </div>
      </li>
    </div>
    <div class="horizontal">
      <p>Enter the name: </p>
      <input type="text">
    </div>
    <p> {{ getWonderByIdx(currentId).name }}</p>
  </div>
</template>

<style scoped>
  .container {
    justify-self: center;
    width: 160mm;
  }
  .embla {
    overflow: hidden;
    width: 160mm;
    justify-self: center;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 160mm;
    min-width: 0;
  }
  .img {
    width: 160mm;
  }
  .horizontal { 
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
</style>