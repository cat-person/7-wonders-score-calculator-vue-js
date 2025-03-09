<template>
  <div class="root">
    <TopBar 
      :title="getTitle()" />

    <div class="players_container" v-for="playerScore in playerScores">
      <PlayerItem 
        :playerScore="playerScore" 
        @editPlayer="handleEditPlayer($event)"
        @deletePlayerScore="handleDeletePlayerScore($event)"/>
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

  import { getPlayerScores, deletePlayerScore } from '@/utils/remote'

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
        this.$router.push(`/7W/${this.$route.params.session_id}/add`)
      },
      startNewGame(){
        this.$emit("startNewGame")
      },
      handleCalculateResultsClicked() {
        this.$router.push(`/7W/${this.sessionId}/results`)
      },
      handleEditPlayer(wonderId){
        console.debug(`Players.handleEditPlayer(wonderId: ${wonderId})`)
        this.$router.push(`/7W/${this.sessionId}/edit/${wonderId}`)
      },
      async handleDeletePlayerScore(wonderId){
        await deletePlayerScore(this.sessionId, wonderId)
        this.playerScores = await getPlayerScores(this.$route.params.session_id)
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