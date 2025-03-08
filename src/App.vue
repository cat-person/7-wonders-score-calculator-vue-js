<template>
  <!-- <button @click="handleGetSessionIdClicked">Get Session Id</button>
  <button @click="handleGetPlayerScoreClicked">Get player score</button> -->

  <main class="root">
    <RouterView />
  </main>

  <!-- <transition name="fade">
    <StartGame v-if="state.id === 'new'" 
      class="screen"
      @startNewGame="(sessionId) => navigateTo('players', sessionId)" />
  </transition>

  <transition name="fade">
    <Players v-if="state.id === 'players'" 
      class="screen"
      :key="getPlayerListKey()"
      :playerScores="playerScores"
      @addPlayer="() => navigateTo('add_player')" 
      @editPlayer="navigateTo('edit_player', $event)"
      @deletePlayer="handleDeletePlayer($event)" 
      @showResults="() => navigateTo('results', this.playerScores)" />
  </transition>

  <transition name="fade">
    <EditPlayer v-if="state.id === 'edit_player'" 
      class="screen"
      :playerScore="getWonderById(state.data)"  
      :availableWonders="getAvailableWonders()" 
      @finishEditing="handleFinishEditting($event)"
      @close="() => navigateTo('players')" />
  </transition>

  <transition name="fade">
    <AddPlayer v-if="state.id === 'add_player'"
      class="screen" 
      :availableWonders="getAvailableWonders()"
      @playerAdded="handlePlayerAdded($event)" 
      @close="() => navigateTo('players')" />
  </transition>

  <transition name="fade">
    <Results v-if="state.id === 'results'" 
      class="screen"
      :playerScores="playerScores" 
      @startNewGame="handleStartNewGame"
      @close="() => navigateTo('players')" />
  </transition> -->
</template>

<script>

import { getUnauthSession, addPlayerScore, getPlayerScores } from '@/utils/remote'

import Players from './routes/Players/Players.vue'
import StartGame from './routes/StartGame/StartGame.vue'
import AddPlayer from './routes/AddPlayer/AddPlayer.vue'
import EditPlayer from './routes/EditPlayer/EditPlayer.vue'
import Results from './routes/Results/Results.vue'

import wonders from '@/assets/wonders.json'

function defaultState(localStorage) {
  let result = { id: 'new' }
  if (localStorage.getItem('state')) {
    result = JSON.parse(localStorage.getItem('state'))
  }
  return result
}

function defaultPlayerScores(localStorage) {
  let result = []
  if (localStorage.getItem('playerScores')) {
    result = JSON.parse(localStorage.getItem('playerScores'))
  }
  return result
}


export default {
  name: 'App',
  components: {
    Players,
    StartGame,
    Results,
    AddPlayer,
    EditPlayer,
  },

  data() {
    return {
      wonders: wonders,
      state: defaultState(window.localStorage),
      playSession: null,
      playerScores: defaultPlayerScores(window.localStorage)
    }
  },

  methods: {
    navigateTo(route, data) {
      console.debug(`App.navigateTo(route: ${route}, data: ${data})`)
      this.state = { id: route, data: data }
      window.localStorage.setItem('state', JSON.stringify(this.state))
      window.scrollTo(0, 0);
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

      if (deletedPlayerIdx == 0) {
        this.updatePlayers([...this.playerScores.slice(1)])
      } else if (0 < deletedPlayerIdx) {
        this.updatePlayers([...this.playerScores.slice(0, deletedPlayerIdx), ...this.playerScores.slice(deletedPlayerIdx + 1)])
      }
    },
    async handlePlayerAdded(playerScore) {
      this.playerScores.push(playerScore)

      const result = await addPlayerScore(playerScore.wonder.id, playerScore)
      console.error(result)

      this.state = { id: 'players' }

      window.localStorage.setItem('state', JSON.stringify(this.state))
      window.localStorage.setItem('playerScores', JSON.stringify(this.playerScores))
    },
    handleStartNewGame() {
      window.localStorage.clear()
      this.updatePlayers([])
      this.navigateTo('players')
    },
    handleFinishEditting(givenPlayerScore) {
      let editedPlayerIdx = this.playerScores.findIndex(playerScore => playerScore.wonder.id == givenPlayerScore.wonder.id)
      this.updatePlayers([...this.playerScores.slice(0, editedPlayerIdx), givenPlayerScore, ...this.playerScores.slice(editedPlayerIdx + 1)])
      this.navigateTo('players')
    },
    getWonderById(wonderId) {
      return this.playerScores.find(playerScore => playerScore.wonder.id == this.state.data)
    },
    getPlayerListKey() {
      return JSON.stringify(this.playerScores.map(score => score.wonder.id))
    },
    async handleCreateSessionClicked() {
      const session = await getUnauthSession()
      console.error(session)
    }
  }
}

</script>

<style>
/* @import url('https://fonts.googleapis.com/css?family=Roboto+Condensed'); */
/* @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap'); */

#app {
  margin: 0mm;
  font-family: 'open-sans';
  user-select: none;
  text-align: center;
}

.root {
  width: 100%;
  min-width: 160mm;
  justify-self: center;
  position: relative;
}

.screen {
  position: absolute;
  justify-self: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.html {
  overflow-y:scroll;
}

.body {
  font-family: 'Playfair';
}

</style>
