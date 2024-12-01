<template>
  <div>
    <h1> Players </h1>
    <!-- <div v-if="awesome">Vue is awesome!</div>
    <div v-else>Oh no 😢</div> -->

    <div id="app">
      <h1>Players</h1>
      <div class="image-item" v-for="(name, index) in players" :key="index">
        <h2>{{name}}</h2>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // import myComponent from 'my-component'
  name: 'Players',
  props: {
    players: Array
  },
  data() {
    return {
      // players: ["A", "B"]
    };
  },
  methods: {
    changeSide() {
      console.log(this.images)
    }
  }
}
</script>