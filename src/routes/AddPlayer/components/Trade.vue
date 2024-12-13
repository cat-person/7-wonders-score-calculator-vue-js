<template>
  <div id="Trade" class="trade">
    <h1>Trade</h1>
        <input v-model="tradePoints" @keypress="isNumber($event)" type="number">
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        tradePoints: 0,
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
    .trade {
      background-color: orange;
      justify-self: center;
      width: 120mm;
      padding: 4mm;
      margin: 10mm;
    }
  </style>