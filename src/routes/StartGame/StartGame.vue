<template>
    <div>
        <TopBar :showClose="false" :title="$t('titles.start')" />

        <StartGameItem class="new_session" @startNewGame="handleStartNewGame" />
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
.new_session {
    margin: 0mm;
}
</style>
