<template>
  <div id="app">
    <h1> Players </h1>

    <div class="image-item" v-for="(playerScore, index) in playerScores" :key="index">
      <h2>{{playerScore.name}}</h2>
      <b-table striped hover :items="getPointsByCategory(playerScore)"></b-table>
      <h3>{{getWonderById(playerScore.wonder.id).name}}</h3>
    </div>

    <button @click="addNewPlayer">Add New Player</button>
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  import * as util from '@/utils/calc.js';

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
        console.error(`Players.getWonderById(${givenId})`)
        let result = null
        wonders.forEach(wonder => {
          if(wonder.id == givenId) {
            result =  wonder
          }
        })
        return result
      },
      getPointsByCategory(playerScore){

        //util.calcGoldPoints(playerScore.goldCount)

        const result = { 
          wonder: util.calcWonderPoints(this.getWonderById(playerScore.wonder.id), playerScore.wonder.side, playerScore.wonder.stageBuilt),
          gold: 12,
          military: util.calcMilitary(playerScore.battles),
        }

        console.error(`getPointsByCategory(${JSON.stringify(playerScore)}) => ${JSON.stringify(result)}`)

        return result
          // WonderAndName,
    // Gold,
    // Military,
    // Culture,
    // Trade,
    // Science,
    // Guild,
          //   { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          //   { age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          //   { age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          //   { age: 38, first_name: 'Jami', last_name: 'Carney' }
          // ]
      }
    }
  }
</script>