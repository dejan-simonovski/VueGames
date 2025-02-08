<template>
    <div>
      <Hangman/>
    </div>
  </template>
  
  <script>
  import Hangman from '@/components/HangmanGame.vue'
  
  export default {
    name: 'HangmanView',
    components: {
        Hangman
    }
  }
  </script>
  