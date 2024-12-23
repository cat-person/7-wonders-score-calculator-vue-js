<template>
    <div id="Gold amount" class="gold">
      <h1>Gold</h1>
      <input :value="goldCount" @keypress="isNumber($event)" @input="onGoldCountChanged()" type="number">
      <p>Gold points: {{ calcPoints(goldCount) }}</p>
    </div>
</template>
  
  <script>
  export default {
    props: {
      goldCount: Number
    },
    data() {
      return {}
    },
    methods: {
      isNumber(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
              evt.preventDefault();
          } else {
              return true;
          }
      },
      calcPoints(givenGoldCount) {
        Math.floor(givenGoldCount / 3)
      },
      onGoldCountChanged(givenGoldCount) {
        this.$emit("onGoldCountChanged", givenGoldCount)
      }
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