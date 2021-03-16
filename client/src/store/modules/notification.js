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
        },
        deleteNotification(state, id) {
            const notificationIndex = state.notifications.findIndex(note => note.id === id)
            state.notifications.splice(notificationIndex, 1)
        }
    },
    actions: {
        addNotification({commit}, notification) {
            commit('pushNotification', notification)
        },
        removeNotification({commit}, id) {
            commit('deleteNotification', id)
        }
    }
}
