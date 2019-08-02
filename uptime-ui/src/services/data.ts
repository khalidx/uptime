import Vuex, { MutationTree, ActionTree } from 'vuex'

import axios from 'axios'

import Service from '../../../uptime-app/src/types/service'
import Settings from '../../../uptime-app/src/types/settings'

interface State {
  services: Array<Service>
  settings: Settings
  loading: boolean
  error?: string
}

const mutations: MutationTree<State> = {
  loading (state) {
    state.loading = true
  },
  servicesLoaded (state, payload: Array<Service>) {
    state.services = payload
    state.loading = false
    state.error = undefined
  },
  servicesUpdated (state, payload: Array<Service>) {
    state.services = payload
    state.loading = false
    state.error = undefined
  },
  settingsLoaded (state, payload: Settings) {
    state.settings = payload
    state.loading = false
    state.error = undefined
  },
  settingsUpdated (state, payload: Settings) {
    state.settings = payload
    state.loading = false
    state.error = undefined
  },
  error (state, payload: string) {
    state.loading = false
    state.error = payload
  }
}

const actions: ActionTree<State, State> = {
  getServices ({ commit }) {
    commit('loading')
    axios
    .get(`${process.env.API_URL}/services`)
    .then((response) => commit('servicesLoaded', response.data))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while loading services.')
    })
  },
  putServices ({ commit, state }, services: Array<Service>) {
    commit('loading')
    axios
    .put(`${process.env.API_URL}/services`, services)
    .then((response) => commit('servicesUpdated', services))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while updating services.')
    })
  },
  getSettings ({ commit }) {
    commit('loading')
    axios
    .get(`${process.env.API_URL}/settings`)
    .then((response) => commit('settingsLoaded', response.data))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while loading settings.')
    })
  },
  putSettings ({ commit, state }, settings: Settings) {
    commit('loading')
    axios
    .put(`${process.env.API_URL}/settings`, settings)
    .then((response) => commit('settingsUpdated', settings))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while updating settings.')
    })
  }
}

export const store = new Vuex.Store<State>({
  state: {
    services: [],
    settings: {
      title: 'API'
    },
    loading: false,
    error: undefined
  },
  mutations,
  actions
})

// export default {
//   reset (): void {
//     localStorage.removeItem('endpoints')
//   }
// }
