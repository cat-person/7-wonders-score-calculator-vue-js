<template>
   <div class="container" :style="{
        'background-color': getBackgroundColor(playerData.wonder),
        'margin': '0mm',
        'justify-self': 'center',
        'width': '110mm',
        'padding-top': '3mm',
        'padding-bottom': '3mm',
        'margin': '0mm'
      }">
    
    <TopBar
      :title="'Select wonder and enter data'"
      :showClose=true
      @close="handleClose"/>

    <WonderSelection
      :wonder="playerData.wonder"
      :availableWonderIds="availableWonders"
      @onWonderSelected="onWonderSelected($event)"
      @onSideChanged="handleSideChanged($event)"
      @onStageBuilt="onStageBuilt($event)"/>

    <Name
      :name="playerData.name"
      @changeName="handleNameChanged($event)"/>

    <Coins :coinCount="playerData.coinCount" @coinCountChanged="handleCoinCountChanged($event)"/>
    <Military :battles="playerData.battles" />
    <Culture :points="playerData.culturePoints" @culturePointsUpdated="handleCulturePointsUpdated($event)"/>
    <Trade :points="playerData.tradePoints" @tradePointsUpdated="handleTradePointsUpdated($event)"/>
    <Science :science="playerData.science" @scienceUpdated="handleScienceUpdated($event)"/>
    <Guild :points="playerData.guildPoints" @guildPointsUpdated="handleGuildPointsUpdated($event)"/>
    <br/>
    <button :disabled="!canAdd(playerData)" @click="handleAddPlayer">Done</button>
    <p class="error" v-if="!canAdd(playerData)">❗️ Enter your name to complete the form ❗️</p>
  </div>
</template>

<script>
import WonderSelection  from './components/WonderSelection.vue';
import Name  from '../Common/components/Name.vue';
import Coins from '../Common/components/Coins.vue';
import Military from '../Common/components/Military.vue';
import Culture from '../Common/components/Culture.vue';
import Trade from '../Common/components/Trade.vue';
import Science from '../Common/components/Science.vue';
import Guild from '../Common/components/Guild.vue';
import TopBar from '../Common/components/TopBar.vue';

import wonders from '@/assets/wonders.json'

function getDefault(availableWonders){
  return {
    name: '',
    wonder: {
      id: availableWonders[0],
      side: 'A',
      stageBuilt: 0,
    },
    coinCount: 0,
    battles: {
      'bronze.left': 'draw', 
      'bronze.right': 'draw',
      'silver.left': 'draw', 
      'silver.right': 'draw',
      'golden.left': 'draw', 
      'golden.right': 'draw'
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
    TopBar,
    Name,
    WonderSelection,
    Coins,
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
    handleClose() {
      this.$emit('close')
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
    handleCoinCountChanged(coinCount) {
      this.playerData.coinCount = coinCount
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
.error {
  color: darkred;
}
</style>