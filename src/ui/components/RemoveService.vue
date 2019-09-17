<template>
  <div>
    <p><em>Remove a service</em><p>
    <p v-if="!endpoints || endpoints.length == 0" class="text-primary">There are no services.</p>
    <p v-else><strong>Select the service to remove</strong></p>
    <ul class="list-group push mt-3">
      <li
        v-for="endpoint in endpoints" :key="endpoint.id"
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

import moment from 'moment'

export default Vue.extend({
  created () {
    this.$store.dispatch('getServices')
  },
  methods: {
    remove (endpoint) {
      this.$store.dispatch('deleteService', endpoint)
    },
    status (endpoint) {
      let sortedRecentToOldest = endpoint.messages.slice().sort((a, b) => moment(b.submitted).valueOf() - moment(a.submitted).valueOf())
      let recentActiveMessage = sortedRecentToOldest.slice().reverse().find(message => message.active)
      let status = (recentActiveMessage) ? recentActiveMessage.status: endpoint.status
      let className = status === 'Operational' ? 'badge-success'
        : status === 'Maintenance' ? 'badge-warning'
          : status === 'Down' ? 'badge-danger'
            : undefined
      return (className)
        ? `<span class="badge badge-pill ${className}">${status}</span>`
        : `<span class="badge badge-pill">${status}</span>`
    }
  },
  computed: {
    endpoints () {
      return this.$store.state.services
    }
  }
})
</script>
