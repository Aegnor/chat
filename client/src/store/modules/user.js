import axios from 'axios'

export default {
    state: {
        user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
    },
    getters: {
        user: state => state.user
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        logout(state) {
            localStorage.removeItem('user')
            state.user = null
        }
    },
    actions: {
        async authentication({commit, dispatch}, formData) {
            try {
                const user = await axios.post('api/v1/auth', formData)
                const {token, msg} = user.data
                commit('setUser', token)
                // @TODO: refactor local storage
                localStorage.setItem('user', JSON.stringify(token))
                if (msg) {
                    dispatch('addNotification', {
                        data: msg,
                        type: 'success'
                    })
                }
            } catch (e) {
                const errors = e.response.data.errors ?? e.response.data.error
                dispatch('addNotification', {
                    data: errors,
                    type: 'error'
                })
            }
        },
        logout({commit}) {
            commit('logout')
        }
    }
}
