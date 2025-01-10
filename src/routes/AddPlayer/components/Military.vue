<template>
    <div class="military">
        <h3>Military</h3>
        <div class="horizontal">
            <div class="epoch_container">
                <p class="epoch"> Epoch I: {{ calcBronze(battles['bronze.left'], battles['bronze.right']) }} </p>
                <div class="battle_container">
                    <input class="battle_button" type="image" :src="getImage('bronze', this.battles['bronze.left'])"
                        @click="handleClick('bronze', 'left')" />
                    <input class="battle_button" type="image" :src="getImage('bronze', this.battles['bronze.right'])"
                        @click="handleClick('bronze', 'right')" />
                </div>
            </div>
            <div class="epoch_container">
                <p class="epoch"> Epoch II: {{ calcSilver(battles['silver.left'], battles['silver.right']) }} </p>
                <div class="battle_container">
                    <input class="battle_button" type="image" :src="getImage('silver', this.battles['silver.left'])"
                        @click="handleClick('silver', 'left')" />
                    <input class="battle_button" type="image" :src="getImage('silver', this.battles['silver.right'])"
                        @click="handleClick('silver', 'right')" />
                </div>
            </div>
            <div class="epoch_container">
                <p class="epoch"> Epoch III: {{ calcGold(battles['golden.left'], battles['golden.right']) }} </p>
                <div class="battle_container">
                    <input class="battle_button" type="image" :src="getImage('golden', this.battles['golden.left'])"
                        @click="handleClick('golden', 'left')" />
                    <input class="battle_button" type="image" :src="getImage('golden', this.battles['golden.right'])"
                        @click="handleClick('golden', 'right')" />
                </div>
            </div>

        </div>
        <p>Total military points: {{ calcMilitary(this.battles) }}</p>
    </div>
</template>

<script>
export default {
    props: {
        battles: Object
    },
    data() {
        console.error(`Military.battles: ${JSON.stringify(this.battles)}`)
        return {
            battles: this.battles
        }
    },
    methods: {
        checkVictory(battle) {
            if (battle == 'Won') {
                return 1
            }
            return 0
        },
        calcBronze(left, right) {
            return 2 * (this.checkVictory(left) + this.checkVictory(right) - 1)
        },
        calcSilver(left, right) {
            return 4 * (this.checkVictory(left) + this.checkVictory(right)) - 2
        },
        calcGold(left, right) {
            return 6 * (this.checkVictory(left) + this.checkVictory(right)) - 2
        },
        getImage(epoch, battleResult) {
            if (battleResult == 'Won') {
                switch (epoch) {
                    case 'golden':
                        return new URL('@/assets/icon_victory_5.png', import.meta.url) 
                    case 'silver':
                        return new URL('@/assets/icon_victory_3.png', import.meta.url)
                    default:
                        return new URL('@/assets/icon_victory_1.png', import.meta.url)
                }
            } else {
                return new URL("@/assets/icon_defeat.png", import.meta.url)
            }
        },
        calcMilitary(battles) {
            return this.calcBronze(battles['bronze.left'], battles['bronze.right'])
                + this.calcSilver(battles['silver.left'], battles['silver.right'])
                + this.calcGold(battles['golden.left'], battles['golden.right'])
        },

        handleClick(age, neighbour) {
            this.battles[`${age}.${neighbour}`] = this.battles[`${age}.${neighbour}`] === 'Won' ? 'Lost' : 'Won'
            this.$emit("battlesUpdated")
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