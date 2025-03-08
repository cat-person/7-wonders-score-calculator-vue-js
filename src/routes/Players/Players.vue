<template>
  <div class="root">
    <TopBar 
      :title="getTitle()" />

    <div class="players_container" v-for="playerScore in playerScores">
      <PlayerItem 
        :playerScore="playerScore" 
        @editPlayer="handleEditPlayer($event)"
        @deletePlayer="handleDeletePlayer($event)"/>
    </div>

    <AddPlayerItem
      v-if="!playerScores || playerScores.length < 7"
      class="add_player_btn"
      @addPlayer="handleAddPlayer"/>

    <button v-if="calculateResultsShown(playerScores)" class="button" @click="handleCalculateResultsClicked">Calculate the results</button>
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import PlayerItem  from './components/PlayerItem.vue'
  import AddPlayerItem from './components/AddPlayerItem.vue'
  import TopBar from '../Common/components/TopBar.vue'

  import { getPlayerScores } from '@/utils/remote'

  export default {
    data() {


      return {
        playerScores: [],
        sessionId: this.$route.params.session_id,
        wonders: wonders,
      };
    },
    mounted: function () {
      this.getPlayerScoresAAA(this.$route.params.session_id)
    },
    components: {
      TopBar,
      PlayerItem,
      AddPlayerItem
    },
    methods: {
      async getPlayerScoresAAA(sessionId) {
        console.error(`getPlayerScoresAAA(sessionId: ${sessionId})`)
        this.playerScores = await getPlayerScores(this.$route.params.session_id)
        console.error(`playerScores ${JSON.stringify(this.playerScores)}`)
      },
      getTitle() {
        if(!this.playerScores || this.playerScores.length == 0) {
          return 'Press ➕ to start using the app'
        } else {
          return 'Players'
        }
      },
      handleClosedClicked(){
        this.$emit("close")
      },
      handleAddPlayer(){
        this.$emit("addPlayer")
      },
      startNewGame(){
        this.$emit("startNewGame")
      },
      handleCalculateResultsClicked() {
        this.$router.push(`${this.sessionId}/results`)
      },
      handleEditPlayer(wonderId){
        console.debug(`Players.handleEditPlayer(wonderId: ${wonderId})`)
        // this.$emit("editPlayer", wonderId)
        // this.$router.push(`/${sessionId}/add_player`)
        this.$router.push(`/${this.sessionId}/edit/${wonderId}`)
      },
      handleDeletePlayer(wonderId){
        this.$emit("deletePlayer", wonderId)
      },
      calculateResultsShown(playerScores) {
        return playerScores && 2 < playerScores.length 
      }
    }
  }
</script>

<style scoped>
.root {
  margin: 0mm;
  padding-top: 3mm;
  padding-bottom: 3mm;
}

.players_container {
  margin: 0mm;
  justify-self: center;
  justify-items: center;
}
.add_player_btn {
  margin: 0mm;
}
.button {
  margin-top: 12mm;
  width: 40mm;
  height: 8mm;
}
</style>