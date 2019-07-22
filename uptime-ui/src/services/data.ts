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
  settingsLoaded (state, payload: Settings) {
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
    .get('https://su7e8qlg21.execute-api.us-east-1.amazonaws.com/dev/services')
    .then((response) => commit('servicesLoaded', response.data))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while loading services.')
    })
  },
  getSettings ({ commit }) {
    commit('loading')
    axios
    .get('https://su7e8qlg21.execute-api.us-east-1.amazonaws.com/dev/settings')
    .then((response) => commit('settingsLoaded', response.data))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while loading settings.')
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
//   saveEndpoints (endpoints: Array<Service>): void {
//     localStorage.setItem('endpoints', JSON.stringify(endpoints))
//   },
//   saveSettings (settings: Settings): void {
//     localStorage.setItem('settings', JSON.stringify(settings))
//   },
//   reset (): void {
//     localStorage.removeItem('endpoints')
//   }
// }
