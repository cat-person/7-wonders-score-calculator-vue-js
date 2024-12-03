<template>
    <!-- <Players :players="aaaa.game.players" @add-player="addPlayer"/> -->
    <AddPlayer/>
</template>

<script>
  import Players from './components/Players.vue'
  import AddPlayer from './components/AddPlayer.vue'

  export default {
    name: 'App',
    components: {
      Players,
      AddPlayer
    },

    data(){
      return {
        aaaa: {
          static: {
            wonders: [
              { name: 'Artemis temple', image: 'src/assets/Artemis_temple.jpg' },

            ],
            eventNames: {
              addPlayer: 'addPlayer',
              selectSide: 'selectSide',
            }
          },

          game: {
            players: [
              { name: "AA", wonder: "Artemis Temple", side: "A" }, 
              { name: "BA", wonder: "Piramyds", side: "B"  },
              { name: "CA", wonder: "Gardens", side: "B"  }
            ]
          },

          calculatedWonder: {
            
          }
        }
      }
    },

    methods: {
      addPlayer(param) {
        this.aaaa.game.players.push({ name: "Mate", wonder: "Zeus Statue", side: "A"  })
        
        console.log(param)
      }
    }
}

</script> 

<style scoped>
/* .wrapper {
  height: 100vh;
  max-width: 80vw;
  min-width: 1024px;
} */
</style>
