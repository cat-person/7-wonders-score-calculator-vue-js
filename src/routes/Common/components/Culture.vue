<template>
    <div id="Culture" class="culture">
      <h3 class="title">Culture</h3>
      <input v-model="culturePoints" type="number" @input="handleCulturePointsInput" @focus="$event.target.select()" min="0">
    </div>
</template>
  
<script>
  export default {
    props: {
      points: Number
    },
    data() {
      return {
        culturePoints: this.points,
      }
    },
    methods: {
      handleCulturePointsInput(){
        if (this.culturePoints) {
          this.$emit('culturePointsUpdated', this.culturePoints)
        } else {
          this.$emit("culturePointsUpdated", 0)
        }
      },
    },
  };
</script> 

<style>
  .culture {
    background-color: dodgerblue;
    justify-self: center;
    width: 96%;
    padding-bottom: 4mm;
    padding-top: 1mm;
    margin-bottom: 3mm;
  }
</style>