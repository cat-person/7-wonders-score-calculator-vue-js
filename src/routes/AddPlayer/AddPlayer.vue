<template>
   <div class="container" :style="{
        'background-color': getBackgroundColor(playerScore.wonder),
        'margin': '0mm',
        'justify-self': 'center',
        'width': '100%',
        'padding-top': '3mm',
        'padding-bottom': '3mm',
        'margin': '0mm'
      }">
    
    <TopBar
      :title="'Select wonder and enter data'"
      :showClose=true
      @close="handleClose"/>

    <!-- :availableWonderIds="availableWonders" -->
    <WonderSelection
      :wonder="playerScore.wonder"
      @onWonderSelected="onWonderSelected($event)"
      @onSideChanged="handleSideChanged($event)"
      @onStageBuilt="onStageBuilt($event)"/>

    <Name
      :name="playerScore.name"
      @changeName="handleNameChanged($event)"/>

    <Coins :coinCount="playerScore.coinCount" @coinCountChanged="handleCoinCountChanged($event)"/>
    <Military :points="playerScore.militaryPoints" @militaryPointsUpdated="handleMilitaryPointsUpdated($event)"/>
    <Culture :points="playerScore.culturePoints" @culturePointsUpdated="handleCulturePointsUpdated($event)"/>
    <Trade :points="playerScore.tradePoints" @tradePointsUpdated="handleTradePointsUpdated($event)"/>
    <Science :science="playerScore.science" @scienceUpdated="handleScienceUpdated($event)"/>
    <Guild :points="playerScore.guildPoints" @guildPointsUpdated="handleGuildPointsUpdated($event)"/>
    <br/>
    <button :disabled="!canAdd(playerScore)" @click="handleAddPlayer($route.params.session_id, playerScore)">Done</button>
    <p class="error" v-if="!canAdd(playerScore)">❗️ Enter your name to complete the form ❗️</p>
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
import { addPlayerScore } from '@/utils/remote'

const defaultPlayerScore = {
  name: '',
  wonder: {
    id: wonders[0].id,
    side: 'A',
    stageBuilt: 0,
  },
  coinCount: 0,
  militaryPoints: 0,
  culturePoints: 0,
  tradePoints: 0,
  science: {
    clayCount: 0,
    measurerCount: 0,
    cogCount: 0,
  },
  guildPoints: 0
}

export default {
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
      playerScore: defaultPlayerScore
    }  
  },
  methods: {
    handleClose() {
      // navigate to players
      // this.$emit('close')
    },
    onWonderSelected(wonderId) {
      this.playerScore.wonder.id = wonderId
    },
    handleSideChanged(givenSide) {
      this.playerScore.wonder.side = givenSide
    },
    onStageBuilt(stageBuilt) {
      this.playerScore.wonder.stageBuilt = stageBuilt
    },
    getWonder(wonderId, side) {
      console.debug(`AddPlayer.getWonder(wonderId: ${wonderId}, side: ${side})`)
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
      this.playerScore.name = name
    },
    handleSideChanged(givenSide) {
      this.playerScore.wonder.side = givenSide
    },
    onStageBuilt(stageBuilt) {
      this.playerScore.wonder.stageBuilt = stageBuilt
    },
    handleCoinCountChanged(coinCount) {
      this.playerScore.coinCount = coinCount
    },
    handleMilitaryPointsUpdated(militaryPoints){
      this.playerScore.militaryPoints = militaryPoints
    },
    handleCulturePointsUpdated(culturePoints){
      this.playerScore.culturePoints = culturePoints
    },
    handleTradePointsUpdated(tradePoints){
      console.debug(`EditPlayer.handleTradePointsUpdated(${tradePoints})`)
      this.playerScore.tradePoints = tradePoints
    },
    handleScienceUpdated(science){
      this.playerScore.science = science
    },
    handleGuildPointsUpdated(guildPoints){
      this.playerScore.guildPoints = guildPoints
    },
    getBackgroundColor(wonder) {
      return this.getWonder(wonder.id, wonder.side).background
    },
    canAdd(scoreData){
      console.debug(`AddPlayer.canAdd(${JSON.stringify(scoreData)})`)
      return scoreData.name != ""
    },
    handleAddPlayer(sessionId, playerScore) {
      addPlayerScore(sessionId, playerScore)
      this.$router.push(`/${sessionId}`)
    }
  },
};
</script>

<style>
.error {
  color: darkred;
}
</style>