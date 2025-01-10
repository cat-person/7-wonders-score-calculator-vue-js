<template>

   <div class="container" :style="{'background-color': getBackgroundColor(playerData.wonder, availableWonders)}">
  
    <div class="top_bar">
      <Name
        :name="playerData.name"
        @changeName="handleNameChanged($event)"/>
    
      <img
        class="close_btn"
        src="@/assets/close.svg"
        @click="handleCloseClicked"/>
    </div>

    <Wonder
      :wonder="playerData.wonder"
      @onStageBuilt="onStageBuilt($event)"
      @onSideChanged="handleSideChanged"
      />

    <Coins :coinCount="playerData.coinCount" @coinCountChanged="handleCoinCountChanged($event)"/>
    <Military :battles="playerData.battles" />
    <Culture :points="playerData.culturePoints" @culturePointsUpdated="handleCulturePointsUpdated($event)"/>
    <Trade :points="playerData.tradePoints" @tradePointsUpdated="handleTradePointsUpdated($event)"/>
    <Science :science="playerData.science" @scienceUpdated="handleScienceUpdated($event)"/>
    <Guild :points="playerData.guildPoints" @guildPointsUpdated="handleGuildPointsUpdated($event)"/>
    <br/>
    <button :disabled="!canAdd(playerData)" @click="handleFinishEditing">Done</button>
  </div>
</template>

<script>
import Name  from './components/Name.vue';
import Wonder  from './components/Wonder.vue';
import Coins from './components/Coins.vue';
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
    Coins,
    Military,
    Culture,
    Trade,
    Science,
    Guild,
  },

  methods: {
    getBackgroundColor(wonder) {
      return this.getWonder(wonder.id, wonder.side).background
    },
    handleNameChanged(name) {
      this.playerData.name = name
    },
    handleCoinCountChanged(givenCount){
      this.playerData.coinCount = givenCount
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
    canAdd(scoreData){
      return this.playerData.name != ""
    },
    handleFinishEditing() {
      this.$emit("finishEditing", this.playerData)
    },
    handleCloseClicked() {
      this.$emit("editPlayerClosed", this.playerData)
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

.top_bar {
  margin: 0mm;
  display: flex;
  /* margin-left: 6mm; */
  height: 10mm;
  background-color: #00000040;
}

.close_btn {
  width: 6mm;
  height: 6mm;
}
</style>