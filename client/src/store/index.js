import {createStore} from 'vuex'
import userModule from './modules/user'
import notificationModule from './modules/notification'

export default createStore({
    modules: [
        userModule,
        notificationModule
    ]
})
