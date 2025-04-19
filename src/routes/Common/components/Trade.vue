<template>
  <div id="Trade" class="trade">
    <h3>Trade</h3>
    <input v-model="tradePoints" type="number" @input="handleTradePointsInput" @focus="$event.target.select()" min="0">
  </div>
</template>
  
  <script>
  export default {
    props: {
      points: Number
    },
    data() {
      return {
        tradePoints: this.points,
      };
    },
    methods: {
      handleTradePointsInput(){
        if (this.tradePoints) {
          this.$emit('tradePointsUpdated', this.tradePoints)
        } else {
          this.$emit("tradePointsUpdated", 0)
        }
      }
    }
  };
  </script>
  
<style> 
.trade {
  background-color: orange;
  justify-self: center;
  width: 96%;
  padding-bottom: 4mm;
  padding-top: 1mm;
  margin-bottom: 3mm;
}
</style>