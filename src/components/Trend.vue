<template>
  <trend
    :data="values.length > 0 ? values : [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
    :gradient="gradients[endpoint.status]"
    auto-draw
    smooth>
  </trend>
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
      values: [],
      gradients: {
        Operational: ['#5ab43a', '#1dfd71', '#2fe7c8'],
        Maintenance: [ '#b4a13a', '#fdcf1d', '#d0e623' ],
        Down: [ '#b43a60', '#fd1d50', '#e62323' ]
      }
    }
  }
})
</script>
