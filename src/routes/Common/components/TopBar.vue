<script>
  export default {
    props: {
      showClose: Boolean,
      title: String
    },
    data() {
      return {
        currentName: this.name
      }
    },
    methods: {
      handleCloseClicked(){
        this.$emit('close')
      }
    }
  }
</script>

<template>
    <div class="horizontal">
      <img v-if="showClose" class="button" src="@/assets/icon_back.svg" @click="handleCloseClicked"/>
      <h3 class="title">{{ this.title }}</h3>
    </div>
</template>

<style scoped>
  .horizontal {
    position: relative;
    width: 160mm;
    height: 12mm;
    margin-bottom: 2mm;
    justify-self: center;
    justify-content: center;
    display: flex;
    flex-direction: row;
  }
  .title {
    margin: 0mm;
    margin-top: 0.5mm;
    justify-self: center;
  }
  .button {
    justify-self: center;
    position: absolute;
    left: 0mm;
    margin: 0mm;
    width: 8mm;
    height: 8mm;
  }
</style>