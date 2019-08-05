<template>
  <div>
    <trend v-if="values"
      :data="values"
      :gradient="gradients[endpoint.status]"
      auto-draw
      smooth>
    </trend>
    <p v-else>Not enough latency data. Check back soon!</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Trend from 'vuetrend'

Vue.use(Trend)

export default Vue.extend({
  components: {
    Trend
  },
  props: {
    endpoint: {
      required: true
    }
  },
  data () {
    return {
      gradients: {
        Operational: ['#5ab43a', '#1dfd71', '#2fe7c8'],
        Maintenance: [ '#b4a13a', '#fdcf1d', '#d0e623' ],
        Down: [ '#b43a60', '#fd1d50', '#e62323' ]
      }
    }
  },
  computed: {
    values () {
      return this.endpoint.metrics.map(metric => metric.latency)
    }
  }
})
</script>
