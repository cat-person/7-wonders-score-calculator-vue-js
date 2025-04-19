<template>
    <div id="Military" class="military">
      <h3 class="title">Military</h3>
      <input v-model="militaryPoints" type="number" @input="handleMilitaryPointsInput" @focus="$event.target.select()">
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
        if (this.militaryPoints) {
          this.$emit('militaryPointsUpdated', this.militaryPoints)
        } else {
          this.$emit("militaryPointsUpdated", 0)
        }
      },
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