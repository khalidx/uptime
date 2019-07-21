<template>
  <div>
    <a
      class="btn btn-primary btn-hero-sm btn-hero-success pull-right m-3"
      :href="`data:text/json;charset=utf-8,${encodeURIComponent(endpoints)}`"
      download="endpoints.json">
      <i class="fa fa-arrow-down"></i> <span class="d-none d-sm-inline-block ml-1">Download</span>
    </a>
    <div class="shadow-lg p-3 mb-5 bg-white rounded">
      <h3>Endpoints</h3>
      <pre>{{ endpoints }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import data from '../services/data'

export default Vue.extend({
  data () {
    return {
      endpoints: JSON.stringify(data.getEndpoints(), null, 2)
    }
  }
})
</script>
