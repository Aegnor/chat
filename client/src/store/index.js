import {createStore} from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'
import socketModule from './modules/socket'

export default createStore({
    modules: [
        userModule,
        notificationModule,
        socketModule
    ]
})
