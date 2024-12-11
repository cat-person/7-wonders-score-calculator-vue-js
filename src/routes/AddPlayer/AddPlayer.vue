<template>
  <WonderAndName/>
  <Gold/>
  <Military/>
  <Culture/>
  <Trade/>
  <Science/>
  <Guild/>
  <br/>
  <button @click="meow">Calc and finish</button>
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
    canMeow(wonderPoints, goldPoints, militaryPoints, culturePoints, tradePoints, sciencePoints, guildPoints) {
      return ![wonderPoints, goldPoints, militaryPoints, culturePoints, tradePoints, sciencePoints, guildPoints].any(NaN)
    },
    meow(player) {
      this.$router.back()
    }
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