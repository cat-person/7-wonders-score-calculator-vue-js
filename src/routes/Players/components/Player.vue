<script>
  import wonders from '@/assets/wonders.json'
  import * as util from '@/utils/calc';

  export default {
    props: {
      playerScore: Object
    },
    data() {
      return {
        wonders: wonders,
      }
    },
    methods: {
    //   getImageByWonder(wonderId, side) {
    //     console.error(`Player.getImageByWonder(wonderId: ${wonderId}, side: ${side})`)
    //     let wonder = this.getWonder(wonderId, side)
    //     return new URL(`../../../assets/${wonder.img}`, import.meta.url)
    //   },
    getWonderById(wonderId) {
        console.error(`Player.getWonderById(wonderId: ${wonderId})`)

        let result = undefined
        this.wonders.forEach((wonder) => { 
          if(wonder.id == wonderId){
            result = wonder
          }
        })
        return result
      },
      getPointsByCategory(playerScore){
        const result = { 
        wonder: 32,//util.calcWonderPoints(playerScore.wonder.id, playerScore.wonder.side, playerScore.wonder.stageBuilt),
        gold: 12,
        military: util.calcMilitary(playerScore.battles),
        }

        // console.error(`getPointsByCategory(${JSON.stringify(playerScore)}) => ${JSON.stringify(result)}`)

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

<template>
    <h2>{{playerScore.name}}</h2>
    <b-table striped hover :items="getPointsByCategory(playerScore)"></b-table>
    <h3>{{getWonderById(playerScore.wonder.id).name}}</h3>
</template>

<style scoped>
  .stage_container {
    width: 16mm;
  }
  .container {
    justify-self: center;
    width: 160mm;
  }
  .img {
    width: 160mm;
  }
  .horizontal { 
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
</style>