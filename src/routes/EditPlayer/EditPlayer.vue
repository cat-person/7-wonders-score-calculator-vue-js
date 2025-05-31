<template>
    <div v-if="playerScore">
        <TopBar
            :showClose="true"
            :title="`Edit data for ${playerScore.name}`"
            @close="handleClose"
        />

        <Wonder
            :wonder="playerScore.wonder"
            @onSideChanged="handleSideChanged($event)"
            @onStageBuilt="onStageBuilt($event)"
        />

        <Coins
            :coinValue="playerScore.coinCount"
            @coinValueChanged="handleCoinValueChanged($event)"
        />
        <PointInput
            :category="'Military'"
            :color="'firebrick'"
            :min="-6"
            :max="18"
            :points="playerScore.militaryPoints"
            @pointsUpdated="handleMilitaryPointsUpdated($event)"
        />
        <PointInput
            :category="'Culture'"
            :color="'blue'"
            :points="playerScore.culturePoints"
            @pointsUpdated="handleCulturePointsUpdated($event)"
        />
        <PointInput
            :category="'Trade'"
            :color="'gold'"
            :points="playerScore.tradePoints"
            @pointsUpdated="handleTradePointsUpdated($event)"
        />
        <Science
            :science="playerScore.science"
            @scienceUpdated="handleScienceUpdated($event)"
        />
        <PointInput
            :category="'Guilds'"
            :color="'purple'"
            :points="playerScore.guildPoints"
            @pointsUpdated="handleGuildPointsUpdated($event)"
        />

        <Name
            label="Enter your name to complete the form"
            :value="playerScore.name"
            @valueUpdated="handleNameChanged($event)"
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
import PointInput from "../Common/components/PointInput.vue";
import Coins from "../Common/components/Coins.vue";
import Science from "../Common/components/Science.vue";

import wonders from "@/assets/wonders.json";
import TopBar from "../Common/components/TopBar.vue";
import { getPlayerScoreByWonderId, updatePlayerScore } from "@/utils/remote";

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
        PointInput,
        Science,
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
        handleCoinValueChanged(givenCount) {
            this.playerScore.coinCount = givenCount;
        },
        handleMilitaryPointsUpdated(givenPoints) {
            this.playerScore.militaryPoints = givenPoints;
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
            return scoreData.name !== "";
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
