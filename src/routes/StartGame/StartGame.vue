<template>
    <div class="root">
        <TopBar
            :showClose="false"
            :title="'Welcome to unofficial 7 wonders points calculator'"
        />

        <StartGameItem
            class="add_player_btn"
            @startNewGame="handleStartNewGame"
        />
    </div>
</template>

<script>
import wonders from "@/assets/wonders.json";
// import {getPlayerScoreByWonderId} from '@/utils/remote'

import StartGameItem from "./components/StartGameItem.vue";
import TopBar from "../Common/components/TopBar.vue";

export default {
    data() {
        return {
            playerScoreData: this.playerScores,
            wonders: wonders,
        };
    },
    props: {
        playerScores: Array,
    },
    components: {
        TopBar,
        StartGameItem,
    },
    methods: {
        handleStartNewGame(sessionId) {
            this.$router.push(`/${sessionId}/add`);
        },
    },
};
</script>

<style scoped>
.root {
    margin: 0mm;
    padding: 3mm;
}
.add_player_btn {
    margin: 0mm;
}
</style>
