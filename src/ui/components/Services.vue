<template>
  <ul class="list-group push">
    <li
      v-for="endpoint in endpoints" :key="endpoint.id"
      class="list-group-item d-flex justify-content-between align-items-center">

      <router-link
        :to="`/status/${endpoint.name}`"
        tag="a">
        {{ endpoint.title }}
      </router-link>

      <div v-if="endpoint.status === 'Operational'">
        <span class="badge badge-pill badge-success">{{ endpoint.status }}</span>
      </div>
      <div v-if="endpoint.status === 'Maintenance'">
        <span class="badge badge-pill badge-warning">{{ endpoint.status }}</span>
      </div>
      <div v-if="endpoint.status === 'Down'">
        <span class="badge badge-pill badge-danger">{{ endpoint.status }}</span>
      </div>

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
  }
})
</script>
