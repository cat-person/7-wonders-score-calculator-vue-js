<template>
   <div class="container" :style="{'background-color': getBackgroundColor(playerScoreData.wonder, availableWonders)}">
    <Name
      :name="playerScoreData.name"
      @changeName="onNameChanged($event)"/>
    
    <WonderSelection
      :wonder="playerScoreData.wonder"
      :availableWonderIds="availableWonders"
      @onWonderSelected="onWonderSelected($event)"
      @onSideChanged="handleSideChanged($event)"
      @onStageBuilt="onStageBuilt($event)"/>

    <Gold :goldCount="playerScoreData.goldCount" @goldCountChanged="handleGoldCountChanged($event)"/>
    <Military :battles="playerScoreData.battles"/>
    <Culture/>
    <Trade/>
    <Science/>
    <Guild/>
    <br/>
    <button :disabled="!canAdd(playerScoreData)" @click="addPlayer()">Calc and finish</button>
  </div>
</template>

<script>
import Name  from './components/Name.vue';
import WonderSelection  from './components/WonderSelection.vue';
import Gold from './components/Gold.vue';
import Military from './components/Military.vue';
import Culture from './components/Culture.vue';
import Trade from './components/Trade.vue';
import Science from './components/Science.vue';
import Guild from './components/Guild.vue';

import wonders from '@/assets/wonders.json'

function getDefault(availableWonders){
  return {
    name: '',
    wonder: {
      id: availableWonders[0],
      side: 'A',
      stageBuilt: 0,
    },
    goldCount: 0,
    battles: {
      'bronze.left': 'Lost', 
      'bronze.right': 'Lost',
      'silver.left': 'Lost', 
      'silver.right': 'Lost',
      'golden.left': 'Lost', 
      'golden.right': 'Lost'
    },
    culturePoints: 0,
    tradePoints: 0,
    science: {
      clayCount: 0,
      measurerCount: 0,
      cogCount: 0,
    },
    guildPoints: 0
  }
}

export default {
  data() {
    return {
      wonders: wonders,
      playerScoreData: getDefault(this.availableWonders)
    }  
  },
  props: {
    availableWonders: Array,
  },
  components: {
    Name,
    WonderSelection,
    Gold,
    Military,
    Culture,
    Trade,
    Science,
    Guild,
  },

  methods: {
    onNameChanged(name) {
      this.playerScoreData.name = name
    },
    handleGoldCountChanged(givenCount){
      this.playerScoreData.goldCount = givenCount
    },
    onWonderSelected(wonderId) {
      this.playerScoreData.wonder.id = wonderId
      console.error(`wonderId: ${wonderId}`)
    },
    getWonder(wonderId, side) {
      console.error(`AddPlayer.getWonder(wonderId: ${wonderId}, side: ${side})`)
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
      this.playerScoreData.wonder.side = givenSide
    },
    onStageBuilt(stageBuilt) {
      this.playerScoreData.wonder.stageBuilt = stageBuilt
    },
    addPlayer() {
      this.$emit("onPlayerAdded", this.playerScoreData)
    },
    isAvailable(wonder, availableWonders) {
      return availableWonders.some(availableWonder => availableWonder == wonder.id)
    },
    getBackgroundColor(wonder, availableWonders) {
      if(this.isAvailable(wonder, availableWonders)) {
        return this.getWonder(wonder.id, wonder.side).background
      }
      return '#808080'
    },
    canAdd(scoreData){
      return scoreData.name != ""
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