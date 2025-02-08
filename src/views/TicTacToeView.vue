<template>
    <div>
      <TicTacToe/>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import TicTacToe from '@/components/TicTacToe.vue'
  
  export default {
    name: 'TicTacToeView',
    components: {
      TicTacToe
    }
  }
  </script>
  