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
        async authentication({commit}, formData) {
            try {
                const user = await axios.post('api/v1/auth', formData)
                commit('setUser', user.data)
            } catch (e) {
                console.log(e.response)
            }
        },
        logout({commit}) {
            commit('logout')
        }
    }
}
