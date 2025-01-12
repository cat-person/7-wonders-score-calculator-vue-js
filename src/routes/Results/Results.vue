<template>
  <div class="results" v-for="playerScore in playerScores">
    <ResultItem 
      :playerScore="playerScore" 
      :rank = "rank"
      :points = "points"/>
  </div>

  <button class="new_game_button" @click="startNewGame">Start new game</button>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import ResultItem  from './components/ResultItem.vue';
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
      ResultItem
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
      handleCloseClicked(playerScore){
        this.$emit("close", playerScore)
      },
    }
  }
</script>

<style scoped>
.results {
  justify-self: center;
  justify-items: center;
}
.new_game_button {
  margin: 4mm;
  background-color: rosybrown;
}

.vertical {
  display: flex;
  flex-direction: column;
  justify-self: center;
  width: 40mm;
}
</style>