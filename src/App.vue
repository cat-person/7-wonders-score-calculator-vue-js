<template>
    <Players v-if="state.id === 'players'" :playerScores="playerScores" @addNewPlayer="handleAddNewPlayer()" @editPlayer=""/>
    <AddPlayer v-if="state.id === 'add_player'" :availableWonders="getAvailableWonders()" @onPlayerAdded="handlePlayerAdded($event)" />
</template>

<script>
  import Players from './routes/Players/Players.vue'
  import AddPlayer from './routes/AddPlayer/AddPlayer.vue'

  import wonders from '@/assets/wonders.json'

  export default {
    name: 'App',
    components: {
      Players,
      AddPlayer,
    },

    data(){ 
      return {
        wonders: wonders,
        state: { id: 'players' },  // probably not idiomatic
        playerScores: [
          {
            name: 'Alex',
            wonder: {
              id: 'the_colossus_of_rhodes',
              currentSide: 'A',
              stageBuilt: 1,
            },
            goldCount: 32,
            battles: {
              'bronze.left': 'Lost', 
              'bronze.right': 'Won',
              'silver.left': 'Lost', 
              'silver.right': 'Won',
              'golden.left': 'Won', 
              'golden.right': 'Won'
            },
            culturePoints: 12,
            tradePoints: 3,
            science: {
              clayCount: 2,
              measurerCount: 4,
              cogCount: 2,
            },
            guildPoints: 8
          },
        ]
      }
    },

    methods: {
      getAvailableWonders() {
        let result = []
        wonders.forEach(wonder => {
          if(!this.playerScores.some((playerScore) => wonder.id == playerScore.wonder.id)) {
            result.push(wonder.id)
          }
        }) 
        console.error(`App.getAvailableWonders(): ${JSON.stringify(result)}`)
        return result
      },

      handleAddNewPlayer(){
        this.state = { 
          id: 'add_player',
        }
      },
      editPlayer(playerScore){
        this.state = { addPlayer, playerScore }
      },
      handlePlayerAdded(playerScore) {
        console.error(`playerScore: ${JSON.stringify(playerScore)}`)
        this.playerScores.push(playerScore)
        this.state = {id: 'players'}
      }
    }
  }

</script> 

<style>
  #app {
    user-select:none;
    text-align: center;
  }
</style>
