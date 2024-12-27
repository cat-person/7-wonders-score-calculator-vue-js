<template>
   <div class="container" :style="{'background-color': getWonder(playerScoreData.wonder.id, playerScoreData.wonder.currentSide).background}">
    <Name
      :name="playerScoreData.name"
      @changeName="onNameChanged($event)"/>
    <Wonder
      :wonderPoints="playerScoreData.wonder"
      @onWonderSelected="onWonderSelected($event)"
      @onSideChanged="onSideChanged($event)"
      @onStageBuilt="onStageBuilt($event)"/>

    <Gold :goldCount="playerScoreData.goldCount" :goldCountChanged="onGoldCountChanged($event)"/>
    <Military/>
    <Culture/>
    <Trade/>
    <Science/>
    <Guild/>
    <br/>
    <button @click="addPlayer()">Calc and finish</button>
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

const defaultScoreData = {
  name: '',
  wonder: {
    id: 'the_colossus_of_rhodes',
    currentSide: 'B',
    stageBuilt: 2,
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

export default {
  data() {
    let scoreData = defaultScoreData
    if(this.savedScoreData){
      scoreData = this.savedScoreData
    }
    
    console.error(`meow: ${JSON.stringify(defaultScoreData)}`)
    
    console.error(`scoreData.goldCount: ${scoreData.goldCount}`)

    return {
      wonders: wonders,
      playerScoreData: scoreData
    }  
  },
  props: {
    savedScoreData: Object
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
      this.playerScoreData.name = name
    },
    onGoldCountChanged(givenCount){
      console.error(`AppPlayer.onGoldCountChanged(${givenCount})`)
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
    onSideChanged(givenSide) {
      this.playerScoreData.wonder.currentSide = givenSide
    },
    onStageBuilt(stageBuilt) {
      this.playerScoreData.wonder.stageBuilt = stageBuilt
    },
    addPlayer() {
      this.$emit("onPlayerAdded", this.playerScoreData)
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