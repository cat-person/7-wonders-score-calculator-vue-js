<template>
    <div id="Military" class="military">
      <h3 class="title">Military</h3>
      <input v-model="militaryPoints" @keypress="isNumber($event)" type="number" @input="handleMilitaryPointsInput" @focus="$event.target.select()">
    </div>
</template>
  
<script>
  export default {
    props: {
        points: Number
    },
    data() {
      return {
        militaryPoints: this.points,
      }
    },
    methods: {
      handleMilitaryPointsInput(){
        this.$emit('militaryPointsUpdated', this.militaryPoints)
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
  .military {
    background-color: firebrick;
    justify-self: center;
    width: 96%;
    padding-bottom: 4mm;
    padding-top: 1mm;
    margin-bottom: 3mm;
  }
</style>