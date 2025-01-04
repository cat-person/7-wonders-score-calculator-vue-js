<template>
   <div class="container" :style="{'background-color': getBackgroundColor(playerData.wonder, availableWonders)}">
    
    <img
      class="close_btn"
      src="@/assets/close.svg"
      @click="handleCloseClicked"/>

    <Name
      :name="playerData.name"
      @changeName="handleNameChanged($event)"/>
    
    <Wonder
      :wonder="playerData.wonder"
      @onStageBuilt="onStageBuilt($event)"
      @onSideChanged="handleSideChanged"
      />

    <Gold :goldCount="playerData.goldCount" @goldCountChanged="handleGoldCountChanged($event)"/>
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
    getBackgroundColor(wonder) {
      return this.getWonder(wonder.id, wonder.side).background
    },
    handleNameChanged(name) {
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

.close_btn {
  width: 6mm;
  height: 6mm;
}
</style>