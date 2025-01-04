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
      <p class="enter_name_lbl">Enter your name:</p>
      <input class="name_input" v-model="currentName" type="text" @input="onNameChanged()">
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
  width: 30%;
  height: 6mm;
  color: white;
}
.name_input {
  margin: 0mm;
  align-self: center;
  width: 70%;
  height: 6mm;
}
</style>