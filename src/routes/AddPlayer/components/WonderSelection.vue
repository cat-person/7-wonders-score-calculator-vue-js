<script>
  import emblaCarouselVue from 'embla-carousel-vue'
  import Wonder  from './Wonder.vue';
  import wonders from '@/assets/wonders.json'
  import * as util from '@/utils/calc';

  function getAvailableWonders(availableWonderIds){
    let result = wonders.filter(wonder => availableWonderIds.some(availableWonderId => availableWonderId == wonder.id))
    console.error(`getAvailableWonders(${JSON.stringify(result)})`)
    return result 
  }

  export default {
    setup() {
      const [emblaRef, emblaApi] = emblaCarouselVue()
      return { emblaRef, emblaApi }
    },
    props: {
      wonder: Object,
      availableWonderIds: Array
    },
    data() {
      // console.error(`getAvailableWonders(availableWonderIds): ${getAvailableWonders(this.availableWonderIds)}`)
      return {
        availableWonders: getAvailableWonders(this.availableWonderIds),
        // wonder: this.wonder
      }
    },
    mounted() {
      this.emblaApi.scrollTo(wonders.findIndex(wonder => wonder.id == this.wonder.id), true)
      this.emblaApi.on('select', (emblaApi) => {
        this.selectWonder(emblaApi)
      })
    },
    components: {
      Wonder
    },
    methods: {
      getWonder(wonderId, side) {
        console.error(`Wonder.getWonder(wonderId: ${wonderId}, side: ${side})`)

        let result = undefined
        wonders.forEach((wonder) => { 
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
      getImageByWonder(wonderId, side) {
        console.error(`WonderAndName.getImageByWonder(wonderId: ${wonderId}, side: ${side})`)
        let wonder = this.getWonder(wonderId, side)
        return new URL(`../../../assets/${wonder.img}`, import.meta.url)
      },
      selectWonder(emblaApi) {
        this.$emit('onWonderSelected', getAvailableWonders(this.availableWonderIds)[emblaApi.selectedScrollSnap()].id)
      },
      handleSideChanged() {
        this.$emit('onSideChanged', this.wonder.side == 'A' ? 'B': 'A')
      },
      handleStageBuilt(selectedStage) {
        this.$emit("onStageBuilt", selectedStage)
      },
      calcWonderPoints(){
        let result = 0
        let pointsByStage = this.getWonder(this.wonder.id, this.wonder.side).pointsByStages
        for (let idx = 0; idx < pointsByStage.length; idx++) {
          if(idx < this.wonder.stageBuilt) {
            result += pointsByStage[idx];
          }
        }
        return result
      }
    }
  }
</script>

<template>
  <div> 
    <div class="embla" ref="emblaRef">
      <li class="embla__container">
        <div class="embla__slide" v-for="availableWonder in availableWonders">
          <Wonder
            :wonder="{
              id: availableWonder.id,
              side: wonder.side,
              stageBuilt: wonder.stageBuilt,
            }"
            @onStageBuilt="handleStageBuilt($event)"
            @onSideChanged="handleSideChanged"/>
        </div>
      </li>
    </div>
    <p> Wonder points: {{ calcWonderPoints() }} </p>
  </div>
</template>

<style scoped>
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
</style>