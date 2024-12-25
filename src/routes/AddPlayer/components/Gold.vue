<template>
    <div id="Gold amount" class="gold">
      <h1>Gold</h1>
      <input v-model.number="currentGoldCount" @keypress="isNumber($event)" @input="onGoldCountChanged()" type="number">
      <p>Gold points: {{ this.calcPoints() }}</p>
    </div>
</template>
  
  <script>
  export default {
    props: {
      goldCount: Number
    },
    data() {
      return {
        currentGoldCount: this.goldCount
      }
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
      calcPoints() {  
        return Math.floor(this.currentGoldCount / 3)
      },

      onGoldCountChanged() {
        console.error(`Gold.onGoldCountChanged(${JSON.stringify(this.currentGoldCount)})`)
        this.$emit("goldCountChanged", this.currentGoldCount)
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