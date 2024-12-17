<script>
  import emblaCarouselVue from 'embla-carousel-vue'

  export default {
    setup() {
      const [emblaRef, emblaApi] = emblaCarouselVue()
      return { emblaRef, emblaApi }
    },
    props: {
      availableWonders: Array,
      currentId: Number,
      currentSide: String
    },
    data() {
      return {
        selectedStage: 0, 
        
      }
    },
    mounted() {
      this.emblaApi.scrollTo(this.currentId, true)
      this.emblaApi.on('select', (emblaApi) => {
        this.selectWonder(emblaApi)
      })
    },
    methods: {
      getImageByWonder(idx, currentSide) {
        let wonder = this.getWonder(idx, currentSide)
        return new URL(`../../../assets/${wonder.img}`, import.meta.url)
      },
      getWonder(idx, currentSide) {
        if(currentSide === 'A'){
          return this.availableWonders[idx].A
        } else {
          return this.availableWonders[idx].B
        }  
      },
      wonderName(idx) {
        return this.availableWonders[idx].name
      },
      selectWonder(emblaApi) {
        this.$emit('onWonderSelected', emblaApi.selectedScrollSnap())
      },
      changeSide() {
        this.$emit('onSideChanged', this.currentSide === 'A' ? 'B': 'A')
      },
      onChecked(event) {
        let id = parseInt(event.srcElement.id)
        if(event.srcElement.checked){
          this.selectedStage = id
        } else {
          this.selectedStage = id - 1
        }
      },
      calcWonderPoints(){
        let result = 0
        for (let idx = 0; idx < this.selectedStage; idx++) {
          result += getWonder(this.currentId, side).pointsByStages[idx];
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
        <div class="embla__slide" v-for="wonder, idx in availableWonders">
          <img class="img" v-bind:src="getImageByWonder(idx, currentSide)"/>
          <button @click="changeSide"> {{ currentSide }} </button>
          <div class="horizontal">
            <div v-for="pointsByStage, stageIdx in getWonder(idx, currentSide).pointsByStages">
              <p> {{ pointsByStage }} </p>
              <input type="checkbox" :checked="stageIdx < selectedStage" :id="stageIdx + 1" @change="onChecked($event)"/>
            </div>
          </div>
          <p> {{ wonder.name }} </p>
        </div>
      </li>
    </div>
    <p> Wonder points: {{ calcWonderPoints() }} </p>
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