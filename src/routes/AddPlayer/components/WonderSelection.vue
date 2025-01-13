<script>
import emblaCarouselVue from 'embla-carousel-vue'
import Wonder from '../../Common/components/Wonder.vue';
import wonders from '@/assets/wonders.json'

function getAvailableWonders(availableWonderIds) {
  let result = wonders.filter(wonder => availableWonderIds.some(availableWonderId => availableWonderId == wonder.id))
  console.error(`getAvailableWonders(${JSON.stringify(result)})`)
  return result
}

export default {
  setup() {
    const [emblaRef, emblaApi] = emblaCarouselVue({ loop: true })
    return { emblaRef, emblaApi }
  },
  props: {
    wonder: Object,
    availableWonderIds: Array
  },
  data() {
    return {
      availableWonders: getAvailableWonders(this.availableWonderIds),
      selectedWonderId: this.availableWonderIds[0]
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
        if (wonder.id == wonderId) {
          result = wonder
        }
      })

      if (side == 'A') {
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
      let selectedWonderIdx = emblaApi.selectedScrollSnap()
      this.selectedWonderId = this.availableWonders[selectedWonderIdx].id;
      this.$emit('onWonderSelected', this.selectedWonderId)
    },
    handleSideChanged() {
      this.$emit('onSideChanged', this.wonder.side == 'A' ? 'B' : 'A')
    },
    handleStageBuilt(selectedStage) {
      this.$emit("onStageBuilt", selectedStage)
    },
    handleLeftArrowClicked() {
        this.emblaApi.scrollPrev()
    },
    handleRightArrowClicked() {
        this.emblaApi.scrollNext()
    },
    calcWonderPoints() {
      let result = 0
      let pointsByStage = this.getWonder(this.wonder.id, this.wonder.side).pointsByStages
      for (let idx = 0; idx < pointsByStage.length; idx++) {
        if (idx < this.wonder.stageBuilt) {
          result += pointsByStage[idx];
        }
      }
      return result
    }
  }
}
</script>

<template>
  <div class="arrow_container">
    <div class="embla" ref="emblaRef">
      <li class="embla_container">
        <div class="embla_slide" v-for="(availableWonder, availableWonderIdx) in availableWonders">
          <div>
            <Wonder :wonder="{
              id: availableWonder.id,
              side: wonder.side,
              stageBuilt: wonder.stageBuilt,
            }" @onStageBuilt="handleStageBuilt($event)" @onSideChanged="handleSideChanged" />    
            
          </div>
        </div>
      </li>
    </div>
    <img
      class="arrow_left" 
      src="@/assets/arrow_left.svg" 
      @click="handleLeftArrowClicked" />
    
    <img 
      class="arrow_right" 
      src="@/assets/arrow_right.svg" 
      @click="handleRightArrowClicked" />
  </div>
</template>

<style scoped>
.embla {
  padding: 0mm;
  overflow: hidden;
  width: 160mm;
  justify-self: center;
}
.embla_container {
  margin: 0mm;
  display: flex;
}
.embla_slide {
  margin: 0mm;
  padding: 0mm;
  flex: 0 0 160mm;
  min-width: 0;
}

.arrow_container {
  position: relative;
  margin: 0mm;
  width: 160mm;
}

.arrow_right {
  position: absolute;
  height: 8mm;
  width: 8mm;
  top: 50%;
  right: 2mm;
}

.arrow_left {
  position:absolute;
  height: 8mm;
  width: 8mm;
  top: 50%;
  left: 2mm;
}
</style>