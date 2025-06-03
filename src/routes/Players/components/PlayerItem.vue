<template>
    <div class="root">
        <h3 class="wonder-lbl">
            {{ $t(`wonders.${playerScore.wonder.id}`) }} ({{
                playerScore.wonder.side
            }}): {{ playerScore.name }}
        </h3>
        <img
            class="close_btn"
            src="../../../assets/icon_remove_2.svg"
            @click="handleDeleteClicked(playerScore)"
        />
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
                        {{ $t(`categories.${scoreItem.name}.nom`) }}
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

<script>
import wonders from "@/assets/wonders.json";
import colors from "@/assets/colors.json";
import * as util from "@/utils/calc";

export default {
    props: {
        playerScore: Object,
    },

    data() {
        return {
            wonders: wonders,
            playerScore: this.playerScore,
            colors: colors,
            pointsByCategory: {
                wonder: 32,
                gold: 12,
                military: 6,
            },
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
                    name: "guilds",
                    color: colors.guild,
                    points: playerScore.guildPoints,
                },
            ];
        },
        handleEditClicked() {
            this.$emit("editPlayer", this.playerScore.wonder.id);
        },
        handleDeleteClicked() {
            this.$emit("deletePlayerScore", this.playerScore.wonder.id);
        },
    },
};
</script>

<style scoped>
.root {
    width: 100%;
    position: relative;
    padding: 0mm;
    margin: 0mm;
    margin-bottom: 2mm;
}

.wonder-img {
    width: 100%;
    overflow: hidden;
    margin: 0mm;
}

.wonder-lbl {
    width: 100%;
    max-width: 160mm;
    position: absolute;
    top: 0mm;
    margin: 0mm;
    padding-top: 2mm;
    padding-bottom: 2mm;
    color: white;
    background: #00000040;
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
    bottom: 3mm;
}

td {
    border-style: none;
    border-right-style: solid;
    border-left-style: solid;
    border-color: grey;
}

.point-container {
    justify-content: center;
    justify-items: center;
    font-size: 3mm;
}

.close_btn {
    position: absolute;
    justify-content: center;
    margin-top: 2mm;
    right: 3mm;
    top: 1mm;
    height: 4mm;
    width: 4mm;
    text-shadow: 0px 0px 10px gray;
}
</style>
