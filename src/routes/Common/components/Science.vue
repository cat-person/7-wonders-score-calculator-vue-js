<template>
    <div class="science">
        <h3>
            {{
                $t("components.science.points", {
                    points: calcSciencePoints(
                        scienceData.clayCount,
                        scienceData.measurerCount,
                        scienceData.cogCount,
                    ),
                })
            }}
        </h3>
        <div class="horizontal">
            <div class="item">
                <button
                    class="pointsChangeBtn"
                    @click="() => handleClayCountChanged(-1)"
                    v-longpress="() => handleClayCountChanged(-1)"
                >
                    -
                </button>
                <div class="vertical">
                    <img
                        src="../../../assets/science_icons/clay.png"
                        class="science_icon"
                    />
                    <h3 class="sciencePoints">{{ scienceData.clayCount }}</h3>
                </div>
                <button
                    class="pointsChangeBtn"
                    @click="() => handleClayCountChanged(+1)"
                    v-longpress="() => handleClayCountChanged(+1)"
                >
                    +
                </button>
            </div>
            <div class="item">
                <button
                    class="pointsChangeBtn"
                    @click="() => handleMeasurerCountChanged(-1)"
                    v-longpress="() => handleMeasurerCountChanged(-1)"
                >
                    -
                </button>
                <div class="vertical">
                    <img
                        src="../../../assets/science_icons/measurer.png"
                        class="science_icon"
                    />
                    <h3 class="sciencePoints">
                        {{ scienceData.measurerCount }}
                    </h3>
                </div>
                <button
                    class="pointsChangeBtn"
                    @click="() => handleMeasurerCountChanged(+1)"
                    v-longpress="() => handleMeasurerCountChanged(+1)"
                >
                    +
                </button>
            </div>
            <div class="item">
                <button
                    class="pointsChangeBtn"
                    @click="() => handleCogCountChanged(-1)"
                    v-longpress="() => handleCogCountChanged(-1)"
                >
                    -
                </button>
                <div class="vertical">
                    <img
                        src="../../../assets/science_icons/cog.png"
                        class="science_icon"
                    />
                    <h3 class="sciencePoints">{{ scienceData.cogCount }}</h3>
                </div>
                <button
                    class="pointsChangeBtn"
                    @click="() => handleCogCountChanged(+1)"
                    v-longpress="() => handleCogCountChanged(+1)"
                >
                    +
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        science: Object,
    },
    data() {
        return {
            scienceData: this.science,
        };
    },
    methods: {
        calcSciencePoints(clayCount, measurerCount, cogCount) {
            return (
                clayCount * clayCount +
                measurerCount * measurerCount +
                cogCount * cogCount +
                7 * Math.min.apply(Math, [clayCount, measurerCount, cogCount])
            );
        },
        handleClayCountChanged(valueToAdd) {
            const min = 0;
            const max = 10;
            this.scienceData.clayCount = Math.min(
                Math.max(this.scienceData.clayCount + valueToAdd, min),
                max,
            );

            this.$emit("scienceUpdated", this.scienceData);
        },
        handleMeasurerCountChanged(valueToAdd) {
            const min = 0;
            const max = 10;
            this.scienceData.measurerCount = Math.min(
                Math.max(this.scienceData.measurerCount + valueToAdd, min),
                max,
            );

            this.$emit("scienceUpdated", this.scienceData);
        },
        handleCogCountChanged(valueToAdd) {
            const min = 0;
            const max = 10;
            this.scienceData.cogCount = Math.min(
                Math.max(this.scienceData.cogCount + valueToAdd, min),
                max,
            );

            this.$emit("scienceUpdated", this.scienceData);
        },
    },
};
</script>

<style>
.science {
    background-color: white;
    border-style: solid;
    border-width: 1mm;
    border-color: cadetblue;
    border-radius: 1mm;
    justify-self: center;
    width: 96%;
    padding-bottom: 3mm;
    padding-top: 3mm;
    margin-bottom: 3mm;
}

.horizontal {
    display: flex;
    justify-content: center;
    flex-direction: row;
}

.item {
    display: flex;
    justify-content: center;
    flex-direction: row;
    margin-left: 2mm;
    margin-right: 2mm;
}

.sciencePoints {
    margin: 0mm;
}

.vertical {
    display: flex;
    justify-content: center;
    flex-direction: column;
}

.science_icon {
    align-self: center;
    width: 10mm;
    height: 10mm;
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
