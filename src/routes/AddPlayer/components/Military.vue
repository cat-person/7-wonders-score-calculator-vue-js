<template>
    <h1>Military</h1>
    
    <div>
        <div>
            <button @click="handleClick('bronze', 'left')">{{ this.battles['bronze.left'] }}</button>
            Bronze
            <button @click="handleClick('bronze', 'right')">{{ this.battles['bronze.right'] }}</button>
        </div>
        <div>
            <button @click="handleClick('silver', 'left')">{{ this.battles['silver.left'] }}</button>
            Silver
            <button @click="handleClick('silver', 'right')">{{ this.battles['silver.right'] }}</button>
        </div>
        <div>
            <button @click="handleClick('golden', 'left')">{{ this.battles['golden.left'] }}</button>
            Gold
            <button @click="handleClick('golden', 'right')">{{ this.battles['golden.right'] }}</button>
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
            'bronze.left': 'Lost', 
            'bronze.right': 'Lost',
            'silver.left': 'Lost', 
            'silver.right': 'Lost',
            'golden.left': 'Lost', 
            'golden.right': 'Lost'
        }
      };
    },
    methods: {
        calcMilitary(battles) {
            var result = -6

            if(battles['bronze.left'] === 'Won') {
                result += 2
            }
            if(battles['bronze.right'] === 'Won') {
                result += 2
            }
            if(battles['silver.left'] === 'Won') {
                result += 4
            }
            if(battles['silver.right'] === 'Won') {
                result += 4
            }
            if(battles['golden.left'] === 'Won') {
                result += 6
            }
            if(battles['golden.right'] === 'Won') {
                result += 6
            }

            return result
        },

        handleClick(age, neighbour){
            // console.error(`{\n\tage: ${age}, \n\tneighbour: ${neighbour}\n}`)
            this.battles[`${age}.${neighbour}`] = this.battles[`${age}.${neighbour}`] === 'Won' ? 'Lost' : 'Won'
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