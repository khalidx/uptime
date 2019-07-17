<template>
  <div>
    <line-chart :data="{'2017-05-13': 2, '2017-05-14': 5}"></line-chart>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))

export default Vue.extend({
  data () {
    return {}
  }
})
</script>
