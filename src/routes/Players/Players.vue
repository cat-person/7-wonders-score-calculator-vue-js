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
      v-if="playerScores.length < 7"
      class="add_player_btn"
      @addPlayer="handleAddPlayer"/>

    <button v-if="calculateResultsShown(playerScores)" class="button" @click="handleCalculateResultsClicked(playerScores)">Calculate the results</button>
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import PlayerItem  from './components/PlayerItem.vue';
  import AddPlayerItem from './components/AddPlayerItem.vue';
  import TopBar from '../Common/components/TopBar.vue';

  export default {
    data() {
      console.debug(`Players.data(): { playerScores: ${JSON.stringify(this.playerScores)} }`)
      return {
        playerScores: this.playerScores,
        wonders: wonders,
      };
    },
    props: {
      playerScores: Array
    },
    components: {
      TopBar,
      PlayerItem,
      AddPlayerItem
    },
    methods: {
      getTitle() {
        if(this.playerScores.length == 0) {
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
      handleCalculateResultsClicked(playerScores) {
        this.$emit('showResults')
      },
      handleEditPlayer(wonderId){
        console.debug(`Players.handleEditPlayer(wonderId: ${wonderId})`)
        this.$emit("editPlayer", wonderId)
      },
      handleDeletePlayer(wonderId){
        this.$emit("deletePlayer", wonderId)
      },
      calculateResultsShown(playerScores) {
        return 2 < playerScores.length 
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