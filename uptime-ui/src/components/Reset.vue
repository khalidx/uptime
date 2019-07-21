<template>
  <div>
    <form>
      <p><em>Reset sample data</em></p>
      <p>Are you sure you want to clear data and reset to sample data only?</p>
      <div class="form-row justify-content-end align-items-center mt-3">
        <div class="col-auto">
          <button
            type="cancel"
            class="btn btn-outline-danger btn-hero-sm btn-hero-success mb-2"
            @click="cancel">
            <i class="fa fa-window-close"></i> <span class="d-none d-sm-inline-block ml-1">Cancel</span>
          </button>
        </div>
        <div class="col-auto">
          <button
            type="submit"
            class="btn btn-primary btn-hero-sm btn-hero-success mb-2"
            @click="submit">
            <i class="fa fa-paper-plane"></i> <span class="d-none d-sm-inline-block ml-1">Submit</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import data from '../services/data'

export default Vue.extend({
  methods: {
    cancel () {
      this.$router.push('/dashboard')
    },
    submit () {
      data.reset()
      this.$router.push('/status')
    }
  }
})
</script>
