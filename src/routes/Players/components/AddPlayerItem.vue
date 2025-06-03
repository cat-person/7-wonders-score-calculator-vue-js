<script>
export default {
    props: {},
    methods: {
        handleAddButtonClicked() {
            this.$emit("addPlayer");
        },
    },
};
</script>

<template>
    <div class="add_container" @click="handleAddButtonClicked">
        <img class="add_btn" src="@/assets/icon_plus.svg" />
        <p class="add_player_lbl">{{ $t("components.addPlayer.title") }}</p>
    </div>
</template>

<style scoped>
.add_container {
    width: 100%;
    max-width: 159mm;
    height: 39mm;
    border-color: #606060;
    border-width: 0.5mm;
    border-style: solid;
    justify-items: center;
    justify-self: center;
}

.add_btn {
    margin-top: 11mm;
    height: 12mm;
    width: 12mm;
}

.add_player_lbl {
    margin-top: 1mm;
    color: #606060;
}
</style>
