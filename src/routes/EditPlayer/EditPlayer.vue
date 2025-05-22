<template>
    <div
        v-if="playerScore"
        :style="{
            'background-color': this.backgroundColor,
            'padding-top': '3mm',
            'padding-bottom': '3mm',
        }"
    >
        <TopBar
            :showClose="true"
            :title="`Edit data for ${playerScore.name}`"
            @close="handleClose"
        />

        <Wonder
            :wonder="playerScore.wonder"
            @onStageBuilt="onStageBuilt($event)"
            @onSideChanged="handleSideChanged"
        />

        <Name
            :name="playerScore.name"
            @changeName="handleNameChanged($event)"
        />

        <Coins
            :coinCount="playerScore.coinCount"
            @coinCountChanged="handleCoinCountChanged($event)"
        />
        <Military :points="playerScore.militaryPoints" />
        <Culture
            :points="playerScore.culturePoints"
            @culturePointsUpdated="handleCulturePointsUpdated($event)"
        />
        <Trade
            :points="playerScore.tradePoints"
            @tradePointsUpdated="handleTradePointsUpdated($event)"
        />
        <Science
            :science="playerScore.science"
            @scienceUpdated="handleScienceUpdated($event)"
        />
        <Guild
            :points="playerScore.guildPoints"
            @guildPointsUpdated="handleGuildPointsUpdated($event)"
        />
        <br />
        <button :disabled="!canAdd(playerScore)" @click="handleFinishEditing">
            {{ getButtonTitle(originalPlayerScore, playerScore) }}
        </button>
    </div>
</template>

<script>
import Name from "../Common/components/Name.vue";
import Wonder from "../Common/components/Wonder.vue";
import Coins from "../Common/components/Coins.vue";
import Military from "../Common/components/Military.vue";
import Culture from "../Common/components/Culture.vue";
import Trade from "../Common/components/Trade.vue";
import Science from "../Common/components/Science.vue";
import Guild from "../Common/components/Guild.vue";

import wonders from "@/assets/wonders.json";
import TopBar from "../Common/components/TopBar.vue";
import { getPlayerScoreByWonderId, updatePlayerScore } from "@/utils/remote";
import { onMounted } from "vue";

export default {
    data() {
        return {
            wonders: wonders,
            originalPlayerScore: null,
            playerScore: null,
            backgroundColor: "gray",
        };
    },
    mounted: async function () {
        this.originalPlayerScore = await getPlayerScoreByWonderId(
            this.$route.params.session_id,
            this.$route.params.wonder_id,
        );
        this.playerScore = JSON.parse(JSON.stringify(this.originalPlayerScore));
        this.backgroundColor = this.getBackgroundColor(
            this.playerScore,
            this.wonders,
        );
    },
    components: {
        TopBar,
        Wonder,
        Name,
        Coins,
        Military,
        Culture,
        Trade,
        Science,
        Guild,
    },

    methods: {
        async getInitialPlayerScore() {},
        getBackgroundColor(playerScore) {
            if (playerScore && playerScore.wonder) {
                return this.getWonder(
                    playerScore.wonder.id,
                    playerScore.wonder.side,
                ).background;
            }
            return "gray";
        },
        getButtonTitle(originalPlayerScore, playerScore) {
            if (
                JSON.stringify(originalPlayerScore) ==
                JSON.stringify(playerScore)
            ) {
                return "Close";
            } else {
                return "Save Changes";
            }
        },
        handleNameChanged(name) {
            this.playerScore.name = name;
        },
        handleCoinCountChanged(givenCount) {
            this.playerScore.coinCount = givenCount;
        },
        onWonderSelected(wonderId) {
            this.playerScore.wonder.id = wonderId;
        },
        getWonder(wonderId, side) {
            let result = undefined;
            this.wonders.forEach((wonder) => {
                if (wonder.id == wonderId) {
                    result = wonder;
                }
            });

            if (side == "A") {
                return result.A;
            } else {
                return result.B;
            }
        },
        handleSideChanged(givenSide) {
            this.playerScore.wonder.side = givenSide;
            this.backgroundColor = this.getBackgroundColor(
                this.playerScore,
                this.wonders,
            );
        },
        onStageBuilt(stageBuilt) {
            this.playerScore.wonder.stageBuilt = stageBuilt;
        },
        handleCulturePointsUpdated(culturePoints) {
            this.playerScore.culturePoints = culturePoints;
        },
        handleTradePointsUpdated(tradePoints) {
            this.playerScore.tradePoints = tradePoints;
        },
        handleScienceUpdated(science) {
            this.playerScore.science = science;
        },
        handleGuildPointsUpdated(guildPoints) {
            this.playerScore.guildPoints = guildPoints;
        },
        canAdd(scoreData) {
            return this.playerScore.name != "";
        },
        async handleFinishEditing() {
            if (
                JSON.stringify(this.originalPlayerScore) ==
                JSON.stringify(this.playerScore)
            ) {
                this.$router.back();
            } else {
                await updatePlayerScore(
                    this.$route.params.session_id,
                    this.playerScore,
                );
                this.$router.back();
            }
        },
        handleClose() {
            this.$emit("close");
        },
    },
};
</script>

<style>
.container {
    justify-self: center;
    width: 100%;
    padding-top: 3mm;
    padding-bottom: 3mm;
}
</style>
