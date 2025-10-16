<template>
    <div class="add_container" @click="handleClick">
        <QrcodeVue :value="getShareUrl()" :size="200" />
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { qrSizePx } from "@/utils/dpi";

export default {
    data() {
        return {
            sessionId: this.$route.params.session_id,
        };
    },
    methods: {
        handleClick(event) {
            console.error(`Current path: ${this.url}`);
            // this.$emit("click");
            this.$router.back();
        },
        getShareUrl() {
            return `${window.location.origin}/${this.$route.path}`.replace(
                "popup",
                "add",
            );
        },
    },
    components: {
        QrcodeVue,
    },
};
</script>

<style scoped>
.add_container {
    width: 80%;
    max-width: 99mm;
    padding: 5%;
    /*height: 59mm;*/
    background-color: white;
    border-color: #606060;
    border-width: 0.5mm;
    border-style: solid;
    justify-items: center;
    justify-self: right;
}
</style>
