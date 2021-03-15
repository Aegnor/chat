export default {
    state: {
        notifications: []
    },
    getters: {
        notifications: state => state.notifications
    },
    mutations: {
        pushNotification(state, notification) {
            const {data, type} = notification

            if (typeof data === 'string') {
                state.notifications.push({
                    type,
                    msg: data,
                    id: (Math.random().toString(36) + Date.now().toString(36)).substr(2)
                })
            }

            if (Array.isArray(data)) {
                data.map(note => {
                    note.type = type
                    note.id = (Math.random().toString(36) + Date.now().toString(36)).substr(2)
                    state.notifications.push(note)
                })
            }
        }
    },
    actions: {
        addNotification({commit}, notification, type) {
            commit('pushNotification', notification, type)
        }
    }
}
