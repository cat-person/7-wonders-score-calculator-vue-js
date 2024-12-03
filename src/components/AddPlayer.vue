<template>
  <div id="app">
    <h1>Radio Button Group Example</h1>
    <form>
      <div class="radio-group">
        <label>
          <input type="radio" value="Option 1" v-model="selectedOption" />
          Option 1
        </label>
        <label>
          <input type="radio" value="Option 2" v-model="selectedOption" />
          Option 2
        </label>
        <label>
          <input type="radio" value="Option 3" v-model="selectedOption" />
          Option 3
        </label>
      </div>
    </form>
    <p>Selected Option: {{ selectedOption }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: '' // Holds the value of the selected radio button
    };
  }
};
</script>

<style>
#app {
  text-align: center;
  margin: 20px;
}

.radio-group {
  margin: 20px;
}

.radio-group label {
  margin-right: 20px; /* Space between radio buttons */
}
</style>