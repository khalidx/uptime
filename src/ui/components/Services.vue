<template>
  <ul class="list-group push">
    <li
      v-if="!endpoints || endpoints.length == 0"
      class="list-group-item d-flex justify-content-between align-items-center">

      <router-link
        :to="`/dashboard/services/add`"
        tag="button"
        class="btn btn-success btn-block">
        <i class="fa fa-plus"></i> <span class="ml-1">Add a service</span>
      </router-link>

    </li>
    <li
      v-for="endpoint in endpoints" :key="endpoint.id"
      class="list-group-item d-flex justify-content-between align-items-center">

      <router-link
        :to="`/status/${endpoint.name}`"
        tag="a">
        {{ endpoint.title }}
      </router-link>

      <div v-html="status(endpoint)"></div>

    </li>
  </ul>
</template>

<script lang="ts">
import Vue from 'vue'

import moment from 'moment'

export default Vue.extend({
  props: {
    endpoints: {
      required: true
    }
  },
  methods: {
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
  }
})
</script>
