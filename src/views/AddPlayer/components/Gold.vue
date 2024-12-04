<template>
    <h1>Gold</h1>
    <div id="Gold amount">
        <input v-model="goldCount" @keypress="isNumber($event)" type="number">
    </div>
    <p>Gold points: {{ Math.floor(this.goldCount / 3) }}</p>
</template>
  
  <script>
  export default {
    data() {
      return {
        goldCount: 0,
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