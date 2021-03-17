export default {
    state: {
        messages: []
    },
    getters: {
        messages: state => state.messages
    },
    mutations: {
        addMessage(state, message) {
            state.messages.push(message)
        }
    },
    actions: {
    }
}
