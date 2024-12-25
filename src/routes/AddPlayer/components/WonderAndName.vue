<script>
  import emblaCarouselVue from 'embla-carousel-vue'
  import wonders from '@/assets/wonders.json'
  import * as util from '@/utils/calc';

  export default {
    setup() {
      const [emblaRef, emblaApi] = emblaCarouselVue()
      return { emblaRef, emblaApi }
    },
    props: {
      wonderPoints: Object
    },
    data() {
      return {
        wonders: wonders,
      }
    },
    mounted() {
      this.emblaApi.scrollTo(wonders.findIndex(wonder => wonder.id == this.wonderPoints.id), true)
      this.emblaApi.on('select', (emblaApi) => {
        this.selectWonder(emblaApi)
      })
    },
    methods: {
      getImageByWonder(wonderId, side) {
        console.error(`WonderAndName.getImageByWonder(wonderId: ${wonderId}, side: ${side})`)
        let wonder = this.getWonder(wonderId, side)
        return new URL(`../../../assets/${wonder.img}`, import.meta.url)
      },
      getWonder(wonderId, side) {
        console.error(`WonderAndName.getWonder(wonderId: ${wonderId}, side: ${side})`)

        let result = undefined
        this.wonders.forEach((wonder) => { 
          if(wonder.id == wonderId){
            result = wonder
          }
        })

        if(side == 'A'){
          return result.A
        } else {
          return result.B
        }  
      },
      selectWonder(emblaApi) {
        this.$emit('onWonderSelected', wonders[emblaApi.selectedScrollSnap()].id)
      },
      changeSide() {
        this.$emit('onSideChanged', this.wonderPoints.currentSide == 'A' ? 'B': 'A')
      },
      onChecked(event) {
        console.error(`onChecked(${event})`)
        let id = parseInt(event.srcElement.id)
        let selectedStage = 0
        if(event.srcElement.checked){
          selectedStage = id
        } else {
          selectedStage = id - 1
        }
        this.$emit("onStageBuilt", selectedStage)
      },
      calcGoldPoints(goldCount){
        return util.calcGoldPoints(goldCount)
      },
      calcWonderPoints(){
        let result = 0
        let pointsByStage = this.getWonder(this.wonderPoints.id, this.wonderPoints.currentSide).pointsByStages
        for (let idx = 0; idx < pointsByStage.length; idx++) {
          if(idx < this.wonderPoints.stageBuilt) {
            result += pointsByStage[idx];
          }
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
        <div class="embla__slide" v-for="wonder in wonders">
          <img class="img" v-bind:src="getImageByWonder(wonder.id, wonderPoints.side)"/>
          <button @click="changeSide"> {{ wonderPoints.currentSide }} </button>
          <div class="horizontal">
            <div v-for="pointsByStage, stageIdx in getWonder(wonder.id, wonderPoints.currentSide).pointsByStages">
              <p> {{ pointsByStage }} </p>
              <input type="checkbox" :checked="stageIdx < wonderPoints.stageBuilt" :id="stageIdx + 1" @change="onChecked($event)"/>
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