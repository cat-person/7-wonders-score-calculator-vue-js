<template>
  <div id="app">
    <h1> Players </h1>

    <div class="image-item" v-for="(playerScore, index) in playerScores" :key="index">
      <Player :playerScore="playerScore" @editClicked="editPlayer($event)"/>
    </div>

    <button @click="addNewPlayer">Add New Player</button>
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import Player  from './components/Player.vue';

  export default {
    data() {
      return {
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
      editPlayer(playerScore){
        this.$emit("editPlayer", playerScore)
      },
    }
  }
</script>