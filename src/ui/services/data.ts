import Vuex, { MutationTree, ActionTree } from 'vuex'

import axios from 'axios'

import {
  Settings,
  Service, CreateService,
  CreateMessage,
  Log
} from '../../app/core/types'


interface State {
  services: Array<Service>
  settings: Settings
  logs: Array<Log>
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
  logsLoaded (state, payload: Array<Log>) {
    state.logs = payload
    state.loading = false
    state.error = undefined
  },
  error (state, payload: string) {
    state.loading = false
    state.error = payload
  }
}

const apiUrl = (process.env.NODE_ENV === 'production') ? process.env.API_URL : 'http://localhost:3000'

const actions: ActionTree<State, State> = {
  async getServices ({ commit }) {
    try {
      commit('loading')
      let response = await axios.get(`${apiUrl}/services`)
      commit('servicesLoaded', response.data)
    } catch (error) {
      console.error(error)
      commit('error', 'Error while loading services.')
      throw error
    }
  },
  async createService ({ commit, state }, service: CreateService) {
    try {
      commit('loading')
      let response = await axios.post(`${apiUrl}/services`, service)
      let services = state.services.concat(response.data)
      commit('servicesLoaded', services)
    } catch (error) {
      console.error(error)
      commit('error', `Error while creating the service: ${error.response.status}`)
      throw error
    }
  },
  async deleteService ({ commit, state }, service: Service) {
    try {
      commit('loading')
      await axios.delete(`${apiUrl}/services/${service.id}`)
      let services = state.services.filter(e => e.id !== service.id)
      commit('servicesLoaded', services)
    } catch (error) {
      console.error(error)
      commit('error', `Error while deleting the service: ${error.response.status}`)
      throw error
    }
  },
  async createMessage ({ commit, state }, payload: { serviceId: string, message: CreateMessage }) {
    try {
      commit('loading')
      await axios.post(`${apiUrl}/services/${payload.serviceId}/messages`, payload.message)
      return this.dispatch('getServices')
    } catch (error) {
      console.error(error)
      commit('error', `Error while creating the message: ${error.response.status}`)
      throw error
    }
  },
  async archiveMessage ({ commit, state }, payload: { serviceId: string, messageId: string }) {
    try {
      commit('loading')
      await axios.put(`${apiUrl}/services/${payload.serviceId}/messages/${payload.messageId}/archive`)
      return this.dispatch('getServices')
    } catch (error) {
      console.error(error)
      commit('error', `Error while archiving the message: ${error.response.status}`)
      throw error
    }
  },
  async deleteMessage ({ commit, state }, payload: { serviceId: string, messageId: string }) {
    try {
      commit('loading')
      await axios.delete(`${apiUrl}/services/${payload.serviceId}/messages/${payload.messageId}`)
      return this.dispatch('getServices')
    } catch (error) {
      console.error(error)
      commit('error', `Error while deleting the message: ${error.response.status}`)
      throw error
    }
  },
  async getLogs ({ commit }) {
    try {
      commit('loading')
      let response = await axios.get(`${apiUrl}/logs`)
      commit('logsLoaded', response.data)
    } catch (error) {
      console.error(error)
      commit('error', 'Error while loading logs.')
      throw error
    }
  },
  putServices ({ commit, state }, services: Array<Service>) {
    commit('loading')
    axios
    .put(`${apiUrl}/services`, services)
    .then((response) => commit('servicesUpdated', services))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while updating services.')
    })
  },
  getSettings ({ commit }) {
    commit('loading')
    axios
    .get(`${apiUrl}/settings`)
    .then((response) => commit('settingsLoaded', response.data))
    .catch((error) => {
      console.error(error)
      commit('error', 'Error while loading settings.')
    })
  },
  updateSettings ({ commit, state }, settings: Settings) {
    commit('loading')
    axios
    .put(`${apiUrl}/settings`, settings)
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
    logs: [],
    loading: false,
    error: undefined
  },
  mutations,
  actions
})
