<script>
  export default {
    props: {
      name: String
    },
    data() {
      return {
        currentName: this.name
      }
    },
    methods: {
      handleNameChanged() {
        this.$emit("changeName", this.currentName.trim())
      }
    }
  }
</script>

<template>
    <div class="horizontal">
      <h3 class="enter_name_lbl">Name:</h3>
      <input class="name_input" v-model="currentName" type="text" @input="handleNameChanged" placeholder="Enter your name">
    </div>
</template>

<style scoped>
.horizontal { 
  position: relative;
  justify-self: center;
  display: flex;
  width: 96%;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 1%;
  padding-bottom: 1%;
  margin-bottom: 2mm;
  justify-content: center;
  flex-direction: row;
  background-color: darkgrey;
  margin-bottom: 3mm;
}

.enter_name_lbl {
  margin: 0mm;
  align-self: center;
  width: 20%;
  height: 6mm;
}
.name_input {
  margin: 0mm;
  align-self: center;
  width: 80%;
  height: 6mm;
}
</style>