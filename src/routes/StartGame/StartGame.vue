<template>
  <div class="root">
    <TopBar 
      :showClose=false
      :title='"Welcome to unofficial 7 wonders points calculator"' />

    <StartGameItem
      class="add_player_btn"
      @startNewGame="handleStartNewGame"/>
      
  </div>
</template>

<script>
  import wonders from '@/assets/wonders.json'
  // import {getPlayerScoreByWonderId} from '@/utils/remote'

  import StartGameItem from './components/StartGameItem.vue';
  import TopBar from '../Common/components/TopBar.vue';

  export default {
    data() {
      console.debug(`Players.data(): { playerScoreData: ${JSON.stringify(this.playerScoreData)} }`)
      return {
        playerScoreData: this.playerScores,
        wonders: wonders,
      };
    },
    props: {
      playerScores: Array
    },
    components: {
      TopBar,
      StartGameItem
    },
    methods: {
      handleStartNewGame(sessionId){
        console.log(`handleStartNewGame ${sessionId}`)
        const route = this.$router.resolve(`/7W/${sessionId}/`);
        const absoluteURL = new URL(route.href, window.location.origin).href;
        window.navigator.clipboard.writeText(absoluteURL)
        this.$toast('Link copied to clipboard')
        this.$toast(absoluteURL);

        this.$router.push(`/7W/${sessionId}/add`)
      }
    }
  }
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