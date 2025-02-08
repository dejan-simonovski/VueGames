<template>
  <ScoreDisplay :score="score" gameName="MemoryGame"></ScoreDisplay><br>
  <div v-if="gameOver">Game Over!</div>
  <div class="card-row" v-for="(row, rowIndex) in Math.ceil(cards.length / 4)" :key="rowIndex">
    <div v-for="(card, colIndex) in cards.slice(rowIndex * 4, (rowIndex + 1) * 4)" :key="colIndex" class="card" :class="{ 'flipped': card.flipped, 'correct': card.matched }" @click="flipCard(rowIndex * 4 + colIndex)">
      {{ card.flipped ? card.value : '' }}
    </div>
  </div>
  <button id="buttonRes" @click="restart">Restart Game</button>
</template>

<script>
import ScoreDisplay from "./Score.vue";
import { addHighScore, getCurrentUser } from '@/auth'

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export default {
  components: {
    ScoreDisplay
  },
  data() {
    return {
      cards: [],
      flippedCards: [],
      gameOver: false,
      values: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
      score: 0
    };
  },
  created() {
    this.initializeGame();
  },
  methods: {
    initializeGame() {
      const doubledValues = this.values.concat(this.values);
      const shuffledValues = shuffleArray(doubledValues);
      this.cards = shuffledValues.map(value => ({
        value,
        flipped: true,
        matched: false,
      }));

      setTimeout(() => {
        this.cards.forEach(card => (card.flipped = false));
      }, 3000);
    },
    flipCard(index) {
      if (!this.cards[index].flipped && this.flippedCards.length < 2) {
        this.cards[index].flipped = true;
        this.flippedCards.push(index);
        if (this.flippedCards.length === 2) {
          setTimeout(this.checkMatch, 1000);
        }
      }
    },
    checkMatch() {
      const [firstIndex, secondIndex] = this.flippedCards;
      if (this.cards[firstIndex].value === this.cards[secondIndex].value) {
        this.cards[firstIndex].matched = true;
        this.cards[secondIndex].matched = true;
        if (this.cards.every(card => card.matched)) {
          this.gameOver = true;
          this.score += 20;
        }
        else {
          this.score += 10;
        }
      } else {
        if(this.score > 0) {
          this.score--;
        }
        this.cards[firstIndex].flipped = false;
        this.cards[secondIndex].flipped = false;
      }
      this.flippedCards = [];
    },
    restart() {
      this.initializeGame();
      this.gameOver = false;
    },
    save() {
        const currentUser = getCurrentUser();
        addHighScore("MemoryGame", currentUser.username, this.score);
        this.score = 0;
    }
  },
  unmounted(){
    this.save();
  }
};
</script>

<style>
.card {
  width: 80px;
  height: 80px;
  background-color: #fd6128;
  margin: 5px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  cursor: pointer;
  transition: 2s;
  border-radius: 15px;
  color: #ffffff;
  font-size: 35px;
  transition: 0.5s;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
}

.card.flipped {
  background-color: #fe946d;
}

.card.correct {
  background-color: limegreen;
}

.card-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#buttonRes {
  display: inline-block;
  padding: 10px 20px;
  margin: 30px 0 30px 0;
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

#buttonRes:hover {
  background-color: #FF7F50;
  color: white;
  border-color: #ffffff;
}
</style>
