<template>
  <div id="Guilds" class="guilds">
      <h1>Guilds</h1>
      <input v-model="guildPoints" @keypress="isNumber($event)" type="number" @input="handleGuildPointsInput">
  </div>
</template>
  
  <script>
  export default {
    props: {
      points: Object
    },
    data() {
      return {
        guildPoints: this.points,
      };
    },
    methods: {
      isNumber: function(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
              evt.preventDefault();
          } else {
              return true;
          }
      },
      handleGuildPointsInput(){
        this.$emit('guildPointsUpdated', this.guildPoints)
      }
    }
  };
  </script>
  
  <style>
    .guilds {
      background-color: mediumslateblue;
      justify-self: center;
      width: 120mm;
      padding: 4mm;
      margin: 10mm;
    }
  </style>