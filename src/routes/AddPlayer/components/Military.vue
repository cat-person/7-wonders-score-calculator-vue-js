<template>
    <div class="military">
        <h3>Military</h3>
        <div>
            <button @click="handleClick('bronze', 'left')">{{ this.battles['bronze.left'] }}</button>
            Bronze
            <button @click="handleClick('bronze', 'right')">{{ this.battles['bronze.right'] }}</button>
        </div>
        <div>
            <button @click="handleClick('silver', 'left')">{{ this.battles['silver.left'] }}</button>
            Silver
            <button @click="handleClick('silver', 'right')">{{ this.battles['silver.right'] }}</button>
        </div>
        <div>
            <button @click="handleClick('golden', 'left')">{{ this.battles['golden.left'] }}</button>
            Gold
            <button @click="handleClick('golden', 'right')">{{ this.battles['golden.right'] }}</button>
        </div>
        <p>Military points: {{ calcMilitary(this.battles) }}</p>
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
        calcMilitary(battles) {
            var result = -6

            if(battles['bronze.left'] === 'Won') {
                result += 2
            }
            if(battles['bronze.right'] === 'Won') {
                result += 2
            }
            if(battles['silver.left'] === 'Won') {
                result += 4
            }
            if(battles['silver.right'] === 'Won') {
                result += 4
            }
            if(battles['golden.left'] === 'Won') {
                result += 6
            }
            if(battles['golden.right'] === 'Won') {
                result += 6
            }

            return result
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
</style>