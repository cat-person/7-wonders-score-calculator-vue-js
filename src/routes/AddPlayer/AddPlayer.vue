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
          name: 'The Colossus of Rhodes',
          A: { 
            img: 'the_colossus_of_rhodes.jpg',
            pointsByStages: [3, 0, 7],
            background: '#E0F2F1'
          },
          B: { 
            img: 'the_colossus_of_rhodes.jpg',
            pointsByStages: [3, 4],
            background: '#004D40'
          },
        },
        {
          name: 'The Lighthouse of Alexandria',
          A: { 
            img: 'the_lighthouse_of_alexandria.jpg',
            pointsByStages: [3, 0, 7],
            background: '#E1F5FE'
          },
          B: { 
            img: 'the_lighthouse_of_alexandria.jpg',
            pointsByStages: [0, 0, 7],
            background: '#01579B'
          },
        },
        {
          name: 'The Temple of Artemis in Ephesus',
          A: { 
            img: 'the_temple_of_artemis_in_ephesus.jpg',
            pointsByStages: [3, 0, 7],
            background: '#E8EAF6'
          },
          B: { 
            img: 'the_temple_of_artemis_in_ephesus.jpg',
            pointsByStages: [2, 3, 5],
            background: '#1A237E'
          },
        },
        {
          name: 'The Hanging Gardens of Babylon',
          A: { 
            img: 'the_hanging_gardens_of_babylon.jpg',
            pointsByStages: [3, 0, 7],
            background: '#E8F5E9'
          },
          B: { 
            img: 'the_hanging_gardens_of_babylon.jpg',
            pointsByStages: [3, 0, 0],
            background: '#1B5E20'
          },
        },
        {
          name: 'The Statue of Zeus in Olympia',
          A: { 
            img: 'the_statue_of_zeus_in_olympia.jpg',
            pointsByStages: [3, 0, 7],
            background: '#E3F2FD'
          },
          B: { 
            img: 'the_statue_of_zeus_in_olympia.jpg',
            pointsByStages: [0, 5, 0],
            background: '#0D47A1'
          },
        },
        {
          name: 'The Mausoleum of Halicarnassus',
          A: { 
            img: 'the_mausoleum_of_halicarnassus.jpg',
            pointsByStages: [3, 0, 7],
            background: '#EDE7F6'
          },
          B: { 
            img: 'the_mausoleum_of_halicarnassus.jpg',
            pointsByStages: [2, 1, 0],
            background: '#311B92'
          },
        },
        {
          name: 'The Pyramids of Giza',
          A: { 
            img: 'the_pyramids_of_giza.jpg',
            pointsByStages: [3, 5, 7],
            background: '#FFF8E1'
          },
          B: { 
            img: 'the_pyramids_of_giza.jpg',
            pointsByStages: [3, 5, 5, 7],
            background: '#FF6F00'
          },
        },
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