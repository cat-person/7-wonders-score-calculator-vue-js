<template>
  <div class="root">
    <TopBar
        :showClose=true
        :title="'Results'"
        @close="handleClose"/>

    <div class="results" v-for="playerScore in playerScores">
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
  import * as util from '@/utils/calc';

  export default {
    data() {
      console.error(`Players.data(): { playerScores: ${JSON.stringify(this.playerScores)} }`)
      return {
        playerScores: this.playerScores,
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
      handleDetermineTheWinnerClicked(playerScores) {
        let result = Array(playerScores.length)

        for (let scoreIdx = 0; scoreIdx < playerScores.length; scoreIdx++) {
          let currentIdx = scoreIdx
          let currentScore = playerScores[currentIdx]
          currentScore.finalPoints = util.calcSum(currentScore)
          currentScore.rank = scoreIdx + 1
          
          while (0 < currentIdx) { 
            let scoreToCompare = result[currentIdx-1]
            if(scoreToCompare.finalPoints < currentScore.finalPoints
              || (scoreToCompare.finalPoints == currentScore.finalPoints 
                && scoreToCompare.coinCount < scoreToCompare.coinCount
              )) {
                if(scoreToCompare.rank < currentScore.rank) {
                  let savedRank = currentScore.rank
                  currentScore.rank = scoreToCompare.rank
                  scoreToCompare.rank = savedRank
                } else if(scoreToCompare.rank == currentScore.rank) {
                  scoreToCompare.rank = result[currentIdx + 1].rank 
                }
                result[currentIdx] = scoreToCompare
                currentIdx--
            } else {
              if(scoreToCompare.finalPoints == currentScore.finalPoints 
                && scoreToCompare.coinCount == scoreToCompare.coinCount){
                currentScore.rank = scoreToCompare.rank
              }
              break;
            }
          }
          result[currentIdx] = currentScore
        }
        this.$emit('showResults', result)
        console.error(`Updated playerScores: ${JSON.stringify(result)}`)   
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

.table {
    position: absolute;
    vertical-align: bottom;
    align-self: center;
    justify-items: center;
    width: 100%;
    bottom: 2mm;
}

.wonder-lbl {
    width: 100%;
    position: absolute;
    margin-top: 2mm;
    color: white;
    text-shadow: 0px 0px 10px gray;
}

.close_btn {
    position: absolute;
    justify-content: center;
    margin-top: 2mm;
    right: 3mm;
    top: 1.5mm;
    height: 4mm;
    width: 4mm;
    text-shadow: 0px 0px 10px gray;
}

.point-container {
    position: relative;
    justify-content: center;
    justify-items: center;
    width: 20mm;
}

.new_game_button {
  margin: 4mm;
  background-color: rosybrown;
}
</style>