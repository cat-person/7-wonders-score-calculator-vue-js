<template>
   <div class="container" :style="{'background-color': getWonderByIdx(currentId).background}">
    <WonderAndName @onWonderSelected="onWonderSelected($event)" :availableWonders="availableWonders" :currentId="currentId"/>
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
            id: 0, 
            name: 'Artemis Temple',
            img: 'Artemis_temple.jpg',
            background: 'red'
          },
          {
            id: 1,
            name: 'Gardens', 
            img: 'gardens.jpg',
            background: 'green'
          },
          {
            id: 2,
            name: 'Colossus', 
            img: 'Colossus.jpg',
            background: 'blue'
          },
          {
            id: 3,
            name: 'Colossus', 
            img: 'Colossus.jpg',
            background: "#ffFF00"
          }
        ],
        currentId: 1
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
  },
  emit: {

  }
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