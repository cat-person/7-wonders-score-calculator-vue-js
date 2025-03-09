<script>
import { getSessionId } from '@/utils/sessions'

export default {
    methods: {
        handleStartNewGameClicked(event) {
            const seed = event.screenX * event.screenY * (new Date()).getMilliseconds()
            this.$emit("startNewGame", getSessionId(seed))
        }
    }
}
</script>

<template>
    <div class="start_new_game_container" @click="handleStartNewGameClicked">
        <!-- <img class="add_btn" src="@/assets/icon_plus.svg" /> -->
        <p class="start_new_game_lbl">Start New Game</p>
    </div>
</template>

<style scoped>
.start_new_game_container {
    width: 100%;
    max-width: 159mm ;
    height: 39mm;
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