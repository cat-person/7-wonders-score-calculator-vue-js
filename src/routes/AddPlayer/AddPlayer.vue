<template>
   <div class="container" :style="{'background-color': getWonder(currentId, currentSide).background}">
    <WonderAndName  
      :availableWonders="availableWonders" 
      :currentId="currentId" 
      :currentSide="currentSide"
      
      @onWonderSelected="onWonderSelected($event)"
      @onSideChanged="onSideChanged($event)"/>
    <Gold/>
    <Military/>
    <Culture/>
    <Trade/>
    <Science/>
    <Guild/>
    <br/>
    <button @click="meow">Calc and finish</button>
  </div>
</template>

<script>
import WonderAndName  from './components/WonderAndName.vue';
import Gold from './components/Gold.vue';
import Military from './components/Military.vue';
import Culture from './components/Culture.vue';
import Trade from './components/Trade.vue';
import Science from './components/Science.vue';
import Guild from './components/Guild.vue';

export default {
  data() {
    return {
      availableWonders: [
        {
          name: 'Artemis Temple',
          A: { 
            img: 'Artemis_temple.jpg',
            pointsByStages: [3, 5, 7],
            background: '#E3F2FD'
          },
          name: 'Artemis Temple',
          B: { 
            img: 'Artemis_temple.jpg',
            pointsByStages: [3, 5, 7],
            background: '#1E88E5'
          },
        },
        {
          name: 'Gardens',
          A: { 
            img: 'gardens.jpg',
            pointsByStages: [3, 5, 5],
            background: '#E8F5E9'
          },
          name: 'Artemis Temple',
          B: { 
            img: 'gardens.jpg',
            pointsByStages: [3, 5, 5],
            background: '#43A047'
          },
        }
          // {
          //   id: 2,
          //   name: 'Colossus', 
          //   img: 'Colossus.jpg',
          //   pointsByStages: [3, 5, 7],
          //   background: '#D0E8F4'
          // },
          // {
          //   id: 3,
          //   name: 'Lighthouse', 
          //   img: 'Lighthouse.jpg',
          //   pointsByStages: [0, 3, 3, 3],
          //   background: "#D0D8D8"
          // },
          // {
          //   id: 3,
          //   name: 'Mausoleum', 
          //   img: 'Mausoleum.jpg',
          //   pointsByStages: [0, 5, 5],
          //   background: "#F0E0E8"
          // },
          // {
          //   id: 3,
          //   name: 'Pyramides', 
          //   img: 'Pyramides.jpg',
          //   pointsByStages: [0, 0, 7],
          //   background: "#F0E8C0"
          // },
          // {
          //   id: 3,
          //   name: 'Zeus Statue', 
          //   img: 'Zeus_statue.jpg',
          //   pointsByStages: [3, 0, 7],
          //   background: "#E0E0E8"
          // },
        ],
        currentId: 1,
        currentSide: 'A'
    };
  },
  components: {
    WonderAndName,
    Gold,
    Military,
    Culture,
    Trade,
    Science,
    Guild,
  },
  methods: {
    onWonderSelected(wonderId) {
      this.currentId = wonderId
      console.error(`wonderId: ${wonderId}`)
    },
    canMeow(wonderPoints, goldPoints, militaryPoints, culturePoints, tradePoints, sciencePoints, guildPoints) {
      return ![wonderPoints, goldPoints, militaryPoints, culturePoints, tradePoints, sciencePoints, guildPoints].any(NaN)
    },
    meow(player) {
      this.$router.back()
    },
    getWonderByIdx(idx) {
      return this.availableWonders[idx]
    },
    getWonder(idx, currentSide) {
      if(currentSide === 'A'){
        return this.availableWonders[idx].A
      } else {
        return this.availableWonders[idx].B
      }  
    },
    onSideChanged(givenSide) {
      this.currentSide = givenSide
    }
  },
};
</script>

<style>
#app {
  text-align: center;
  margin: 20px;
}

.container {
    justify-self: center;
    width: 160mm;
  }

.radio-group {
  margin: 20px;
  display: flex;
  flex-direction: row;
  background-color: brown;
}

.radio-group label {
  margin-right: 20px; /* Space between radio buttons */
}
</style>