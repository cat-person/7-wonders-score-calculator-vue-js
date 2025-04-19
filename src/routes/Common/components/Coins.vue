<template>
    <div id="Coins amount" class="coins">
      <h3>Coins</h3>
      <div>
        <p>Enter coin value</p>
        <input v-model.number="currentCoinCount" @input="onCoinCountChanged" @focus="$event.target.select()" type="number" min="0">
      </div>
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
      calcPoints() {  
        return Math.floor(this.currentCoinCount / 3)
      },
      onCoinCountChanged() {
        if(this.currentCoinCount) {
          this.$emit("coinCountChanged", this.currentCoinCount)
        } else {
          this.$emit("coinCountChanged", 0)
        }
      }
    }
  };
  </script>
  
  <style>
  .coins {
    background-color: silver;
    justify-self: center;
    width: 96%;
    padding-bottom: 4mm;
    padding-top: 1mm;
    margin-bottom: 3mm;
  }
  </style>