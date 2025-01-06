<template>
  <div id="app">
    <div class="players" v-for="playerScore in playerScores">
      <Player 
        :playerScore="playerScore" 
        @editPlayer="handleEditPlayer($event)"
        @deletePlayer="handleDeletePlayer($event)"/>
    </div>

    <div class="vertical">
      <button class="button" @click="addNewPlayer">Add Player</button>
      <button class="button" @click="handleDetermineTheWinnerClicked(playerScores)">Determine the winner</button>
      <button class="new_game_button" @click="startNewGame">Start new game</button>
    </div>
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import Player  from './components/Player.vue';
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
      Player
    },
    methods: {
      addNewPlayer(){
        this.$emit("addNewPlayer")
      },
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
                && scoreToCompare.goldCount < scoreToCompare.goldCount
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
                && scoreToCompare.goldCount == scoreToCompare.goldCount){
                currentScore.rank = scoreToCompare.rank
              }
              break;
            }
          }
          result[currentIdx] = currentScore
        }
        this.$emit('winnerDetermined', result)
        console.error(`Updated playerScores: ${JSON.stringify(result)}`)   
      },
      handleEditPlayer(playerScore){
        this.$emit("editPlayer", playerScore)
      },
      handleDeletePlayer(playerScore){
        this.$emit("deletePlayer", playerScore)
      },
    }
  }
</script>

<style scoped>
.players {
  justify-self: center;
  justify-items: center;
}

.button {
  margin: 4mm
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