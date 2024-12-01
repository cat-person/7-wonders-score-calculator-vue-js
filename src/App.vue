<template>
    <Players :players="state.game.players"/>
</template>

<script setup>
  // import { createApp } from 'vue'
  // import { RouterLink, RouterView } from 'vue-router'
  import WonderChoice from '@/components/WonderChoice.vue';
  import Players from '@/components/Players.vue';

  const state = {
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
      players: ["CA", "CC"]
    },

    calculatedWonder: {
      
    }
  }

  const onEvent = (eventName, args) => {
    switch(eventName){
      case eventNames.changeSide: {
        const {wonderName, chosenSide} = args
        if(calculatedWonder.wonderName === wonderName) {
          calculatedWonder.chosenSide = chosenSide
        }
      }
      case eventNames.addPlayer: {
        const {name} = args 
        state.game.players.add(name)
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
