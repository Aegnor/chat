export default {
    state: {
        socket: null,
        messages: [],
        users: []
    },
    getters: {
        socket: state => state.socket,
        messages: state => state.messages,
        users: state => state.users
    },
    mutations: {
        connectSocket(state, payload) {
            state.socket = payload
        },
        addMessage(state, messageObject) {
            state.messages.push({
                user: messageObject.user,
                text: messageObject.message,
                id: messageObject.messageId
            })
        },
        addUser(state, user) {
            state.users.push(user)
        },
        removeUser(state, id) {
            const idx = state.users.findIndex(user => user._id === id)
            state.users.splice(idx, 1)
        }
    }
}
