<template>
  <div>
    <form>
      <p><em>Edit system settings</em></p>
      <div class="form-row align-items-center">
        <div class="col">
          <label for="title"><strong>Status Page Title</strong></label>
          <input type="text" v-model="title" class="form-control" id="title" :placeholder="settings.title">
        </div>
      </div>
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
            @click="submit"
            :disabled="!submittable">
            <i class="fa fa-paper-plane"></i> <span class="d-none d-sm-inline-block ml-1">Submit</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import uuid from 'uuid/v4'
import moment from 'moment'

export default Vue.extend({
  data () {
    return {
      title: ''
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    },
    submittable () {
      if (!this.title || this.title.length == 0) {
        return false
      }
      return true
    }
  },
  methods: {
    cancel () {
      this.$router.push('/dashboard')
    },
    submit () {
      if (!this.submittable) return
      this.settings.title = this.title
      // TODO data.saveSettings(this.settings)    
      this.$router.push('/status')
    }
  }
})
</script>
