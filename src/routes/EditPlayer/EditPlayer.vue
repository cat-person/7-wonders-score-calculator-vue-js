<template>
   <div
   :style="{
    'background-color': getBackgroundColor(playerData.wonder, availableWonders),
    'padding-top': '3mm',
    'padding-bottom': '3mm'
    }
    ">
  
    <TopBar
        :showClose=true
        :title="`Edit data for ${playerData.name}`"
        @close="handleClose"/>

    <Wonder
      :wonder="playerData.wonder"
      @onStageBuilt="onStageBuilt($event)"
      @onSideChanged="handleSideChanged"/>

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
    <button :disabled="!canAdd(playerData)" @click="handleFinishEditing">Done</button>
  </div>
</template>

<script>
import Name  from '../Common/components/Name.vue';
import Wonder  from '../Common/components/Wonder.vue';
import Coins from '../Common/components/Coins.vue';
import Military from '../Common/components/Military.vue';
import Culture from '../Common/components/Culture.vue';
import Trade from '../Common/components/Trade.vue';
import Science from '../Common/components/Science.vue';
import Guild from '../Common/components/Guild.vue';

import wonders from '@/assets/wonders.json'
import TopBar from '../Common/components/TopBar.vue';

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
    TopBar,
    Wonder,
    Name,
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
    handleClose() {
      this.$emit("close")
    }
  },
};
</script>

<style>
.container {
  justify-self: center;
  width: 80mm;
  padding-top: 3mm;
  padding-bottom: 3mm;
}
</style>