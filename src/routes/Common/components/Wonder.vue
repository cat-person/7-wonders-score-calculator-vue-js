<script>
import wonders from "@/assets/wonders.json";

function getAvailableWonders(availableWonderIds) {
    return wonders.filter((wonder) =>
        availableWonderIds.some(
            (availableWonderId) => availableWonderId == wonder.id,
        ),
    );
}

export default {
    props: {
        wonder: Object,
    },
    methods: {
        getWonderById(wonderId) {
            let result = undefined;
            wonders.forEach((wonder) => {
                if (wonder.id == wonderId) {
                    result = wonder;
                }
            });
            return result;
        },
        getWonder(wonderId, side) {
            let result = this.getWonderById(wonderId);

            if (side == "A") {
                return result.A;
            } else {
                return result.B;
            }
        },
        getImageByWonder(wonderId, side) {
            let wonder = this.getWonder(wonderId, side);
            return new URL(
                `../../../assets/wonders/${wonder.img}`,
                import.meta.url,
            );
        },
        selectWonder(emblaApi) {
            this.$emit(
                "onWonderSelected",
                getAvailableWonders(this.availableWonderIds)[
                    emblaApi.selectedScrollSnap()
                ].id,
            );
        },
        handleChangeSide() {
            this.$emit("onSideChanged", this.wonder.side == "A" ? "B" : "A");
        },
        onChecked(event) {
            let id = parseInt(event.srcElement.id);
            let selectedStage = 0;
            if (event.srcElement.checked) {
                selectedStage = id;
            } else {
                selectedStage = id - 1;
            }
            this.$emit("onStageBuilt", selectedStage);
        },
        calcWonderPoints() {
            let result = 0;
            let pointsByStage = this.getWonder(
                this.wonder.id,
                this.wonder.side,
            ).pointsByStages;
            for (let idx = 0; idx < pointsByStage.length; idx++) {
                if (idx < this.wonder.stageBuilt) {
                    result += pointsByStage[idx];
                }
            }
            return result;
        },
    },
};
</script>

<template>
    <div class="container">
        <div class="stage_container">
            <div class="points_by_stage">
                <div
                    v-for="(pointsByStage, stageIdx) in getWonder(
                        wonder.id,
                        wonder.side,
                    ).pointsByStages"
                >
                    <p class="points_by_stage_lbl">{{ pointsByStage }}</p>
                    <input
                        type="checkbox"
                        class="points_by_stage_checkbox"
                        :checked="stageIdx < wonder.stageBuilt"
                        :id="stageIdx + 1"
                        @change="onChecked($event)"
                    />
                </div>
            </div>
            <p class="wonder_points">Wonder points: {{ calcWonderPoints() }}</p>
        </div>
        <h3 class="wonder_name">{{ getWonderById(wonder.id).name }}</h3>
        <button class="btn" @click="handleChangeSide">{{ wonder.side }}</button>
        <img
            class="img"
            v-bind:src="getImageByWonder(wonder.id, wonder.side)"
        />
    </div>
</template>

<style>
.container {
    position: relative;
    width: 100%;
    margin: 0mm;
    padding: 0mm;
    margin-top: -3mm;
}
.wonder_name {
    position: absolute;
    top: 0mm;
    width: 100%;
    color: white;
    text-shadow: 0px 0px 10px gray;
}
.img {
    width: 100%;
    margin: 0mm;
}
.btn {
    margin: 2mm;
    margin-top: 5mm;
    position: absolute;
}
.stage_container {
    position: absolute;
    display: flex;
    width: 100%;
    flex-direction: column;
    bottom: 7mm;
    /* width: 100%; */
    margin: 0mm;
    background-color: #00000040;
}
.points_by_stage {
    margin: 0mm;
    display: flex;
    flex-direction: row;
    justify-self: center;
    justify-content: center;
}
.points_by_stage_checkbox {
    width: 6mm;
    height: 6mm;
    color: white;
    text-shadow: 0px 0px 10px gray;
}
.points_by_stage_lbl {
    margin: 0mm;
    color: white;
    text-shadow: 0px 0px 10px gray;
}
.wonder_points {
    margin: 0mm;
    bottom: 4mm;
    color: white;
    text-shadow: 0px 0px 10px gray;
}
</style>
