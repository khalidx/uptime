<template>
  <div>
    <line-chart :data="values"></line-chart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

export default Vue.extend({
  props: {
    values: {
      required: true
    }
  }
})
</script>
