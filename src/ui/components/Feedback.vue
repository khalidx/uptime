<template>
  <div class="card shadow-lg mb-3 bg-white rounded">
    <h5 class="card-header">Feedback</h5>
    <div class="card-body">
      <h5 class="card-title">Submit a bug report</h5>
      <p class="card-text">Help us improve this service! Your feedback is appreciated.</p>
      <a href="#" class="btn btn-primary mr-1" @click="comingSoon"><i class="fa fa-bullhorn"></i> {{ this.clicked ? 'Coming soon!' : 'Say something' }}</a>
      <a href="#" class="btn btn-success mr-1" @click="comingSoon"><i class="fa fa-list"></i> {{ this.clicked ? 'Coming soon!' : 'Submissions' }}</a>
    </div>
  </div>
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
  }
})
</script>
