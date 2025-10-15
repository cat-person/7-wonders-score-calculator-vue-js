<script>
import QrcodeVue from "qrcode.vue";

export default {
    props: {
        hidden: Boolean,
        url: String,
    },
    methods: {
        handleAddButtonClicked(event) {
            console.error(`Current path: ${this.url}`);
            // this.$emit("addPlayer");
        },
    },
    components: {
        QrcodeVue,
    },
};
</script>

<template>
    <div class="add_container" @click="handleAddButtonClicked">
        <div class="horizontal">
            <img
                v-if="showClose"
                class="button"
                src="@/assets/icon_back.svg"
                @click="handleCloseClicked"
            />
            <h3 class="title">{{ this.title }}</h3>
        </div>
        <!-- <QrcodeVue :value="url" :size="qrSizePx(25)" level="H" /> -->
    </div>
</template>

<style scoped>
.add_container {
    width: 100%;
    height: 100%;
    padding: 5mm;
    max-width: 149mm;
    /*height: 59mm;*/
    background-color: #800000;
    border-color: #606060;
    border-width: 0.5mm;
    border-style: solid;
    justify-items: center;
    justify-self: center;
}
</style>
