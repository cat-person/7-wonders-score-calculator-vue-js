<template>
  <div class="root">
    <TopBar
        :showClose=true
        :title="'Results'"
        @close="handleClose"/>

    <div class="results" v-for="playerScore in getRankedScores(playerScores)">
      <ResultItem 
        :playerScore="playerScore" 
        :rank = "rank"
        :points = "points"/>
    </div>

    <button class="new_game_button" @click="startNewGame">Start new game</button>

  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import ResultItem  from './components/ResultItem.vue';
  import TopBar from '../Common/components/TopBar.vue';
  import { toRaw } from 'vue';
  import * as util from '@/utils/calc';

  export default {
    data() {
      return {
        wonders: wonders,
      };
    },
    props: {
      playerScores: Array
    },
    components: {
      ResultItem,
      TopBar
    },
    methods: {
      startNewGame(){
        this.$emit("startNewGame")
      },
      isScoreBigger(score, scoreToCompare) {
        return scoreToCompare.finalPoints < score.finalPoints
              || (scoreToCompare.finalPoints == score.finalPoints && scoreToCompare.coinCount < score.coinCount)
      },
      getRankedScores(playerScores) {
        let result = Array(playerScores.length)

        for (let scoreIdx = 0; scoreIdx < playerScores.length; scoreIdx++) {
          let currentIdx = scoreIdx
          let currentScore = structuredClone(toRaw(playerScores[currentIdx]))
          currentScore.finalPoints = util.calcSum(currentScore)
          
          while (0 < currentIdx && this.isScoreBigger(currentScore, result[currentIdx - 1])){
            result[currentIdx] = result[currentIdx - 1]
            currentIdx--
          }
          result[currentIdx] = currentScore
        }
        return result
      },
      handleClose(){
        this.$emit("close")
      },
    }
  }
</script>

<style scoped>
.root {
  margin: 0mm;
  padding-top: 3mm;
  padding-bottom: 3mm;
}

.results {
  margin: 0mm;
  justify-self: center;
  justify-items: center;
}

.new_game_button {
  margin-top: 12mm;
  width: 40mm;
  height: 8mm;
  background-color: rosybrown;
}
</style>