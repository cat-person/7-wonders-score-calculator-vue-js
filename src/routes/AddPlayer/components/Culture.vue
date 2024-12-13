<template>
    <div id="Culture" class="culture">
      <h1>Culture</h1>
      <input v-model="culturePoints" @keypress="isNumber($event)" type="number">
    </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        culturePoints: 0,
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
    .culture {
      background-color: dodgerblue;
      justify-self: center;
      width: 120mm;
      padding: 4mm;
      margin: 10mm;
    }
  </style>