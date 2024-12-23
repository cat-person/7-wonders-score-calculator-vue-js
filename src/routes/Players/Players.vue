<template>
  <div id="app">
    <h1> Players </h1>

    <div class="image-item" v-for="(playerScore, index) in playerScores" :key="index">
      <h2>{{playerScore.name}}</h2>
      <h3>{{getWonderById(playerScore.wonder.id).name}}</h3>
    </div>

    <button @click="addNewPlayer">Add New Player</button>
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'

  export default {
    data() {
      return {
        wonders: wonders,
      };
    },
    props: {
      playerScores: Array
    },
    methods: {
      addNewPlayer(){
        this.$emit("addNewPlayer")
      },
      getWonderById(givenId) {
        let result = null
        wonders.forEach(wonder => {
          if(wonder.id == givenId) {
            result =  wonder
          }
        })
        return result
      }
    },
  }
</script>