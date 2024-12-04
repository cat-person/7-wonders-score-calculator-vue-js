<template>
    <h1>Military</h1>
    
    <div v-for="({name, victoryLeft, victoryRight}, index) in ages" :key="index">
        <label>
            <div class="radio-group">
                <input type="checkbox" :checked="victoryLeft"/>
                {{name}}
                <input type="checkbox" :checked="victoryRight"/>
            </div>
        
        </label>
    </div>
    <p>Military points: {{ calcMilitary(this.ages) }}</p>

</template>
  
  <script>
  export default {
    data() {
      return {
        ages: [
            { name: 'Bronze', victoryLeft: true, victoryRight: false },
            { name: 'Silver', victoryLeft: false, victoryRight: true },
            { name: 'Gold', victoryLeft: false, victoryRight: true },
        ]
      };
    },
    methods: {
        calcMilitary(ages) {
            var result = -6

            ages.forEach(age => {
                switch(age.name) {
                    case 'Bronze':
                        if(age.victoryLeft) {
                            result += 2 // removed -1 added +1
                        }
                        if(age.victoryRight) {
                            result += 2
                        }
                        break;
                    case 'Silver': 
                        if(age.victoryLeft) {
                            result += 4 // removed -1 added +3
                        }
                        if(age.victoryRight) {
                            result += 4
                        }
                        break;
                    
                    case 'Gold':
                        if(age.victoryLeft) {
                            result += 6 // removed -1 added +5
                        }
                        if(age.victoryRight) {
                            result += 6
                        }
                        break;
                    
                }
            })

            return result
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