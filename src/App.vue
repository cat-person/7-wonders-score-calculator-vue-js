<template>
    <Players v-if="state.id === 'players'" :playerScores="playerScores" @addNewPlayer="handleAddNewPlayer()" @editPlayer=""/>
    <AddPlayer v-if="state.id === 'add_player'" @onPlayerAdded="handlePlayerAdded($event)" />
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
      getNotAvailable() {
        let result = []
        this.playerScores.forEach((playerScore) => result.push(playerScore.id))
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
    text-align: center;
  }
</style>
