<template>
    <h1>Science</h1>
    <div id="Science" class="horizontal">
          <div class="vertical">
            <img src="../../../assets/science_icons/clay.png" class="science_icon"/>
            <input v-model="clayCount" @keypress="isNumber($event)" type="number">
          </div>
          <div class="vertical">
            <img src="../../../assets/science_icons/measurer.png" class="science_icon"/>
            <input v-model="measurerCount" @keypress="isNumber($event)" type="number">
          </div>
          <div class="vertical">
            <img src="../../../assets/science_icons/cog.png" class="science_icon"/>  
            <input v-model="cogCount" @keypress="isNumber($event)" type="number">
          </div>
    </div>
    <p> Science points: {{ clayCount * clayCount + measurerCount * measurerCount + cogCount * cogCount + 7 * (Math.min.apply(Math, [clayCount, measurerCount, cogCount])) }} </p>
</template>
  
  <script>
  export default {
    data() {
      return {
        clayCount: 0,
        measurerCount: 0,
        cogCount: 0,
        methods: {
          isNumber: function(evt) {
              evt = (evt) ? evt : window.event;
              var charCode = (evt.which) ? evt.which : evt.keyCode;
              if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                  evt.preventDefault();
              } else {
                  return true;
              }
          },
        }
      };
    }
  };
  </script>
  
  <style>
  .horizontal { 
    display: flex;
    justify-content: center;
    flex-direction: row;
    background-color: red;
  }

  .vertical {
    display: flex;
    flex-direction: column;
  }

  .science_icon {
    align-self: center;
    width: 20mm;
    height: 20mm;
  }
  </style>