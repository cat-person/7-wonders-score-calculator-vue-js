<template>
    <div class="add_container" @click="handleClick">
        <QrcodeVue :value="getShareUrl()" :size="qrCodeSize" />
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { qrSizePx } from "@/utils/dpi";

export default {
    data() {
        return {
            sessionId: this.$route.params.session_id,
            qrCodeSize: qrSizePx(30),
        };
    },
    methods: {
        handleClick(event) {
            console.error(`Current path: ${this.url}`);
            this.$router.back();
        },
        getShareUrl() {
            return window.location.href.replace("popup", "add");
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
    max-width: 119mm;
    padding: 10mm;
    background-color: white;
    border-color: #606060;
    border-width: 0.5mm;
    border-style: solid;
    justify-items: center;
    justify-self: right;
}
</style>
