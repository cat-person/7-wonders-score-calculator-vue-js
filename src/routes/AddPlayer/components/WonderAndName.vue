<script>
  import emblaCarouselVue from 'embla-carousel-vue'
  // import EmblaCarousel from 'embla-carousel'
  import { onMounted } from "vue";

  export default {
    setup() {
      const [emblaRef, emblaApi] = emblaCarouselVue()
      return { emblaRef, emblaApi }
    },
    props: {
      availableWonders: Array,
      currentId: Number
    },
    data() {
      return {
        selectedStage: 0
          
      }
    },
    mounted() {
      this.emblaApi.scrollTo(this.currentId, true)
      this.emblaApi.on('select', (emblaApi) => {
        this.selectWonder(emblaApi)
      })
    },
    methods: {
      getImageByWonder(img) {
        return new URL(`../../../assets/${img}`, import.meta.url)
      },
      getWonderByIdx(idx) {
        return this.availableWonders[idx]
      },
      selectWonder(emblaApi) {
        this.$emit('onWonderSelected', emblaApi.selectedScrollSnap())
      },
      onChecked(event) {
        let id = parseInt(event.srcElement.id)
        console.error(`id: ${id}`)
        console.error(`selectedStage: ${this.selectedStage}`)
        if(event.srcElement.checked){
          this.selectedStage = id
        } else {
          this.selectedStage = id - 1
        }
        console.error(`newSelectedStage: ${this.selectedStage}`)
      },
      calcWonderPoints(){
        let result = 0
        for (let idx = 0; idx < this.selectedStage; idx++) {
          result += this.availableWonders[this.currentId].pointsByStages[idx];
        }
        return result
      }
    }
  }
  
</script>

<template>
  <div class="container">
    <div class="horizontal">
      <p>Enter the name: </p>
      <input type="text">
    </div>
    <div class="embla" ref="emblaRef">
      <li class="embla__container">
        <div class="embla__slide" v-for="wonder in availableWonders">
          <img class="img" v-bind:src="getImageByWonder(wonder.img)"/>
          <div class="horizontal">
            <div v-for="pointsByStage, idx in wonder.pointsByStages">
              <p> {{ pointsByStage }} </p>
              <input type="checkbox" :checked="idx < selectedStage" :id="idx + 1" @change="onChecked($event)"/>
            </div>
          </div>
          <p> {{ wonder.name }} </p>
        </div>
      </li>
    </div>
    <p> {{ calcWonderPoints() }} </p>
  </div>
</template>

<style scoped>
  .stage_container {
    width: 16mm;
  }
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