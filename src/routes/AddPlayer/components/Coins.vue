<template>
    <div id="Coins amount" class="coins">
      <h3>Coins</h3>
      <input v-model.number="currentCoinCount" @keypress="isNumber($event)" @input="onCoinCountChanged" type="number">
      <p>Coin points: {{ this.calcPoints() }}</p>
    </div>
</template>
  
  <script>
  export default {
    props: {
      coinCount: Number
    },
    data() {
      return {
        currentCoinCount: this.coinCount
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
        return Math.floor(this.currentCoinCount / 3)
      },
      onCoinCountChanged() {
        if(this.currentCoinCount) {
          this.$emit("coinCountChanged", this.currentCoinCount)
        }
      }
    }
  };
  </script>
  
  <style>
  .coins {
    background-color: goldenrod;
    justify-self: center;
    width: 130mm;
    padding-bottom: 4mm;
    padding-top: 1mm;
    margin-bottom: 3mm;
  }
  </style>