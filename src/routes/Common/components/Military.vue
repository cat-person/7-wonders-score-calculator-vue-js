<template>
    <div id="Military" class="military">
        <button
            class="pointsChangeBtn"
            @click="() => handleMilitaryPointsChanged(-5)"
        >
            -5
        </button>
        <button
            class="pointsChangeBtn"
            @click="() => handleMilitaryPointsChanged(-1)"
        >
            -1
        </button>
        <h3 class="pointTxt">Military points: {{ militaryPoints }}</h3>
        <button
            class="pointsChangeBtn"
            @click="() => handleMilitaryPointsChanged(1)"
        >
            +1
        </button>
        <button
            class="pointsChangeBtn"
            @click="() => handleMilitaryPointsChanged(5)"
        >
            +5
        </button>
    </div>
</template>

<script>
export default {
    props: {
        points: Number,
    },
    data() {
        return {
            militaryPoints: this.points,
        };
    },
    methods: {
        handleMilitaryPointsChanged(valueToAdd) {
            this.militaryPoints = Math.min(
                Math.max(this.militaryPoints + valueToAdd, -6),
                18,
            );
            this.$emit("militaryPointsUpdated", this.militaryPoints);
        },
        handleMilitaryPointsInput() {
            if (this.militaryPoints) {
                this.$emit("militaryPointsUpdated", this.militaryPoints);
            } else {
                this.$emit("militaryPointsUpdated", 0);
            }
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
.military {
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
    margin: 1mm;
    justify-content: center;
}
</style>
