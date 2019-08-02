<template>
  <div>
    <p><em>Remove a message broadcast</em><p>
    <p><strong>Select the message to remove</strong>
    <div
      v-for="(message, index) in messages" :key="index"
      :class="{
        'alert-success': message.status === 'Operational',
        'alert-warning': message.status === 'Maintenance',
        'alert-danger': message.status === 'Down'
      }"
      class="alert d-flex align-items-center justify-content-between"
      @click="remove(message)"
      role="alert">
      <div class="flex-fill mr-3">
        <p class="mb-0">{{ message.summary }} </p>
      </div>
      <div class="flex-00-auto">
        <i
          class="fa fa-fw fa-2x"
          :class="{
            'fa-check': message.status === 'Operational',
            'fa-wrench': message.status === 'Maintenance',
            'fa-exclamation': message.status === 'Down'
          }"></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    remove (message) {
      this.$store.dispatch('putServices', this.endpoints.map(endpoint => {
        endpoint.messages = endpoint.messages.filter(m => m.id !== message.id)
        return endpoint
      }))
    }
  },
  computed: {
    endpoints () {
      return this.$store.state.services
    },
    messages () {
      return (this.endpoints || [])
        .filter(endpoint => endpoint.messages.length > 0)
        .reduce((final, endpoint) => final.concat(endpoint.messages), [])
    }
  }
})
</script>
