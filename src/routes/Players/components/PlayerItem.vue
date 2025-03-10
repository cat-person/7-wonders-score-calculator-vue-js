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
        console.debug(`Player.data: ${JSON.stringify(this.playerScore)}`)
        return {
            wonders: wonders,
            playerScore: this.playerScore,
            colors: colors,
            pointsByCategory: {
                wonder: 32,
                gold: 12,
                military: 6,
            }
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
            return new URL(`../../../assets/wonders/${wonder.img}`, import.meta.url)
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
                    points: playerScore.militaryPoints
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
        handleEditClicked() {
            console.error(`handleEditClicked()`)
            this.$emit("editPlayer", this.playerScore.wonder.id)
        },
        handleDeleteClicked() {
            console.error(`deletePlayer()`)
            this.$emit("deletePlayerScore", this.playerScore.wonder.id)
        }
    }
}
</script>

<template>
    <div class='root'>
    
        <h3 class="wonder-lbl">
            {{ getWonderById(playerScore.wonder.id).name }} ({{ playerScore.wonder.side }}): {{ playerScore.name }}
        </h3>
        <img class="close_btn" src="../../../assets/icon_remove_2.svg" @click="handleDeleteClicked(playerScore)" />
        <tbody class="table">
            <td class="point-container" :style="{ 'background-color': scoreItem.color, 'width': '14%' }" v-for="scoreItem in getPointsByCategory(playerScore)" :key="scoreItem.name">
                <tr>{{ scoreItem.name }}</tr>
                <tr>{{ scoreItem.points }}</tr>
            </td>
        </tbody>

        <img
            class='wonder-img'
            @click="handleEditClicked"
            v-bind:src="getImageByWonder(playerScore.wonder.id, playerScore.wonder.side)"/>
    </div>
</template>

<style scoped>

.root {
    width: 100%;
    position: relative;
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