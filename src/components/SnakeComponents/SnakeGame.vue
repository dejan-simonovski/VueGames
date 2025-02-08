<template>
  <div>
    <div class="canvas">
      <div class="block" v-for="i in 225" :key="i" :id="`block-${i}`"></div>
    </div>
  </div>
  <SnakeControls :isPaused="isPaused" @toggle-border="toggleBorder" @toggle-pause="togglePause" @toggle-speed="toggleSpeed"/>
</template>

<script>
import SnakeControls from './SnakeControls.vue';

export default {
  components: {
    SnakeControls
  },
  data: () => ({
    blocks: [],
    snakeHeadIndex: 112,
    snakeTailIndex: [114, 113, 112],
    gameSpeed: 150,
    direction: 'left',
    isPaused: true,
    border: 'solid'
  }),
  methods: {
    setRandomAppleBlock() {
      const randomAppleBlock = (Math.floor(Math.random() * 225)) + 1;
      if (this.blocks[randomAppleBlock]) {
          this.setRandomAppleBlock();
          return;
      }
      this.setBlockValue(randomAppleBlock, 'apple');
    },
    toggleBorder(border) {
      this.border = border;
    },
    togglePause() {
      if (this.isPaused) {
        this.interval = setInterval(this.moveSnake, this.gameSpeed);
      } else {
        clearInterval(this.interval);
      }
      this.isPaused = !this.isPaused;
    },
    toggleSpeed(newSpeed) {
      this.gameSpeed = newSpeed;
    },

    resetGame() {
      location.reload();
    },

    handleSnakeDeath() {
      this.$emit('snakeDied');
      this.resetGame();
    },

    paintBlock(block, color) {
      const element = document.getElementById(`block-${block}`);
      if (element) {
        element.classList.remove('block-with-apple');
        element.classList.remove('block-with-snake');
        element.classList.add(`block-with-${color}`);
      }
    },
    setBlockValue(block, value) {
      this.blocks[block] = value;
      this.paintBlock(block, value);
    },
    setSnakeInitialPosition() {
      this.setBlockValue(112, 'snake');
      this.setBlockValue(113, 'snake');
      this.setBlockValue(114, 'snake');
    },
    moveSnake() {
      let nextSnakeHeadIndex;
      let isDead;

      const checkBorderCollision = () => {
        if (this.border === 'solid' && !isDead) {
          this.handleSnakeDeath();
          isDead = true;
          return true;
        }
        return false;
      };

      switch (this.direction) {
        case 'left':
          nextSnakeHeadIndex = this.snakeHeadIndex - 1;
          if (nextSnakeHeadIndex % 15 === 0) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex += 15;
          }
        break;
        case 'right':
          nextSnakeHeadIndex = this.snakeHeadIndex + 1;
          if (nextSnakeHeadIndex %  15 === 1) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex -= 15;
          }
          break;
        case 'up':
          nextSnakeHeadIndex = this.snakeHeadIndex - 15;
          if (nextSnakeHeadIndex < 1) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex += 225;
          }
          break;
        case 'down':
          nextSnakeHeadIndex = this.snakeHeadIndex + 15;
          if (nextSnakeHeadIndex > 225) {
            if (checkBorderCollision()) break;
            nextSnakeHeadIndex -= 225;
          }
          break;
        default:
          break;
        }

        if(!isDead)
          this.snakeHeadIndex = nextSnakeHeadIndex;

        isDead=false;

        this.setBlockValue(this.snakeTailIndex[0], null);
        this.snakeTailIndex.shift();

  
        if (this.blocks[this.snakeHeadIndex] === 'snake') {
          this.setBlockValue(this.snakeHeadIndex, 'snake');
          this.$emit('snakeDied');
          this.handleSnakeDeath();
        }
  
        if (this.blocks[this.snakeHeadIndex] === 'apple') {
          this.snakeTailIndex.push(this.snakeTailIndex.slice(-1));
          this.setRandomAppleBlock();
          this.$emit('onAppleEaten');
        }
  
        this.setBlockValue(this.snakeHeadIndex, 'snake');
        this.snakeTailIndex.push(this.snakeHeadIndex);
    }
  },
  mounted() {
    this.setSnakeInitialPosition();
    this.setRandomAppleBlock();
  },
  unmounted(){
    this.handleSnakeDeath();
  },
  created() {
      document.addEventListener('keydown', (event) => {
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(event.key) && this.isPaused) {
            this.togglePause();
        }

        if (['Escape', 'p', 'P'].includes(event.key)) {
            this.togglePause();
        }

        switch (event.key) {
            case 'ArrowUp':
                if (this.direction === 'down' || this.direction === 'up') return;
                this.direction = 'up';
                break;
            case 'ArrowDown':
                if (this.direction === 'down' || this.direction === 'up') return;
                this.direction = 'down';
                break;
            case 'ArrowLeft':
                if (this.direction === 'left' || this.direction === 'right') return;
                this.direction = 'left';
                break;
            case 'ArrowRight':
                if (this.direction === 'left' || this.direction === 'right') return;
                this.direction = 'right';
                break;
            default: break;
          }
      });
  },
};
</script>

<style scoped>
.canvas {
  display: grid;
  border-style: 1px solid black;
  grid-template-columns: repeat(15, 20px);
  grid-template-rows: repeat(15, 20px);
  /* grid-gap: 1px; */
  padding: 2px;
  border: 1px solid black;
}

.block {
  width: 20px;
  height: 20px;
  background-color: rgb(255, 255, 253);
}

.block-with-apple {
  background-color: rgb(233, 54, 54);
}

.block-with-snake {
  background-color: rgb(66, 209, 66);
}
</style>
