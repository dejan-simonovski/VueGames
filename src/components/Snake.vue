<template>
  <div class="game">
    <ScoreDisplay :score="score" gameName="Snake" ></ScoreDisplay><br>
    <Snake :speed="speed" :borders="borders" @onAppleEaten="increaseScore()" @snakeDied="save()"></Snake>
  </div>
</template>

<script>
import Snake from './SnakeComponents/SnakeGame.vue';
import ScoreDisplay from './Score.vue';
import { addHighScore, getCurrentUser } from '@/auth'

export default {
  name: 'SnakeGame',
  components: {
    Snake,
    ScoreDisplay
  },
  methods: {
    increaseScore() {
      this.score++;
    },
    save() {
      const currentUser = getCurrentUser();
      addHighScore("Snake", currentUser.username, this.score);
      this.score = 0;
    },
  },
  data() {
    return {
      score: 0,
    };
  }
};
</script>

<style>
html,body {
  padding: 0 !important;
  margin: 0 !important;
  /* height: 100vh; */
}

.game {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>