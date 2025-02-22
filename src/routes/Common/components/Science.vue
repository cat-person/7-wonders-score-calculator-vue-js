<template>
    <div class="science">
    <h3>Science</h3>
    <div id="Science" class="horizontal">
      <div class="vertical">
        <img src="../../../assets/science_icons/clay.png" class="science_icon"/>
        <input class="scienceInput" v-model="scienceData.clayCount" @keypress="isNumber($event)" type="number">
      </div>
      <div class="vertical">
        <img src="../../../assets/science_icons/measurer.png" class="science_icon"/>
        <input class="scienceInput" v-model="scienceData.measurerCount" @keypress="isNumber($event)" type="number">
      </div>
      <div class="vertical">
        <img src="../../../assets/science_icons/cog.png" class="science_icon"/>  
        <input class="scienceInput" v-model="scienceData.cogCount" @keypress="isNumber($event)" type="number">
      </div>
    </div>
    <p> Science points: {{ calcSciencePoints(scienceData.clayCount, scienceData.measurerCount, scienceData.cogCount) }} </p>
  </div>
</template>
  
  <script>
  export default {
    props:{
      science: Object
    },
    data() {
      return {
        scienceData: this.science,
      }
    },
    methods: {
      calcSciencePoints(clayCount, measurerCount, cogCount) {
        return clayCount * clayCount + measurerCount * measurerCount + cogCount * cogCount + 7 * (Math.min.apply(Math, [clayCount, measurerCount, cogCount]))
      },
      handleScienceUpdated(){
        this.$emit('scienceUpdated', this.scienceData)
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
    }
  };
  </script>
  
  <style>
  .scienceInput {
      justify-self: center;
      width: 15mm;
    }

  .science {
      background-color: cadetblue;
      justify-self: center;
      width: 100mm;
      padding-bottom: 4mm;
      padding-top: 1mm;
      margin-bottom: 3mm;
    }

  .horizontal { 
    display: flex;
    justify-content: center;
    flex-direction: row;
  }

  .vertical {
    display: flex;
    flex-direction: column;
    margin: 2mm;
  }

  .science_icon {
    align-self: center;
    width: 16mm;
    height: 16mm;
  }
  </style>