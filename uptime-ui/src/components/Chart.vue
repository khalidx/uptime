<template>
  <div>
    <line-chart v-if="values" :data="values"></line-chart>
    <p v-else>Not enough error data. Check back soon!</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'
import moment from 'moment'

Vue.use(Chartkick.use(Chart))

export default Vue.extend({
  props: {
    endpoint: {
      required: true
    }
  },
  computed: {
    values () {
      return this.endpoint.metrics.reduce((accumulator, metric) => {
        let date = moment(metric.end).format('YYYY-MM-DD')
        accumulator[date] = (metric.type === 'error') ? 1 : 0
        return accumulator
      }, {})
    }
  }
})

</script>
