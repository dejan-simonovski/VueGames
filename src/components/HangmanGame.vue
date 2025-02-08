<template>
  <div id="HG">
    <ScoreDisplay :score="score" gameName="Hangman" style="margin-top: 0%;"></ScoreDisplay>
    <div>
      <p>Guess the word:</p>
      <p v-html="displayedWord"></p>
    </div>
    <div>
      <p v-if="!gameOver">Guess a letter or the whole word:</p>
      <input type="text" v-model="input" :disabled="gameOver">
      <button style="margin-left:8px;" @click="guess" :disabled="gameOver">Guess</button><br/><br/>
      <button style="margin-left:8px;" @click="hint" :disabled="gameOver || hintUsed">Get Hint</button>
    </div>
    <div v-if="gameOver">
      <p>You lost! 😢 The word was "{{ word }}".</p>
      <button @click="restartGame">Play Again</button>
    </div>
    <div>
      <p>Already tried letters: {{ triedLetters }}</p>
      <p>Remaining tries: {{ remainingTries }}</p>
    </div>
  </div>
</template>

<script>
import ScoreDisplay from "./Score.vue";
import { addHighScore, getCurrentUser } from '@/auth';

export default {
  components: {
    ScoreDisplay
  },
  data() {
    return {
      word: '',
      guessedLetters: new Set(),
      maxWrongGuesses: 6,
      gameOver: false,
      guessedWords: 0,
      words: ['hangman', 'javascript', 'vue', 'programming', 'computer',
       'elephant', 'pizza', 'guitar', 'sunshine', 'happiness', 'basketball',
        'unicorn', 'oxygen', 'mountain', 'beach', 'umbrella', 'penguin', 'watermelon',
         'chocolate', 'puzzle', 'victory', 'rainbow', 'dragon', 'fireworks', 'moonlight', 
         'butterfly', 'superhero', 'galaxy', 'robot', 'adventure', 'treasure', 'castle', 
         'wizard', 'mermaid', 'narwhal', 'diamond', 'explosion', 'carousel', 'jellyfish', 
         'octopus', 'volcano', 'rocket', 'satellite', 'astronaut'],
      input: '',
      score: 0,
      hintUsed: false
    };
  },
  computed: {
    displayedWord() {
      if (this.gameOver) {
        return this.word;
      } else {
        return this.word
          .split('')
          .map(letter => this.guessedLetters.has(letter) ? letter : '_')
          .join(' ');
      }
    },
    triedLetters() {
      return Array.from(this.guessedLetters).join(', ');
    },
    remainingTries() {
      return this.maxWrongGuesses - this.getWrongGuessesCount();
    }
  },
  mounted() {
    this.startNewGame();
  },
  methods: {
    startNewGame() {
      this.word = this.words[Math.floor(Math.random() * this.words.length)];
      this.guessedLetters.clear();
      this.hintUsed = false;
    },
    save() {
      const currentUser = getCurrentUser();
      addHighScore("Hangman", currentUser.username, this.score);
    },
    guess() {
      const input = this.input.toLowerCase();
      if (input.length === 1) {
        this.guessLetter(input);
      } else if (input.length > 1) {
        this.guessWord(input);
      }
      this.input = '';

      if (this.maxWrongGuesses - this.getWrongGuessesCount() <= 0) {
        this.gameOver = true;
        this.save();
      }
    },
    guessLetter(letter) {
      if (this.guessedLetters.has(letter)) return;
      this.guessedLetters.add(letter);

      if (!this.word.includes(letter) && this.remainingTries === 0) {
        this.gameOver = true;
        this.save();
      }

      if (!this.word.split('').some(letter => !this.guessedLetters.has(letter))) {
        this.score++;
        this.save();
        this.startNewGame();
      }
    },
    guessWord(word) {
      if (word === this.word) {
        this.score++;
        this.save();
        this.startNewGame();
      } else {
        this.guessedWords++;
      }
    },
    hint() {
      const unrevealedLetters = this.word.split('').filter(letter => !this.guessedLetters.has(letter));
      if (unrevealedLetters.length > 0) {
        const hintLetter = unrevealedLetters[Math.floor(Math.random() * unrevealedLetters.length)];
        this.guessedLetters.add(hintLetter);
        this.hintUsed = true;
      }
    },
    restartGame() {
      this.score = 0;
      this.gameOver = false;
      this.startNewGame();
    },
    getWrongGuessesCount() {
      return Array.from(this.guessedLetters).filter(letter => !this.word.includes(letter)).length + this.guessedWords;
    }
  },
  unmounted() {
    this.save();
  }
};
</script>

<style>
#HG {
  font-size: 20px;
  font-family:'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
}
input[type="text"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
  width: 200px; 
}

input[type="text"]:focus {
  border-color: #FF7F50;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: #FF7F50;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #fe5315;
}

button:disabled {
  background-color: #ccc;
  color: #666;
  cursor: not-allowed;
}
</style>
