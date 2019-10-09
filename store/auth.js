import { userApi } from '~/api';
import {setAuthToken, resetAuthToken} from '~/utils/auth'
export const state = () => ({
  user: null
})

export const mutations = {
  set_user (store, data) {
    store.user = data
  },
  reset_user (store) {
    store.user = null
  }
}

export const actions = {
  fetch ({commit}) {
    return userApi.getUser()
      .then(response => {
        commit('set_user', response.data.result)
        return response
      })
      .catch(error => {
        commit('reset_user')
        return error
      })
  },
  login ({commit}, data) {
    return userApi.loginUser(data)
      .then(response => {
        commit('set_user', response.data.user)
        setAuthToken(response.data.jwt)
        return response
      })
  },
  signup ({commit}, data) {
    return userApi.createUser(data)
      .then(response => {
        commit('set_user', response.data.user)
        setAuthToken(response.data.jwt)
        return response
      })
  },
  reset ({commit}) {
    commit('reset_user')
    resetAuthToken()
    return Promise.resolve()
  }
}