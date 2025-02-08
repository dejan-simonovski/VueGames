<template>
  <div>
    <Snake/>
  </div>
</template>

<script>
// @ is an alias to /src
import Snake from '@/components/Snake.vue'

export default {
  name: 'SnakeView',
  components: {
    Snake
  }
}
</script>
