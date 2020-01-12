import Communication from 'components_path/communication'
import Slot from 'components_path/slot'

export default {
    mode: 'history',
    routes: [{
        path: '/communication',
        name: 'communication',
        component: Communication
    },{
        path: '/slot',
        name: 'slot',
        component: Slot
    }]
}