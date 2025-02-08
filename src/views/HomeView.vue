<template>
    <div class="container" style="flex-direction: column; margin-bottom: 2%;">
      <span style="font-size: 20px;" v-if="currentUser">Logged in as: {{ currentUser.username }}</span>
      <button v-if="currentUser" @click="logout" id="log_out" class="button" style=" margin:0.8em">Logout</button>
    </div>
    <div class="container">
      <div class="game-container">
        <img src="../assets/snake.png" alt="SNAKE">
        <router-link to="/snake" class="button-link">
          <button class="button">Snake</button>
        </router-link>
      </div>
      <div class="game-container">
        <img src="../assets/tic-tac-toe.png" alt="TIC-TAC-TOE">
        <router-link to="/tictactoe" class="button-link">
          <button class="button">Tic Tac Toe</button>
        </router-link>
      </div>
      <div class="game-container">
        <img src="../assets/hangman.png" alt="HANGMAN">
        <router-link to="/hangman" class="button-link">
          <button class="button">Hangman</button>
        </router-link>
      </div>
      <div class="game-container">
        <img src="../assets/memorygame.png" alt="MEMORY-GAME">
        <router-link to="/memorygame" class="button-link">
          <button class="button">Memory Game</button>
        </router-link>
      </div>
    </div>
</template>
  
<script>
import { getCurrentUser, logout } from '@/auth'; 

export default {
  data() {
    return {
      currentUser: null
    };
  },
  created() {
    this.currentUser = getCurrentUser();
  },
  methods: {
    logout() {
      logout();
      this.$router.push('/login');
    }
  }
};
</script>
  
<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
}
  
  .container div {
    margin-right: 10px;
  }


.button{
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 20px;
  margin-bottom: 30px;
  font-size: 16px;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 2px solid #FE633D;
  border-radius: 5px;
  color: white;
  background-color: #FE633D;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
}

.button:hover {
  background-color:white;
  color: #FE633D;
  border-color: #FE633D;
}
#log_out{
  background-color: #555555;
  border: 2px solid #555555;
}
#log_out:hover{
  background-color:white;
  color: #555555;
  border-color: #555555;
}
  
.button-link {
    text-decoration: none;
    color: white;
    margin: 1em;
}

img {
    width: 14em;
    height: 13em;
}

.game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1em;
}

</style>
  