<template>
    <div class="military">
        <h3>Military</h3>
        <div class="horizontal">
            <div class="epoch_container">
                <p class="epoch"> Epoch I: {{ calcBattlePoints('I', battles['bronze.left']) + calcBattlePoints('I', battles['bronze.right']) }} </p>
                <div class="battle_container">
                    <input class="battle_button" type="image" :src="getImage('I', this.battles['bronze.left'])"
                        @click="handleClick('bronze', 'left')" />
                    <input class="battle_button" type="image" :src="getImage('I', this.battles['bronze.right'])"
                        @click="handleClick('bronze', 'right')" />
                </div>
            </div>
            <div class="epoch_container">
                <p class="epoch"> Epoch II: {{ calcBattlePoints('II', battles['silver.left']) + calcBattlePoints('II', battles['silver.right']) }} </p>
                <div class="battle_container">
                    <input class="battle_button" type="image" :src="getImage('II', this.battles['silver.left'])"
                        @click="handleClick('silver', 'left')" />
                    <input class="battle_button" type="image" :src="getImage('II', this.battles['silver.right'])"
                        @click="handleClick('silver', 'right')" />
                </div>
            </div>
            <div class="epoch_container">
                <p class="epoch"> Epoch III: {{ calcBattlePoints('III', battles['golden.left']) + calcBattlePoints('III', battles['golden.right']) }} </p>
                <div class="battle_container">
                    <input class="battle_button" type="image" :src="getImage('III', this.battles['golden.left'])"
                        @click="handleClick('golden', 'left')" />
                    <input class="battle_button" type="image" :src="getImage('III', this.battles['golden.right'])"
                        @click="handleClick('golden', 'right')" />
                </div>
            </div>

        </div>
        <p>Total military points: {{ calcMilitary(this.battles) }}</p>
    </div>
</template>

<script>
import * as util from '@/utils/calc';

export default {
    props: {
        battles: Object
    },
    methods: {
        getImage(epoch, battleResult) {
            switch (battleResult) {
                case 'defeat': return new URL('@/assets/icon_defeat.png', import.meta.url) 
                case 'draw': return new URL('@/assets/icon_draw.png', import.meta.url) 
                default: switch (epoch) {
                    case 'III':
                        return new URL('@/assets/icon_victory_5.png', import.meta.url) 
                    case 'II':
                        return new URL('@/assets/icon_victory_3.png', import.meta.url)
                    default:
                        return new URL('@/assets/icon_victory_1.png', import.meta.url)
                }
            }
        },
        calcMilitary(battles) {
            return util.calcMilitary(battles)
        },
        nextResult(result) {
            console.error(`Military.nextResult(${result})`)
            switch (result) {
                case 'draw': return 'victory' 
                case 'victory': return 'defeat'
                default: return 'draw'
             }
        },   
        handleClick(age, neighbour) {
            this.battles[`${age}.${neighbour}`] = this.nextResult(this.battles[`${age}.${neighbour}`])
        },
        calcBattlePoints(epoch, battleResult) {
            return util.calcBattlePoints(epoch, battleResult)
        }
    }
};
</script>

<style>
.horizontal {
    display: flex;
    flex-direction: row;
}

.military {
    background-color: firebrick;
    justify-self: center;
    width: 130mm;
    padding-bottom: 4mm;
    padding-top: 1mm;
    margin-bottom: 3mm;
}

.epoch_container {
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
}

.battle_container {
    height: 18mm;
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
}

.battle_button {
    margin: 1mm;
    height: 16mm;
    width: 16mm;
}

.epoch {
    margin: 0;
    height: 6mm;
    width: 40mm;
    text-align: center;
}
</style>