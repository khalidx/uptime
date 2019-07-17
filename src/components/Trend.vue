<template>
  <trend
    :data="values || [0, 2, 5, 9, 5, 10, 3, 5, 0, 0, 1, 8, 2, 9, 0]"
    :gradient="gradients['maintenance']"
    auto-draw
    smooth
  >
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
    values: Array<string>
  },
  data () {
    return {
      gradients: {
        operational: ['#5ab43a', '#1dfd71', '#2fe7c8'],
        maintenance: [ '#b4a13a', '#fdcf1d', '#d0e623' ],
        down: [ '#b43a60', '#fd1d50', '#e62323' ]
      }
    }
  }
})
</script>
