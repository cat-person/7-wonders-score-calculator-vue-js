<template>
    <div id="Culture" class="culture">
      <h3 class="title">Culture</h3>
      <input v-model="culturePoints" @keypress="isNumber($event)" type="number" @input="handleCulturePointsInput">
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
        this.$emit('culturePointsUpdated', this.culturePoints)
      },
      isNumber(evt) {
          evt = (evt) ? evt : window.event;
          var charCode = (evt.which) ? evt.which : evt.keyCode;
          if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
              evt.preventDefault();
          } else {
              return true;
          }
      }
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