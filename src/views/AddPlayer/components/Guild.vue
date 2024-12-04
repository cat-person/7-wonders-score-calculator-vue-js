<template>
    <h1>Guilds</h1>
    <div id="Guild">
        <input v-model="guildPoints" @keypress="isNumber($event)" type="number">
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        guildPoints: 1,
        methods: {
            isNumber: function(evt) {
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            }
        }
      };
    }
  };
  </script>
  
  <style>
    #app {
        text-align: center;
        margin: 20px;
    }
  </style>