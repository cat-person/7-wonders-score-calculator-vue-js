<template>
    <div class="pointInput">
        <button
            class="pointsChangeBtn"
            @click="() => handleMilitaryPointsChanged(-1)"
        >
            -
        </button>
        <h3 class="pointTxt">Military points: {{ militaryPoints }}</h3>
        <button
            class="pointsChangeBtn"
            @click="() => handleMilitaryPointsChanged(1)"
        >
            +
        </button>
    </div>
</template>

<script>
export default {
    props: {
        category: String,
        color: String,
        min: Number,
        max: Number,
        points: Number,
    },
    data() {
        return {
            data: {
                currentPoints: this.points,
            },
        };
    },
    methods: {
        handleMilitaryPointsChanged(valueToAdd) {
            this.data = Math.min(
                Math.max(this.currentPoints + valueToAdd, -6),
                18,
            );
            this.$emit("militaryPointsUpdated", this.currentPoints);
        },
    },
};
</script>

<style>
.pointTxt {
    padding-bottom: 0mm;
    margin-top: 2mm;
    margin-bottom: 0mm;
    margin-left: 3mm;
    margin-right: 3mm;
    justify-content: center;
    width: 50mm;
}
.pointInput {
    display: flex;
    flex-direction: row;
    width: 96%;
    justify-self: center;
    justify-content: center;
    padding-bottom: 3mm;
    padding-top: 3mm;
    margin-bottom: 3mm;
    background-color: firebrick;
}
.pointsChangeBtn {
    width: 8mm;
    height: 8mm;
    font-size: 4mm;
    margin: 1mm;
    justify-content: center;
}
</style>
