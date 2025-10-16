<template>
    <div class="root">
        <TopBar :showClose="false" :title="$t('titles.start')" />

        <div class="qr_code_container">
            <QrcodeVue
                class="final_points_lbl"
                :value="getQrCodeUrl(sessionId)"
                :size="qrCodeSize"
                level="H"
            />
        </div>
        <div class="qr_code_container">
            <button class="start_btn" @click="handleStartNewGame">
                {{ $t("buttons.startNewGame") }}
            </button>
        </div>
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import { getPseudoRandom } from "@/utils/sessions";
import { qrSizePx } from "@/utils/dpi";
import wonders from "@/assets/wonders.json";
import TopBar from "../Common/components/TopBar.vue";

export default {
    data() {
        return {
            sessionId: getPseudoRandom(8),
            playerScoreData: this.playerScores,
            wonders: wonders,
            qrCodeSize: qrSizePx(36),
        };
    },
    props: {
        playerScores: Array,
    },
    components: {
        TopBar,
        QrcodeVue,
    },
    methods: {
        handleStartNewGame() {
            this.$router.push(`/${this.sessionId}/add`);
        },
        getQrCodeUrl(sessionId) {
            return `${window.location.href}${sessionId}/add`;
        },
    },
};
</script>

<style scoped>
.root {
    overflow: hidden;
    justify-items: center;
    justify-self: center;
    justify-content: center;
    margin: 0;
}

.start_btn {
    margin-top: 6mm;
    width: 50mm;
    height: 8mm;
    justify-items: center;
    justify-self: center;
    justify-content: center;
}

.qr_code_container {
    width: 100%;
    margin-top: 2mm;
    justify-items: center;
    justify-self: center;

    justify-content: center;
}
</style>
