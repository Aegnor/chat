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
        }
    },
    actions: {
        // @TODO: handle errors
        async authentication({commit}, formData) {
            const user = await axios.post('api/v1/auth', formData)
            commit('setUser', user.data)
        }
    }
}
