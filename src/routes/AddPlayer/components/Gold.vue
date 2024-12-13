<template>
    <div id="Gold amount" class="gold">
      <h1>Gold</h1>
      <input v-model="goldCount" @keypress="isNumber($event)" type="number">
      <p>Gold points: {{ Math.floor(this.goldCount / 3) }}</p>
    </div>
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
    .gold {
      background-color: goldenrod;
      justify-self: center;
      width: 120mm;
      padding: 4mm;
      margin: 10mm;
    }
  </style>