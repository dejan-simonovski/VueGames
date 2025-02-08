<template>
  <div id="app">
    <TicTacToe />
  </div>
</template>

<script>
import TicTacToe from "./TicTacToeComponents/TicTacGame.vue";

export default {
  name: "TicTacToeGame",
  components: {
    TicTacToe
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
