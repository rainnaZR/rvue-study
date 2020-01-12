import Communication from 'components_path/communication'
import Slot from 'components_path/slot'
import Form from 'packages_path/form/demo'

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
    },{
        path: '/packages/form',
        name: 'form',
        component: Form
    }]
}