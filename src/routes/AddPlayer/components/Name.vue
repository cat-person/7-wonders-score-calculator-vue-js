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
      <p>Enter your name:_</p>
      <input v-model="currentName" type="text" @input="onNameChanged()">
    </div>
</template>

<style scoped>
  .horizontal { 
    display: flex;
    justify-content: center;
    flex-direction: row;
  }
</style>