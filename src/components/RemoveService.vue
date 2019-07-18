<template>
  <div>
    <p><em>Remove a service</em><p>
    <p><strong>Select the service to remove</strong>
    <ul class="list-group push mt-3">
      <li
        v-for="endpoint in endpoints" :key="endpoint.title"
        class="list-group-item d-flex justify-content-between align-items-center"
        @click="remove(endpoint)"
        >

        <router-link
          :to="`/status/${endpoint.name}`"
          tag="a">
          {{ endpoint.title }}
        </router-link>

        <div v-html="status(endpoint)"></div>

      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import data from '../services/data'

export default Vue.extend({
  data () {
    return {
      endpoints: data.getEndpoints()
    }
  },
  methods: {
    remove (endpoint) {
      this.endpoints = this.endpoints.filter(e => e.name !== endpoint.name)
      data.saveEndpoints(this.endpoints)
    },
    status (endpoint) {
      let recentMessage = endpoint.messages.slice().reverse().find(message => message.active)
      let status = (recentMessage) ? recentMessage.status: endpoint.status
      let className = status === 'Operational' ? 'badge-success'
        : status === 'Maintenance' ? 'badge-warning'
          : status === 'Down' ? 'badge-danger'
            : undefined
      return (className)
        ? `<span class="badge badge-pill ${className}">${status}</span>`
        : `<span class="badge badge-pill">${status}</span>`
    }
  }
})
</script>
