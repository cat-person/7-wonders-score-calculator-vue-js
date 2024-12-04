<template>
  <div>
    <h1> Players </h1>
    <div id="app">
      <h1>Players</h1>
      <div class="image-item" v-for="({name, wonder, side}, index) in players" :key="index">
        <h2>{{name}}</h2>
        <h3>{{wonder}}</h3>
        <h3>{{side}}</h3>
      </div>

    <button @click="navigateToAddPlayers">Add player</button>

    </div>
  </div>
</template>

<script>
export default {
  // import myComponent from 'my-component'
  name: 'Players',
  props: {
    players: Array,
    // addPlayer: Function
  },
  data() {
    return {
      // players: ["A", "B"]
    };
  },
  methods: {
    navigateToAddPlayers(){
      this.$router.push('/AddPlayer')
    }
  },
  emits: ['add-player'],
}
</script>