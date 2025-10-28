<template>
    <div class="pupupu" @click="handleOutsideClick">
        <div class="qr_code_container">
            <QrcodeVue :value="getShareUrl()" :size="qrCodeSize" />
        </div>
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";
import { qrSizePx } from "@/utils/dpi";

export default {
    data() {
        return {
            sessionId: this.$route.query.sessionId,
            qrCodeSize: qrSizePx(36),
        };
    },
    methods: {
        handleOutsideClick(event) {
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
.qr_code_container {
    padding: 2mm;
    inline-size: min-content;
    background-color: #ffffff;
    border-color: #606060;
    border-width: 0.5mm;
    border-style: solid;
    justify-items: center;
    justify-self: right;
}

.pupupu {
    padding: 0mm;
    margin-top: 11mm;
    width: 100%;
    max-width: 160mm;
    border-style: none;
    background-color: #ffffff80;
    height: 90dvh;
    justify-items: right;
    justify-self: right;
}
</style>
