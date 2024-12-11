<template>
    <h1>Military</h1>
    
    <div>
        <div>
            <button @click="handleClick('bronze', 'left')">{{ this.battles.bronze.victoryLeft }}</button>
            Bronze
            <!-- <input type="checkbox" v-model="bronze.bronze.victoryRight"/> -->
        </div>
        <div>
            <input type="checkbox" v-model="battles.silver.victoryLeft"/>
            Silver
            <input type="checkbox" v-model="battles.silver.victoryRight"/>
        </div>
        <div>
            <input type="checkbox" v-model="battles.golden.victoryLeft"/>
            Gold
            <input type="checkbox" v-model="battles.golden.victoryRight"/>
        </div>
    </div>
    <p>Military points: {{ calcMilitary(this.battles) }}</p>

</template>
  
  <script>
  export default {

    data() {
      return {
        age: {
            Bronze: 'Bronze',
            Silver: 'Silver',
            Gold: 'Gold',
        },
        neighbours: {
            Left: 'Left',
            Right: 'Right',
        },
        Unknown: '?',
        Won: 'Won',
        Lost: 'Lost',

        battles: {
            bronze: { victoryLeft: '?', victoryRight: 'Won' },
            silver: { victoryLeft: false, victoryRight: true },
            golden: { victoryLeft: false, victoryRight: true },
        }
      };
    },
    methods: {
        calcMilitary(battles) {
            var result = -6

            if(battles.bronze.victoryLeft === 'Won') {
                result += 2
            }
            if(battles.bronze.victoryRight) {
                result += 2
            }
            if(battles.silver.victoryLeft) {
                result += 4
            }
            if(battles.silver.victoryRight) {
                result += 4
            }
            if(battles.golden.victoryLeft) {
                result += 6
            }
            if(battles.golden.victoryRight) {
                result += 6
            }

            return result
        },

        handleClick(age, neighbour){
            console.error(`{\n\tage: ${age}, \n\tneighbour: ${neighbour}\n}`)
            switch(age) {
                case 'bronze': {
                    if(neighbour == 'left'){
                        this.battles.bronze.victoryLeft = this.battles.bronze.victoryLeft === 'Won' ? 'Lost' : 'Won'
                    } else {

                    }
                    break;
                }
                case 'Silver': {
                    break;
                }
                default: {
                    break;
                }

            }
        }
    }
  };
  </script>
  
  <style>
  #app {
    text-align: center;
    margin: 20px;
  }
  
  .radio-group {
    margin: 20px;
    display: flex;
    flex-direction: row;
  }
  
  .radio-group label {
    margin-right: 20px; /* Space between radio buttons */
  }
  </style>