<template>
  <div>
    <p><em>Archive a message broadcast</em><p>
    <p><strong>Select the message to archive</strong>
    <div
      v-for="(message, index) in messages" :key="index"
      :class="{
        'alert-success': message.status === 'Operational',
        'alert-warning': message.status === 'Maintenance',
        'alert-danger': message.status === 'Down'
      }"
      class="alert d-flex align-items-center justify-content-between"
      @click="archive(message)"
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

import data from '../services/data'

export default Vue.extend({
  data () {
    return {
      endpoints: data.getEndpoints()
    }
  },
  methods: {
    archive (message) {
      message.active = false
      data.saveEndpoints(this.endpoints)
    }
  },
  computed: {
    messages () {
      return (this.endpoints || [])
        .filter(endpoint => endpoint.messages.length > 0)
        .reduce((final, endpoint) => final.concat(endpoint.messages.filter(message => message.active)), [])
    }
  }
})
</script>
