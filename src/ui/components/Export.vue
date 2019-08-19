<template>
  <div>
    <a
      class="btn btn-primary btn-hero-sm btn-hero-success pull-right m-3"
      :href="`data:text/json;charset=utf-8,${encodeURIComponent(settings)}`"
      download="uptime-settings.json">
      <i class="fa fa-arrow-down"></i> <span class="ml-1">Download</span>
    </a>
    <div class="shadow-lg p-3 mb-4 bg-white rounded">
      <h3>Settings</h3>
      <pre>{{ settings }}</pre>
    </div>
    <a
      class="btn btn-primary btn-hero-sm btn-hero-success pull-right m-3"
      :href="`data:text/json;charset=utf-8,${encodeURIComponent(services)}`"
      download="uptime-services.json">
      <i class="fa fa-arrow-down"></i> <span class="ml-1">Download</span>
    </a>
    <div class="shadow-lg p-3 mb-4 bg-white rounded">
      <h3>Services</h3>
      <pre>{{ services }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    settings () {
      return JSON.stringify(this.$store.state.settings, null, 2)
    },
    services () {
      return JSON.stringify(this.$store.state.services, null, 2)
    }
  }
})
</script>
