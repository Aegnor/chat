export default {
    state: {
        socket: null,
        messages: []
    },
    getters: {
        socket: state => state.socket,
        messages: state => state.messages
    },
    mutations: {
        connectSocket(state, payload) {
            state.socket = payload
        },
        addMessage(state, message) {
            console.log(state.messages)
            state.messages.push({
                text: message,
                id: Date.now().toString(36)
            })
        }
    }
}
