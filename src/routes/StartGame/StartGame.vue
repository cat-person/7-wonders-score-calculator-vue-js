<template>
    <div>
        <router-view class="qr_code_container"></router-view>
        <TopBar
            :title="$t('titles.start')"
            :showQR="true"
            :showClose="false"
            @handleIconClick="handleTopBarIconClicked"
        />

        <div class="horizontal">
            <p class="link_to_share">
                {{ getLinkToShare(sessionId) }}
                <!-- {{ $t("buttons.startNewGame", { linkToShare: link }) }} -->
            </p>
            <button class="img_button">
                <img
                    class="icon"
                    type="image"
                    src="@/assets/icon_copy.svg"
                    @click="handleCopyClick(getLinkToShare(sessionId))"
                />
            </button>

            <button class="img_button">
                <img
                    v-if="webShareApiSupported"
                    class="icon"
                    type="image"
                    src="@/assets/icon_share.svg"
                    @click="handleShareClick(getLinkToShare(sessionId))"
                />
            </button>
        </div>
        <!-- <div class="qr_code_container"> -->
        <button class="start_btn" @click="handleStartNewGame">
            {{ $t("buttons.startNewGame") }}
        </button>
        <!-- </div> -->
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
            webShareApiSupported: false,
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
    mounted() {
        // Check if the Web Share API is available
        this.webShareApiSupported = !!navigator.share;
    },
    methods: {
        handleStartNewGame() {
            this.$router.push({
                path: "/add",
                query: { sessionId: this.sessionId },
            });
        },
        getLinkToShare(sessionId) {
            return `${window.location.href}add?sessionId=${sessionId}`;
        },
        handleTopBarIconClicked(icon) {
            if (icon == "qr") {
                if (this.$route.path.includes("popup")) {
                    this.$router.back();
                } else {
                    this.$router.push({
                        name: "popup_start",
                        query: { sessionId: this.sessionId },
                    });
                }
                console.error("qr");
            }
        },
        handleCopyClick(linkToShare) {
            navigator.clipboard.writeText(linkToShare);
        },
        async handleShareClick(linkToShare) {
            try {
                await navigator.share({
                    title: "Join the session",
                    text: "Enter your data and see result points for you and the opponents",
                    url: linkToShare,
                });
                // The data was shared successfully.
            } catch (e) {
                // The data could not be shared.
                console.error(`Error: ${e}`);
            }
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
    padding: 0;
    margin: 0;
}

.horizontal {
    flex-direction: row;
    height: 8mm;
    width: 100%;
    justify-self: center;
    justify-content: center;
}

.link_to_share {
    margin-top: 1mm;
    margin-right: 3mm;
    padding: 0mm;
    width: 100%;
    justify-self: center;
}

.img_button {
    margin-left: 1.5mm;
    margin-right: 1.5mm;
    padding: 1mm;
    width: 7mm;
    height: 7mm;
    justify-content: center;
}

.icon {
    margin: 0mm;
    width: 4mm;
    height: 4mm;
}

.qr_code_container {
    position: absolute;
    width: 100%;
    margin-top: 11mm;
    z-index: 10;
}

.start_btn {
    margin-top: 6mm;
    width: 50mm;
    height: 8mm;
    justify-items: center;
    justify-self: center;
    justify-content: center;
}
</style>
