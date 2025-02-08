<template>
  <div class="game-body" style="margin-top: -5%;">
    <h2 class="game-status">{{ gameStatus }}</h2><br>
    <ScoreDisplay :score="score" gameName="TicTacToe" style="margin-top: 0%;"></ScoreDisplay><br/>
    <game-board :tics="tics" :OnHandleClick="OnClicked"></game-board><br>
    <button id="buttonRes" v-if="isResetEnabled" @click="reset">Reset</button>
    <button id="buttonToggle" @click="toggleSymbols">Toggle Symbols</button>
  </div>
</template>

<script>
import GameBoard from "./TicTacBoard.vue";
import ScoreDisplay from "../Score.vue";
import { addHighScore, getCurrentUser } from '@/auth'

export default {
  name: "TicTacGame",
  components: {
    GameBoard,
    ScoreDisplay
  },
  data() {
    return {
      winner: null,
      isPlayerX: true,
      tics: Array(9).fill(""),
      score: 0,
      useEmojis: false
    };
  },
  computed: {
    gameStatus() {
      if (this.winner) {
        return "Winner is " + this.winner;
      }
      return this.isPlayerX ? `Next Player: ${this.currentX}` : `Next Player: ${this.currentO}`;
    },
    isResetEnabled() {
      return this.winner || this.tics.every(tic => tic);
    },
    currentX() {
      return this.useEmojis ? "🔥" : "X";
    },
    currentO() {
      return this.useEmojis ? "❄️" : "O";
    }
  },
  methods: {
    calculateWinner() {
      const lines = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ];
      for (const [a, b, c] of lines) {
        if (this.tics[a] && this.tics[a] === this.tics[b] && this.tics[b] === this.tics[c]) {
          this.winner = this.tics[a];
          if (this.tics[a] === this.currentX) {
            this.score++;
          } else {
            this.save();
          }
          return;
        }
      }
    },
    save() {
      const currentUser = getCurrentUser();
      addHighScore("TicTacToe", currentUser.username, this.score);
      this.score = 0;
    },
    OnClicked(i) {
      if (this.winner || this.tics[i]) {
        return;
      }
      this.tics[i] = this.isPlayerX ? this.currentX : this.currentO;
      this.isPlayerX = !this.isPlayerX;
      this.calculateWinner();
    },
    reset() {
      this.tics.fill("");
      this.winner = null;
    },
    toggleSymbols() {
      this.useEmojis = !this.useEmojis;
      this.tics = this.tics.map(tic => {
        if (tic === "X") return "🔥";
        if (tic === "O") return "❄️";
        if (tic === "🔥") return "X";
        if (tic === "❄️") return "O";
        return tic;
      });
    }
  },
  unmounted(){
    this.save();
  }
};
</script>

<style>
#buttonRes, #buttonToggle {
  display: inline-block;
  padding: 10px 20px;
  margin-bottom: 10px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #FF7F50;
  border-radius: 5px;
  color: #FF7F50;
  background-color: white;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

#buttonRes:hover, #buttonToggle:hover {
  background-color: #FF7F50;
  color: white;
  border-color: #ffffff;
}
</style>