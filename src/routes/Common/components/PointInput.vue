<template>
    <div :style="this.getStyle(color)">
        <button
            class="pointsChangeBtn"
            v-longpress="() => handlePointsChanged(-1)"
            @click="() => handlePointsChanged(-1)"
        >
            -
        </button>
        <h3 class="pointTxt">
            {{
                $t("components.points.points", {
                    category,
                    points,
                })
            }}
        </h3>
        <button
            class="pointsChangeBtn"
            @click="() => handlePointsChanged(1)"
            v-longpress="() => handlePointsChanged(1)"
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
            currentPoints: this.points,
        };
    },
    methods: {
        handlePointsChanged(valueToAdd) {
            const min = this.min ? this.min : 0;
            const max = this.max ? this.max : 100;

            this.$emit(
                "pointsUpdated",
                Math.min(Math.max(this.points + valueToAdd, min), max),
            );
        },
        longPressDetected() {
            alert("longPressDetected");
        },
        getStyle(color) {
            return {
                display: "flex",
                flexDirection: "row",
                width: "96%",
                justifySelf: "center",
                justifyContent: "center",
                paddingBottom: "3mm",
                paddingTop: "3mm",
                marginBottom: "3mm",
                backgroundColor: "white",
                borderStyle: "solid",
                borderWidth: "1mm",
                borderColor: color,
                borderRadius: "1mm",
            };
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
    text-align: center;
}
</style>
