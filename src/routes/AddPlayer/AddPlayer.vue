<template>
    <div>
        <TopBar
            :title="$t('titles.add')"
            :showClose="true"
            @close="handleClose"
        />

        <WonderSelection
            :wonder="playerScore.wonder"
            @onWonderSelected="onWonderSelected($event)"
            @onSideChanged="handleSideChanged($event)"
            @onStageBuilt="onStageBuilt($event)"
        />

        <Coins
            :coinValue="playerScore.coinCount"
            @coinValueChanged="handleCoinValueChanged($event)"
        />
        <PointInput
            :category="$t('categories.military.gen')"
            :color="'firebrick'"
            :min="-6"
            :max="18"
            :points="playerScore.militaryPoints"
            @pointsUpdated="handleMilitaryPointsUpdated($event)"
        />
        <PointInput
            :category="$t('categories.culture.gen')"
            :color="'blue'"
            :points="playerScore.culturePoints"
            @pointsUpdated="handleCulturePointsUpdated($event)"
        />
        <PointInput
            :category="$t('categories.trade.gen')"
            :color="'gold'"
            :points="playerScore.tradePoints"
            @pointsUpdated="handleTradePointsUpdated($event)"
        />
        <Science
            :science="playerScore.science"
            @scienceUpdated="handleScienceUpdated($event)"
        />
        <PointInput
            :category="$t('categories.guilds.gen')"
            :color="'purple'"
            :points="playerScore.guildPoints"
            @pointsUpdated="handleGuildPointsUpdated($event)"
        />

        <Name
            :label="$t('categories.name')"
            :value="playerScore.name"
            @valueUpdated="handleNameChanged($event)"
        />

        <br />

        <button
            :disabled="!canAdd"
            @click="handleAddPlayer($route.params.session_id, playerScore)"
        >
            {{ $t("buttons.done") }}
        </button>
    </div>
</template>

<script>
import WonderSelection from "../Common/components/WonderSelection.vue";
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
        WonderSelection,
        Name,
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
    computed: {
        canAdd: {
            get() {
                if (this.playerScore.name) {
                    return true;
                }
                return false;
            },
        },
    },
    methods: {
        onWonderSelected(wonderId) {
            this.playerScore.wonder.id = wonderId;
        },
        handleSideChanged(givenSide) {
            this.playerScore.wonder.side = givenSide;
        },
        onStageBuilt(stageBuilt) {
            this.playerScore.wonder.stageBuilt = stageBuilt;
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
        handleNameChanged(name) {
            this.playerScore.name = name;
        },
        async handleAddPlayer(sessionId, playerScore) {
            await addPlayerScore(sessionId, playerScore);
            this.$router.push(`/${sessionId}`);
        },
    },
};
</script>
