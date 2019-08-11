<template>
  <div>
    <error></error>
    <terminal v-if="logs" :content="logs"></terminal>
    <p v-else>No log data. Check back soon!</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import Error from './Error.vue'
import Terminal from './Terminal.vue'

export default Vue.extend({
  components: {
    Error,
    Terminal
  },
  mounted () {
    this.$store.dispatch('getLogs')
  },
  computed: {
    logs () {
      return this.$store.state.logs.reduce((accumulator, log) => {
        let splits = log.message.split('\t')
        return (splits.length >= 4) ? accumulator + splits[3] : accumulator + log.message
      }, '')
    }
  }
})
</script>
