<template>
  <button class="btn btn-outline-secondary btn-hero-sm btn-hero-success" @click="comingSoon">
    <i class="fa fa-rss"></i> <span class="ml-1">{{ text }}</span>
  </button>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      clicked: false
    }
  },
  methods: {
    comingSoon () {
      this.clicked = !this.clicked
    }
  },
  computed: {
    text () {
      return this.clicked ? 'Coming soon!' : 'Subscribe'
    }
  }
})
</script>
