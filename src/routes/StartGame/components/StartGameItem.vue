<script>
import { getPseudoRandom } from "@/utils/sessions";

export default {
    methods: {
        handleStartNewGameClicked(event) {
            const seed =
                event.screenX * event.screenY + new Date().getMilliseconds();
            this.$emit("startNewGame", getPseudoRandom(seed, 8));
        },
    },
};
</script>

<template>
    <div class="start_new_game_container" @click="handleStartNewGameClicked">
        <p class="start_new_game_lbl">{{ $t("newSession") }}</p>
    </div>
</template>

<style scoped>
.start_new_game_container {
    width: 100%;
    max-width: 159mm;
    height: 49mm;
    border-color: #606060;
    border-width: 0.5mm;
    border-style: solid;
    justify-items: center;
    justify-self: center;

    justify-content: center;
}

.start_new_game_lbl {
    margin-top: 16mm;
    color: #606060;
}
</style>
