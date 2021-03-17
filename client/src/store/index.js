import {createStore} from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
import messagesModule from './modules/messages'

export default createStore({
    modules: [
        userModule,
        notificationModule,
        messagesModule
    ]
})
