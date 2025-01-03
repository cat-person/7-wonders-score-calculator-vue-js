<template>
   <div class="container" :style="{'background-color': getBackgroundColor(playerData.wonder, availableWonders)}">
    <Name
      :name="playerData.name"
      @changeName="onNameChanged($event)"/>
    
    <Wonder
      :wonder="playerData.wonder"
      @onStageBuilt="onStageBuilt($event)"
      @onSideChanged="handleSideChanged"
      />

    <Gold :goldCount="playerData.goldCount" @goldCountChanged="handleGoldCountChanged($event)"/>
    <Military/>
    <Culture/>
    <Trade/>
    <Science/>
    <Guild/>
    <br/>
    <button :disabled="!canAdd(playerData)" @click="handleFinishEditing">Finish editing</button>
  </div>
</template>

<script>
import Name  from './components/Name.vue';
import Wonder  from './components/Wonder.vue';
import Gold from './components/Gold.vue';
import Military from './components/Military.vue';
import Culture from './components/Culture.vue';
import Trade from './components/Trade.vue';
import Science from './components/Science.vue';
import Guild from './components/Guild.vue';

import wonders from '@/assets/wonders.json'

export default {
  props: {
    playerScore: Object
  },
  data() {
    return {
      wonders: wonders,
      playerData: this.playerScore,
    }  
  },
  components: {
    Name,
    Wonder,
    Gold,
    Military,
    Culture,
    Trade,
    Science,
    Guild,
  },

  methods: {
    onNameChanged(name) {
      this.playerData.name = name
    },
    handleGoldCountChanged(givenCount){
      this.playerData.goldCount = givenCount
    },
    onWonderSelected(wonderId) {
      this.playerData.wonder.id = wonderId
      console.error(`wonderId: ${wonderId}`)
    },
    getWonder(wonderId, side) {
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
    handleSideChanged(givenSide) {
      this.playerData.wonder.side = givenSide
    },
    onStageBuilt(stageBuilt) {
      this.playerData.wonder.stageBuilt = stageBuilt
    },
    handleFinishEditing() {
      this.$emit("finishEditing", this.playerData)
    },
    getBackgroundColor(wonder) {
      return this.getWonder(wonder.id, wonder.side).background
    },
    canAdd(scoreData){
      return this.playerData.name != ""
    }
  },
};
</script>

<style>
.container {
  justify-self: center;
  width: 160mm;
  padding-top: 6mm;
  padding-bottom: 6mm;
}

.radio-group {
  margin: 20px;
  display: flex;
  flex-direction: row;
  background-color: brown;
}

.radio-group label {
  margin-right: 20px; /* Space between radio buttons */
}
</style>