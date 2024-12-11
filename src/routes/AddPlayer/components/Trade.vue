<template>
    <h1>Trade</h1>
    <div id="Trade">
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
    #app {
        text-align: center;
        margin: 20px;
    }
  </style>