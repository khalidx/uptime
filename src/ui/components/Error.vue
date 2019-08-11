<template>
  <div v-if="error" class="card border-danger mb-3" >
    <div class="card-body">
      <h5 class="card-title text-danger">Error</h5>
      <p class="card-text">{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  computed: {
    error () {
      return this.$store.state.error
    }
  }
})
</script>
