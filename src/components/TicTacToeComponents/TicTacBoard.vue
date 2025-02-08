<template>
  <div class="board">
    <div class="board-edge clearfix">
      <div class="board-bondary">
        <div class="board-body">
          <div class="board-row">
            <Square :content="tics[0]" @click="OnClicked(0)" />
            <Square :content="tics[1]" @click="OnClicked(1)" />
            <Square :content="tics[2]" @click="OnClicked(2)" />
          </div>
          <div class="board-row">
            <Square :content="tics[3]" @click="OnClicked(3)" />
            <Square :content="tics[4]" @click="OnClicked(4)" />
            <Square :content="tics[5]" @click="OnClicked(5)" />
          </div>
          <div class="board-row">
            <Square :content="tics[6]" @click="OnClicked(6)" />
            <Square :content="tics[7]" @click="OnClicked(7)" />
            <Square :content="tics[8]" @click="OnClicked(8)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Square from "./TicTacSquare.vue";

export default {
  name: "GameBoard",
  props: {
    tics: Array,
    OnHandleClick: Function
  },
  components: {
    Square
  },
  methods: {
    OnClicked(i) {
      this.OnHandleClick(i);
    }
  }
};
</script>

<style scoped>
.board-row {
  clear: both;
  display: table;
}
.board-bondary {
  position: relative;
  float: left;
  left: 50%;
}
.board-body {
  position: relative;
  left: -50%;
}

.clearfix::after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
</style>