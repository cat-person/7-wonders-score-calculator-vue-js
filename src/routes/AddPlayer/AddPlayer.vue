<template>
   <div class="container" :style="{'background-color': getBackgroundColor(playerData.wonder)}">
    
    <div class="top_bar">
      <Name
        :name="playerData.name"
        @changeName="handleNameChanged($event)"/>
      
      <img
        class="close_btn"
        src="@/assets/close.svg"
        @click="handleCloseClicked"/>

   </div>
    <WonderSelection
      :wonder="playerData.wonder"
      :availableWonderIds="availableWonders"
      @onWonderSelected="onWonderSelected($event)"
      @onSideChanged="handleSideChanged($event)"
      @onStageBuilt="onStageBuilt($event)"/>

    <Gold :goldCount="playerData.goldCount" @goldCountChanged="handleGoldCountChanged($event)"/>
    <Military :battles="playerData.battles" />
    <Culture :points="playerData.culturePoints" @culturePointsUpdated="handleCulturePointsUpdated($event)"/>
    <Trade :points="playerData.tradePoints" @tradePointsUpdated="handleTradePointsUpdated($event)"/>
    <Science :science="playerData.science" @scienceUpdated="handleScienceUpdated($event)"/>
    <Guild :points="playerData.guildPoints" @guildPointsUpdated="handleGuildPointsUpdated($event)"/>
    <br/>
    <button :disabled="!canAdd(playerData)" @click="handleAddPlayer">Done</button>
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
  data() {
    return {
      wonders: wonders,
      playerData: getDefault(this.availableWonders)
    }  
  },
  methods: {
    handleAddPlayer() {
      this.$emit("playerAdded", this.playerData)
    },
    handleCloseClicked() {
      console.error('AddPlayer.handleCloseClicked')
      this.$emit('addPlayerClosed')
    },
    onWonderSelected(wonderId) {
      this.playerData.wonder.id = wonderId
      console.error(`wonderId: ${wonderId}`)
    },
    handleSideChanged(givenSide) {
      this.playerData.wonder.side = givenSide
    },
    onStageBuilt(stageBuilt) {
      this.playerData.wonder.stageBuilt = stageBuilt
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
    handleNameChanged(name) {
      this.playerData.name = name
    },
    handleSideChanged(givenSide) {
      this.playerData.wonder.side = givenSide
    },
    onStageBuilt(stageBuilt) {
      this.playerData.wonder.stageBuilt = stageBuilt
    },
    handleCulturePointsUpdated(culturePoints){
      this.playerData.culturePoints = culturePoints
    },
    handleTradePointsUpdated(tradePoints){
      console.error(`EditPlayer.handleTradePointsUpdated(${tradePoints})`)
      this.playerData.tradePoints = tradePoints
    },
    handleScienceUpdated(science){
      this.playerData.science = science
    },
    handleGuildPointsUpdated(guildPoints){
      this.playerData.guildPoints = guildPoints
    },
    getBackgroundColor(wonder) {
      return this.getWonder(wonder.id, wonder.side).background
    },
    canAdd(scoreData){
      console.error(`AddPlayer.canAdd(${JSON.stringify(scoreData)})`)
      return scoreData.name != ""
    },
    handleAddPlayer() {
      this.$emit("playerAdded", this.playerData)
    }
  },
};
</script>

<style>
.top_bar {
  margin: 0mm;
  display: flex;
  /* margin-left: 6mm; */
  height: 10mm;
  background-color: #00000040;
}

.close_btn {
  padding: 2mm;
  width: 6mm;
  height: 6mm;
}

.container {
  margin: 0mm;
  justify-self: center;
  width: 160mm;
}
</style>