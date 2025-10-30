<script>
export default {
    props: {
        showClose: Boolean,
        showQR: Boolean,
        title: String,
    },
    data() {
        return {
            currentName: this.name,
        };
    },
    methods: {
        handleIconClick(icon) {
            this.$emit("handleIconClick", icon);
        },
    },
};
</script>

<template>
    <div class="horizontal">
        <img
            v-if="showClose"
            class="button"
            src="@/assets/icon_back.svg"
            @click="handleIconClick('close')"
        />

        <h3 class="title">{{ this.title }}</h3>

        <img
            v-if="showQR"
            class="button_right"
            src="@/assets/icon_qr.svg"
            @click="handleIconClick('qr')"
        />
    </div>
</template>

<style scoped>
.horizontal {
    position: relative;
    height: 8mm;
    width: 100%;
    justify-self: center;
    justify-content: center;
}
.title {
    margin: 0mm;
    height: 8mm;
    align-content: center;
    vertical-align: center;
}
.button {
    justify-self: left;
    position: absolute;
    left: 1mm;
    width: 8mm;
    height: 8mm;
}

.button_right {
    justify-self: right;
    position: absolute;
    right: 1mm;
    width: 8mm;
    height: 8mm;
}
</style>
