<template>
    <div id="Coins amount" class="coins">
        <div class="horizontal">
            <button
                class="pointsChangeBtn"
                v-longpress="() => handleCoinValueChanged(-1)"
                @click="() => handleCoinValueChanged(-1)"
            >
                -
            </button>
            <h3 class="pointTxt">Coin value: {{ coinValue }}</h3>
            <button
                class="pointsChangeBtn"
                v-longpress="() => handleCoinValueChanged(1)"
                @click="() => handleCoinValueChanged(1)"
            >
                +
            </button>
        </div>
        <p class="points">
            Points for coins: {{ this.calcPoints(this.coinValue) }}
        </p>
    </div>
</template>

<script>
export default {
    props: {
        coinValue: Number,
    },
    methods: {
        calcPoints(coinValue) {
            return Math.floor(coinValue / 3);
        },
        handleCoinValueChanged(valueToAdd) {
            const min = 0;
            const max = 100;

            this.$emit(
                "coinValueChanged",
                Math.min(Math.max(this.coinValue + valueToAdd, min), max),
            );
        },
    },
};
</script>

<style>
.pointsChangeBtn {
    width: 8mm;
    height: 8mm;
    font-size: 4mm;
    margin: 1mm;
    justify-content: center;
    text-align: center;
}
.coins {
    background-color: white;
    border-style: solid;
    border-width: 1mm;
    border-radius: 1mm;
    border-color: silver;
    justify-self: center;
    width: 96%;
    padding-top: 3mm;
    padding-bottom: 3mm;
    margin-bottom: 3mm;
}

.horizontal {
    display: flex;
    flex-direction: row;
    width: 96%;
    justify-self: center;
    justify-content: center;
    margin-bottom: 3mm;
}
.points {
    margin: 0mm;
    padding: 0mm;
}
</style>
