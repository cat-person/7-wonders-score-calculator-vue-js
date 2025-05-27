<template>
    <div
        :style="{
            backgroundColor: 'papayawhip',
            margin: '0mm',
            padding: '0mm',
            paddingTop: '2mm',
            justifySelf: 'center',
            width: '100%',
            margin: '0mm',
        }"
    >
        <TopBar
            :title="'Select wonder and enter data'"
            :showClose="true"
            @close="handleClose"
        />

        <WonderSelection
            :wonder="playerScore.wonder"
            @onWonderSelected="onWonderSelected($event)"
            @onSideChanged="handleSideChanged($event)"
            @onStageBuilt="onStageBuilt($event)"
        />

        <Name
            :name="playerScore.name"
            @changeName="handleNameChanged($event)"
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
        <br />
        <button
            :disabled="!canAdd(playerScore)"
            @click="handleAddPlayer($route.params.session_id, playerScore)"
        >
            Done
        </button>
        <p class="error" v-if="!canAdd(playerScore)">
            ❗️ Enter your name to complete the form ❗️
        </p>
    </div>
</template>

<script>
import WonderSelection from "./components/WonderSelection.vue";
import Name from "../Common/components/Name.vue";
import Coins from "../Common/components/Coins.vue";
import Science from "../Common/components/Science.vue";
import TopBar from "../Common/components/TopBar.vue";
import PointInput from "../Common/components/PointInput.vue";

import wonders from "@/assets/wonders.json";
import { addPlayerScore } from "@/utils/remote";

const defaultPlayerScore = {
    name: "",
    wonder: {
        id: wonders[0].id,
        side: "A",
        stageBuilt: 0,
    },
    coinCount: 0,
    militaryPoints: 0,
    culturePoints: 0,
    tradePoints: 0,
    science: {
        clayCount: 0,
        measurerCount: 0,
        cogCount: 0,
    },
    guildPoints: 0,
};

export default {
    components: {
        TopBar,
        Name,
        WonderSelection,
        Coins,
        PointInput,
        Science,
    },
    data() {
        return {
            wonders: wonders,
            playerScore: defaultPlayerScore,
        };
    },
    methods: {
        handleClose() {
            // navigate to players
            // this.$emit('close')
        },
        onWonderSelected(wonderId) {
            this.playerScore.wonder.id = wonderId;
        },
        handleSideChanged(givenSide) {
            this.playerScore.wonder.side = givenSide;
        },
        onStageBuilt(stageBuilt) {
            this.playerScore.wonder.stageBuilt = stageBuilt;
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
        handleNameChanged(name) {
            this.playerScore.name = name;
        },
        handleSideChanged(givenSide) {
            this.playerScore.wonder.side = givenSide;
        },
        onStageBuilt(stageBuilt) {
            this.playerScore.wonder.stageBuilt = stageBuilt;
        },
        handleCoinValueChanged(coinValue) {
            this.playerScore.coinCount = coinValue;
        },
        handleMilitaryPointsUpdated(points) {
            this.playerScore.militaryPoints = points;
        },
        handleCulturePointsUpdated(points) {
            this.playerScore.culturePoints = points;
        },
        handleTradePointsUpdated(points) {
            this.playerScore.tradePoints = points;
        },
        handleScienceUpdated(science) {
            this.playerScore.science = science;
        },
        handleGuildPointsUpdated(points) {
            this.playerScore.guildPoints = points;
        },
        getBackgroundColor(wonder) {
            return this.getWonder(wonder.id, wonder.side).background;
        },
        canAdd(scoreData) {
            return scoreData.name != "";
        },
        async handleAddPlayer(sessionId, playerScore) {
            await addPlayerScore(sessionId, playerScore);
            this.$router.push(`/${sessionId}`);
        },
    },
};
</script>

<style>
.error {
    color: darkred;
}
</style>
