<template>
    <div class="military">
        <h3>Military</h3>
        <div class="epoch_container">
            <button class="battle_button" @click="handleClick('bronze', 'left')">{{ this.battles['bronze.left'] }}</button>
            <p class="epoch"> Bronze: {{ calcBronze(battles['bronze.left'], battles['bronze.right']) }} </p>
            <button class="battle_button" @click="handleClick('bronze', 'right')">{{ this.battles['bronze.right'] }}</button>
        </div>
        <div class="epoch_container">
            <button class="battle_button" @click="handleClick('silver', 'left')">{{ this.battles['silver.left'] }}</button>
            <p class="epoch"> Silver: {{ calcSilver(battles['silver.left'], battles['silver.right']) }} </p>
            <button class="battle_button" @click="handleClick('silver', 'right')">{{ this.battles['silver.right'] }}</button>
        </div>
        <div class="epoch_container">
            <button class="battle_button" @click="handleClick('golden', 'left')">{{ this.battles['golden.left'] }}</button>
            <p class="epoch"> Gold: {{ calcGold(battles['golden.left'], battles['golden.right']) }} </p>
            <button class="battle_button" @click="handleClick('golden', 'right')">{{ this.battles['golden.right'] }}</button>
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
            if(battle == 'Won') {
                return 1
            }
            return 0
        },
        calcBronze(left, right) {
            return 2 * (this.checkVictory(left) + this.checkVictory(right) - 1)
        },
        calcSilver(left, right) {
            return 3 * (this.checkVictory(left) + this.checkVictory(right)) - 2
        },
        calcGold(left, right) {
            return 5 * (this.checkVictory(left) + this.checkVictory(right)) - 2
        },
        
        

        calcMilitary(battles) {
            return this.calcBronze(battles['bronze.left'], battles['bronze.right'])
                + this.calcSilver(battles['silver.left'], battles['silver.right'])
                + this.calcGold(battles['golden.left'], battles['golden.right'])
        },

        handleClick(age, neighbour){
            this.battles[`${age}.${neighbour}`] = this.battles[`${age}.${neighbour}`] === 'Won' ? 'Lost' : 'Won'
            this.$emit("battlesUpdated")
        }
    }
};
</script>
  
<style>
.military {
    background-color: firebrick;
    justify-self: center;
    width: 130mm;
    padding-bottom: 4mm;
    padding-top: 1mm;
    margin-bottom: 3mm;
}
.epoch_container {
    height: 6mm;
    display: flex;
    flex-direction: row;
    justify-items: center;
    justify-content: center;
}
.battle_button {
    margin: 0;
    height: 6mm;
    width: 12mm;
}
.epoch {
    margin: 0;
    height: 6mm;
    width: 40mm;
    text-align: center;
}
</style>