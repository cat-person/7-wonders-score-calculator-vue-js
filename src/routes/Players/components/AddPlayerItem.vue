<script>

export default {
    props: {
    },
    methods: {
        handleAddButtonClicked() {
            this.$emit("addPlayer")
        }
    }
}
</script>

<template>
    <div class="add_container" @click="handleAddButtonClicked">
        <img class="add_btn" src="@/assets/icon_plus.svg" />
        <p class="add_player_lbl">Add player</p>
    </div>
</template>

<style scoped>
.add_container {
    width: 159mm;
    height: 49mm;
    border-color: #606060;
    border-width: 0.5mm;
    border-style: solid;
    justify-items: center;
    justify-self: center;
}

.add_btn {
    margin-top: 17mm;
    height: 12mm;
    width: 12mm;
}

.add_player_lbl {
    margin-top: 4mm;
    color: #606060;
}
</style>