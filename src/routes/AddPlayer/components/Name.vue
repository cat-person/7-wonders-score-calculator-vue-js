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
      onNameChanged() {
        console.error(`Name.onNameChanged(${this.currentName})`)
        this.$emit("changeName", this.currentName)
      }
    }
  }
</script>

<template>
    <div class="horizontal">
      <p class="enter_name_lbl">Name:</p>
      <input class="name_input" v-model="currentName" type="text" @input="onNameChanged()" placeholder="Enter your name">
    </div>
</template>

<style scoped>
.horizontal { 
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: row;
}

.enter_name_lbl {
  margin: 0mm;
  align-self: center;
  width: 20%;
  height: 6mm;
  color: white;
}
.name_input {
  margin: 0mm;
  align-self: center;
  width: 80%;
  height: 6mm;
}
</style>