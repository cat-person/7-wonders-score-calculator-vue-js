<template>
  <div id="Guilds" class="guilds">
      <h3>Guilds</h3>
      <input v-model="guildPoints" type="number" @input="handleGuildPointsInput" @focus="$event.target.select()" min="0">
  </div>
</template>
  
  <script>
  export default {
    props: {
      points: Number
    },
    data() {
      return {
        guildPoints: this.points,
      };
    },
    methods: {
      handleGuildPointsInput(){
        if (this.guildPoints) {
          this.$emit('guildPointsUpdated', this.guildPoints)
        } else {
          this.$emit("guildPointsUpdated", 0)
        }
      }
    }
  };
  </script>
  
  <style>
  .guilds {
    background-color: mediumslateblue;
    justify-self: center;
    width: 96%;
    padding-bottom: 4mm;
    padding-top: 1mm;
    margin-bottom: 3mm;
  }
  </style>