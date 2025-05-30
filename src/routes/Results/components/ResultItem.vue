<script>
import wonders from "@/assets/wonders.json";
import colors from "@/assets/colors.json";
import * as util from "@/utils/calc";

const url = "https://vuejs.org/images/logo.png";

export default {
    props: {
        playerScore: Object,
    },

    data() {
        return {
            wonders: wonders,
            playerScore: this.playerScore,
            colors: colors,
        };
    },
    methods: {
        getWonderById(wonderId) {
            let result = undefined;
            this.wonders.forEach((wonder) => {
                if (wonder.id == wonderId) {
                    result = wonder;
                }
            });
            return result;
        },

        getWonderByIdAndSide(wonderId, side) {
            let wonder = this.getWonderById(wonderId);
            if (side == "A") {
                return wonder.A;
            } else {
                return wonder.B;
            }
        },
        getImageByWonder(wonderId, side) {
            let wonder = this.getWonderByIdAndSide(wonderId, side);
            return new URL(
                `../../../assets/wonders/${wonder.img}`,
                import.meta.url,
            );
        },

        getPointsByCategory(playerScore) {
            return [
                {
                    name: "wonder",
                    color: colors.wonder,
                    points: util.calcWonderPoints(playerScore.wonder),
                },
                {
                    name: "coins",
                    color: colors.coins,
                    points: util.calcCoinPoints(playerScore.coinCount),
                },
                {
                    name: "military",
                    color: colors.military,
                    points: playerScore.militaryPoints,
                },
                {
                    name: "culture",
                    color: colors.culture,
                    points: playerScore.culturePoints,
                },
                {
                    name: "trade",
                    color: colors.trade,
                    points: playerScore.tradePoints,
                },
                {
                    name: "science",
                    color: colors.science,
                    points: util.calcSciencePoints(
                        playerScore.science.clayCount,
                        playerScore.science.measurerCount,
                        playerScore.science.cogCount,
                    ),
                },
                {
                    name: "guild",
                    color: colors.guild,
                    points: playerScore.guildPoints,
                },
            ];
        },

        handleEditClicked(playerScore) {
            this.$emit("editPlayer", playerScore);
        },
        handleDeleteClicked(playerScore) {
            this.$emit("deletePlayer", playerScore);
        },
        getOpacity(rank) {
            switch (rank) {
                case 1:
                case undefined:
                    return 1.0;
                case 2:
                    return 0.85;
                case 3:
                    return 0.75;
                default:
                    return 0.4;
            }
        },
        getRankColor(rank) {
            switch (rank) {
                case 1:
                    return "gold";
                case 2:
                    return "silver";
                case 3:
                    return "rosybrown";
                default:
                    return "white";
            }
        },
    },
};
</script>

<template>
    <div class="root">
        <h1 class="final_points_lbl" v-if="playerScore.finalPoints">
            {{ playerScore.finalPoints }}
        </h1>

        <h3 class="wonder-lbl">
            {{ getWonderById(playerScore.wonder.id).name }} ({{
                playerScore.wonder.side
            }}): {{ playerScore.name }}
        </h3>

        <table class="table">
            <tbody>
                <tr>
                    <td
                        class="point-container"
                        :style="{
                            'background-color': scoreItem.color,
                            width: '14%',
                        }"
                        v-for="scoreItem in getPointsByCategory(playerScore)"
                        :key="scoreItem.name"
                    >
                        {{ scoreItem.name }}
                    </td>
                </tr>
                <tr>
                    <td
                        class="point-container"
                        :style="{
                            'background-color': scoreItem.color,
                            width: '14%',
                        }"
                        v-for="scoreItem in getPointsByCategory(playerScore)"
                        :key="scoreItem.name"
                    >
                        {{ scoreItem.points }}
                    </td>
                </tr>
            </tbody>
        </table>

        <img
            class="wonder-img"
            @click="handleEditClicked"
            v-bind:src="
                getImageByWonder(playerScore.wonder.id, playerScore.wonder.side)
            "
        />
    </div>
</template>

<style scoped>
.root {
    width: 100%;
    height: 100%;
    max-width: 160mm;
}

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
    padding: 0mm;
    margin: 0mm;
    position: absolute;
    justify-content: center;
    vertical-align: bottom;
    justify-items: stretch;
    width: 96%;
    margin-left: 2%;
    background-color: white;
    border-collapse: collapse;
    bottom: 6mm;
}

.point-container {
    justify-content: center;
    justify-items: center;
    font-size: 4mm;
}

.final_points_lbl {
    position: absolute;
    width: 100%;
    bottom: 40%;
    color: white;
    text-shadow: 0px 0px 10px gray;
}
</style>
