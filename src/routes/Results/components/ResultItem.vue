<script>
import wonders from '@/assets/wonders.json'
import colors from '@/assets/colors.json'
import * as util from '@/utils/calc';

const url = 'https://vuejs.org/images/logo.png'

export default {
    props: {
        playerScore: Object,
    },

    data() {
        console.error(`Player.data: ${JSON.stringify(this.playerScore)}`)
        return {
            wonders: wonders,
            playerScore: this.playerScore,
            colors: colors,
        }
    },
    methods: {
        getWonderById(wonderId) {
            let result = undefined
            this.wonders.forEach((wonder) => {
                if (wonder.id == wonderId) {
                    result = wonder
                }
            })
            return result
        },

        getWonderByIdAndSide(wonderId, side) {
            let wonder = this.getWonderById(wonderId)
            if (side == 'A') {
                return wonder.A
            } else {
                return wonder.B
            }

        },
        getImageByWonder(wonderId, side) {
            let wonder = this.getWonderByIdAndSide(wonderId, side)
            return new URL(`../../../assets/${wonder.img}`, import.meta.url)
        },

        getPointsByCategory(playerScore) {
            return [
                {
                    name: 'wonder',
                    color: colors.wonder,
                    points: util.calcWonderPoints(playerScore.wonder)
                },
                {
                    name: 'gold',
                    color: colors.coins,
                    points: util.calcCoinPoints(playerScore.coinCount)
                },
                {
                    name: 'military',
                    color: colors.military,
                    points: util.calcMilitary(playerScore.battles)
                },
                {
                    name: 'culture',
                    color: colors.culture,
                    points: playerScore.culturePoints
                },
                {
                    name: 'trade',
                    color: colors.trade,
                    points: playerScore.tradePoints
                },
                {
                    name: 'science',
                    color: colors.science,
                    points: util.calcSciencePoints(
                        playerScore.science.clayCount,
                        playerScore.science.measurerCount,
                        playerScore.science.cogCount
                    )
                },
                {
                    name: 'guild',
                    color: colors.guild,
                    points: playerScore.guildPoints
                }
            ]
        },

        handleEditClicked(playerScore) {
            // console.error(`Player.handleEditClicked(playerScore: ${JSON.stringify(playerScore)})`)
            this.$emit("editPlayer", playerScore)
        },
        handleDeleteClicked(playerScore) {
            // console.error(`Player.handleDeleteClicked(playerScore: ${JSON.stringify(playerScore)})`)
            this.$emit("deletePlayer", playerScore)
        },
        getOpacity(rank) {
            switch (rank) {
                case 1:
                case undefined:
                    return 1.0
                case 2: return 0.85
                case 3: return 0.75
                default: return 0.4
            }
        },
        getRankColor(rank) {
            switch (rank) {
                case 1: return 'gold'
                case 2: return 'silver'
                case 3: return 'rosybrown'
                default: return 'white'
            }
        }
    }
}
</script>

<template>
    <div class='img' :style="{
        'position': 'relative',
        'background-image': 'url(' + getImageByWonder(playerScore.wonder.id, playerScore.wonder.side) + ')',
        'background-size': 'cover',
        'background-repeat': 'no-repeat',
        'justify-items': 'center',
        'padding': '0mm',
        'width': '80mm',
        'height': '50mm',
        'margin-bottom': '3mm'
    }">

        <h1 class="final_points_lbl" v-if="playerScore.finalPoints">{{ playerScore.finalPoints }}</h1>

        <h3 class="wonder-lbl"> {{ getWonderById(playerScore.wonder.id).name }} ({{ playerScore.wonder.side }}):
            {{ playerScore.name }}</h3>

        <tbody class="table" @click="handleEditClicked(playerScore)">
            <td v-for="scoreItem in getPointsByCategory(playerScore)" :key="scoreItem.name">
                <div class="point-container" :style="{ 'background-color': scoreItem.color }">
                    <tr>{{ scoreItem.name }}</tr>
                    <tr>{{ scoreItem.points }}</tr>
                </div>
            </td>
        </tbody>
    </div>
</template>

<style scoped>
.table {
    position: absolute;
    vertical-align: bottom;
    align-self: center;
    justify-items: center;
    width: 100%;
    bottom: 2mm;
}

.wonder-lbl {
    width: 100%;
    position: absolute;
    margin-top: 2mm;
    color: white;
    text-shadow: 0px 0px 10px gray;
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

.point-container {
    position: relative;
    justify-content: center;
    justify-items: center;
    width: 20mm;
}

.final_points_lbl {
    position: absolute;
    width: 80mm;
    margin-top: 16mm;
    color: white;
    text-shadow: 0px 0px 10px gray;
}
</style>