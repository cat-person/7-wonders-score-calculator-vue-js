<template>
    <div>
        <TopBar :showClose="false" :title="$t('titles.start')" />

        <div class="qr_code_container">
            <QrcodeVue
                class="final_points_lbl"
                :value="getQrCodeUrl(sessionId)"
                :size="qrCodeSize"
                level="H"
            />
        </div>

        <button @click="handleStartNewGame">start game</button>
    </div>
</template>

<script>
import QrcodeVue from "qrcode.vue";

import { getPseudoRandom } from "@/utils/sessions";
import { qrSizePx } from "@/utils/dpi";
import wonders from "@/assets/wonders.json";

import StartGameItem from "./components/StartGameItem.vue";
import TopBar from "../Common/components/TopBar.vue";

export default {
    beforeMount() {
        window.addEventListener("beforeunload", this.handlePageRefreshed);
    },
    beforeDestroy() {
        window.removeEventListener("beforeunload", this.handlePageRefreshed);
    },
    data() {
        return {
            sessionId: getPseudoRandom(8),
            playerScoreData: this.playerScores,
            wonders: wonders,
            qrCodeSize: qrSizePx(30),
        };
    },
    props: {
        playerScores: Array,
    },
    components: {
        TopBar,
        StartGameItem,
        QrcodeVue,
    },
    methods: {
        handleStartNewGame() {
            this.$router.push(`/${this.sessionId}/add`);
        },
        getQrCodeUrl(sessionId) {
            return `${window.location.origin}/${this.$route.path}/#/${sessionId}/add`;
        },
    },
};
</script>

<style scoped>
.wonder-img {
    width: 100%;
    overflow: hidden;
    margin: 0;
}

.wonder-lbl {
    width: 100%;
    max-width: 160mm;
    position: absolute;
    margin-top: 2mm;
    color: white;
    text-shadow: 0px 0px 10px gray;
}

.table {
    position: absolute;
    justify-content: center;
    vertical-align: bottom;
    justify-items: stretch;
    width: 96%;
    margin-left: 2%;
    background-color: black;
    bottom: 2mm;
}

.point-container {
    justify-content: center;
    justify-items: center;
    font-size: 4mm;
}

.close_btn {
    position: absolute;
    justify-content: center;
    margin-top: 2mm;
    right: 3mm;
    top: 1.5mm;
    height: 4mm;
    width: 4mm;
    text-shadow: 0px 0px 10px gray;
}

.qr_code_container {
    width: 100%;
    max-width: 150mm;
    padding: 5mm;
    /*border-color: #606060;*/
    /*border-width: 0.5mm;*/
    /*border-style: solid;*/
    justify-items: center;
    justify-self: center;

    justify-content: center;
}
</style>
