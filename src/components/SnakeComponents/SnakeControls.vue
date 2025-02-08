<template>
  <br>
  <div class="controls">
    <label style="margin-left: -6%;">Border:</label>
    <select v-model="selectedBorder" @change="changeBorder" :disabled="!isPaused">
      <option value="solid">Solid</option>
      <option value="passthrough">Passthrough</option>
    </select>
    <label style="margin-left: 6%;">Speed:</label>
    <select style=" margin-right: 6%;" v-model="selectedSpeed" @change="changeSpeed" :disabled="!isPaused">
      <option v-for="(speedOption, index) in speedOptions" :key="index" :value="speed[index]">{{ speedOption }}</option>
    </select>
    <button @click="togglePause" class="button">{{ isPaused ? 'Resume' : 'Pause' }}</button>
  </div>
</template>


<script>
export default {
  props: {
    isPaused: {
      type: Boolean,
      required: true
    },
    borderStyle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      speedOptions: ['Low', 'Mid', 'High'],
      speed: [200, 150, 50],
      selectedSpeed: 150, // Default to Mid speed
      selectedBorder: 'solid' // Default to solid border
    };
  },
  computed: {
    gameSpeedButtonText() {
      return this.speedOptions[this.currentSpeedIndex];
    },
    borderButtonText() {
      return this.selectedBorder === 'solid' ? 'Solid' : 'Passthrough';
    }
  },
  methods: {
    togglePause() {
      this.$emit('toggle-pause');
    },
    changeSpeed() {
      this.$emit('toggle-speed', this.selectedSpeed);
    },
    changeBorder() {
      this.$emit('toggle-border', this.selectedBorder);
    }
  }
};
</script>


<style scoped>
.controls {
  margin-bottom: 10px;
}

button{

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
  margin-top: 3%;
}

.button:hover {
  background-color:white;
  color: #FE633D;
  border-color: #FE633D;
}
select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: none;
  outline: none;
  
  padding: 8px 12px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  cursor: pointer;
}


select:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}


select:after {
  content: '\25BC';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none;
}


select:hover {
  border-color: #999;
}


select:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

</style>
