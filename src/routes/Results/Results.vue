<template>
    <div>
        <TopBar
            :showClose="true"
            :title="$t('titles.results')"
            @close="handleClose"
        />

        <div
            class="results"
            v-for="playerScore in getRankedScores(playerScores)"
        >
            <ResultItem
                :playerScore="playerScore"
                :rank="rank"
                :points="points"
            />
        </div>

        <button :class="newGameButtonClass" @click="startNewGame">
            {{ $t("buttons.startNewGame") }}
        </button>
    </div>
</template>

<script>
import { toRaw } from "vue";

import wonders from "@/assets/wonders.json";
import ResultItem from "./components/ResultItem.vue";
import TopBar from "../Common/components/TopBar.vue";

import { getPlayerScores, getPlayerScoresCached } from "@/utils/remote";
import * as util from "@/utils/calc";

export default {
    mounted: async function () {
        this.playerScores = getPlayerScoresCached();
        this.playerScores = await getPlayerScores(
            this.$route.params.session_id,
        );
    },
    data() {
        return {
            playerScores: [],
            wonders: wonders,
        };
    },
    components: {
        ResultItem,
        TopBar,
    },
    methods: {
        startNewGame() {
            this.$emit("startNewGame");
        },
        isScoreBigger(score, scoreToCompare) {
            return (
                scoreToCompare.finalPoints < score.finalPoints ||
                (scoreToCompare.finalPoints == score.finalPoints &&
                    scoreToCompare.coinCount < score.coinCount)
            );
        },
        getRankedScores(playerScores) {
            let result = Array(playerScores.length);

            for (let scoreIdx = 0; scoreIdx < playerScores.length; scoreIdx++) {
                let currentIdx = scoreIdx;
                let currentScore = structuredClone(
                    toRaw(playerScores[currentIdx]),
                );
                currentScore.finalPoints = util.calcSum(currentScore);

                while (
                    0 < currentIdx &&
                    this.isScoreBigger(currentScore, result[currentIdx - 1])
                ) {
                    result[currentIdx] = result[currentIdx - 1];
                    currentIdx--;
                }
                result[currentIdx] = currentScore;
            }
            return result;
        },
        handleClose() {
            this.$emit("close");
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
</style>
