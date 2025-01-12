<template>
  <Players v-if="state.id === 'players'" 
    :playerScores="playerScores" 
    @addPlayer="() => navigateTo('add_player')"
    @editPlayer="navigateTo('edit_player', $event)" 
    @deletePlayer="handleDeletePlayer($event)" 
    @showResults="() => navigateTo('results', this.playerScores)"/>

  <Results v-if="state.id === 'results'" 
    :playerScores="playerScores" 
    @startNewGame="() => handleStartNewGame()"
    @close="() => navigateTo('players')"/>

  <EditPlayer v-if="state.id === 'edit_player'" 
    :playerScore="__getWonderById($event)"
    :availableWonders="getAvailableWonders()"
    @finishEditing="handleFinishEditting($event)"  
    @close="() => navigateTo('players')" />

  <AddPlayer v-if="state.id === 'add_player'" 
    :availableWonders="getAvailableWonders()"
    @playerAdded="handlePlayerAdded($event)" 
    @close="() => navigateTo('players')" />

</template>

<script>
import Players from './routes/Players/Players.vue'
import AddPlayer from './routes/AddPlayer/AddPlayer.vue'
import EditPlayer from './routes/EditPlayer/EditPlayer.vue'
import Results from './routes/Results/Results.vue'

import wonders from '@/assets/wonders.json'

function defaultState(localStorage) {
  let result = { id: 'players' }
  if(localStorage.getItem('state')) {
    result = JSON.parse(localStorage.getItem('state'))
  }
  return result
}

function defaultPlayerScores(localStorage) {
  let result = []
  if(localStorage.getItem('playerScores')) {
    result = JSON.parse(localStorage.getItem('playerScores'))
  }
  return result
}


export default {
  name: 'App',
  components: {
    Players,
    Results,
    AddPlayer,
    EditPlayer,
  },

  data() {
    return {
      wonders: wonders,
      state: defaultState(window.localStorage), 
      playerScores: defaultPlayerScores(window.localStorage)
    }
  },

  methods: {
    navigateTo(route, data) { 
      console.debug(`App.navigateTo(route: ${route}, data: ${data})`)
      this.state = { id: route, data: data}
      window.localStorage.setItem('state', JSON.stringify(this.state))
    },
    updatePlayers(playerScores) {
      this.playerScores = playerScores
      window.localStorage.setItem('playerScores', JSON.stringify(this.playerScores))
    },
    getAvailableWonders() {
      let result = []
      wonders.forEach(wonder => {
        if (!this.playerScores.some((playerScore) => wonder.id == playerScore.wonder.id)) {
          result.push(wonder.id)
        }
      })
      return result
    },
    handleDeletePlayer(givenWonderId) {
      let deletedPlayerIdx = this.playerScores.findIndex(playerScore => playerScore.wonder.id == givenWonderId)
 
      if(deletedPlayerIdx == 0){
        this.updatePlayers([...this.playerScores.slice(1)])
      } else if(0 < deletedPlayerIdx) {
        this.updatePlayers([...this.playerScores.slice(0, deletedPlayerIdx), ...this.playerScores.slice(deletedPlayerIdx + 1)])
      }
      this.$forceUpdate()
    },
    handlePlayerAdded(playerScore) {
      this.playerScores.push(playerScore)
      this.state = { id: 'players' }

      window.localStorage.setItem('state', JSON.stringify(this.state))
      window.localStorage.setItem('playerScores', JSON.stringify(this.playerScores))
    },
    handleStartNewGame(){
      window.localStorage.clear()
      this.updatePlayers([])
      this.navigateTo('players')
    },
    handleFinishEditting(givenPlayerScore){
      let editedPlayerIdx = this.playerScores.findIndex(playerScore => playerScore.wonder.id == givenPlayerScore.wonder.id)
      updatePlayers([...this.playerScores.slice(0, editedPlayerIdx), givenPlayerScore, ...this.playerScores.slice(editedPlayerIdx + 1)])
      navigateTo('players')
    },


    __getWonderById(wonderId){
      console.error(`App.__getWonderById(wonderId: ${wonderId})`)
      console.error(`App.playerScores(wonderId: ${this.playerScores})`)

      return this.playerScores.find(playerScore => playerScore.wonder.id == state.data)
    }
  },
}

</script>

<style>
#app {
  margin: 0mm;
  user-select: none;
  text-align: center;
}
</style>
