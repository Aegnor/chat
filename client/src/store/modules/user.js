import axios from 'axios'

export default {
    state: {
        user: null
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        logout(state) {
            state.user = null
        }
    },
    actions: {
        async authentication({commit, dispatch}, formData) {
            try {
                const user = await axios.create({withCredentials: true}).post('api/v1/auth', formData)
                const {msg} = user.data
                commit('setUser', formData)

                if (msg) {
                    dispatch('addNotification', {
                        data: msg,
                        type: 'success'
                    })
                }

                // need to detect if all is OK
                return true
            } catch (e) {
                const errors = e.response.data.errors ?? e.response.data.error
                dispatch('addNotification', {
                    data: errors,
                    type: 'error'
                })

                // need to detect if error accured
                return false
            }
        },
        logout({commit}) {
            commit('logout')
        }
    }
}
