<template>
    <div>
        <TopBar
            :title="getTitle()"
            :showQR="true"
            @handleIconClick="handleTopBarIconClicked"
        />

        <div class="players_container" v-for="playerScore in playerScores">
            <PlayerItem
                :playerScore="playerScore"
                @editPlayer="handleEditPlayer($event)"
                @deletePlayerScore="handleDeletePlayerScore($event)"
            />
        </div>

        <AddPlayerItem
            v-if="!playerScores || playerScores.length < 7"
            class="add_player_btn"
            @addPlayer="handleAddPlayer"
        />

        <button
            v-if="calculateResultsShown(playerScores)"
            class="button"
            @click="handleCalculateResultsClicked"
        >
            {{ $t("buttons.calculateResults") }}
        </button>
    </div>
</template>

<script>
import wonders from "@/assets/wonders.json";
import PlayerItem from "./components/PlayerItem.vue";
import AddPlayerItem from "./components/AddPlayerItem.vue";
import TopBar from "../Common/components/TopBar.vue";

import {
    getPlayerScores,
    getPlayerScoresCached,
    deletePlayerScore,
} from "@/utils/remote";

export default {
    data() {
        return {
            playerScores: [],
            sessionId: this.$route.params.session_id,
            wonders: wonders,
            shareUrl: `${window.location.origin}/#${this.$route.fullPath}`,
        };
    },
    mounted: function () {
        this.getPlayerScores();
    },
    components: {
        TopBar,
        PlayerItem,
        AddPlayerItem,
    },
    methods: {
        async getPlayerScores() {
            this.playerScores = getPlayerScoresCached();
            this.playerScores = await getPlayerScores(
                this.$route.params.session_id,
            );
        },
        getTitle() {
            if (!this.playerScores || this.playerScores.length == 0) {
                return this.$t("titles.playersNone");
            } else {
                return this.$t("titles.players");
            }
        },
        handleClosedClicked() {
            this.$emit("close");
        },
        handleAddPlayer() {
            this.$router.push(`/${this.$route.params.session_id}/add`);
        },
        startNewGame() {
            this.$emit("startNewGame");
        },
        handleCalculateResultsClicked() {
            this.$router.push(`/${this.sessionId}/results`);
        },
        handleEditPlayer(wonderId) {
            this.$router.push(`/${this.sessionId}/edit/${wonderId}`);
        },
        async handleDeletePlayerScore(wonderId) {
            await deletePlayerScore(this.sessionId, wonderId);
            this.playerScores = await getPlayerScores(
                this.$route.params.session_id,
            );
        },
        calculateResultsShown(playerScores) {
            return playerScores && 2 < playerScores.length;
        },
        handleTopBarIconClicked(icon) {
            if (icon == "qr") {
                // this.$route;
            }
        },
    },
};
</script>

<style scoped>
.players_container {
    margin: 0mm;
    justify-self: center;
    justify-items: center;
}
.add_player_btn {
    margin: 0mm;
}
.button {
    margin-top: 12mm;
    width: 50mm;
    height: 8mm;
}
</style>
