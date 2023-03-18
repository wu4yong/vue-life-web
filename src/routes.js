import Login from './pages/Login.vue'
import NotFound from './pages/default/404.vue'
import Home from './pages/Home.vue'
import Main from './pages/Main.vue'
import Table from './pages/user/Table.vue'
import Form from './pages/user/Form.vue'
import user from './pages/user/user.vue'
import Page4 from './pages/default/Page4.vue'
import Page5 from './pages/default/Page5.vue'
import Page6 from './pages/default/Page6.vue'
import echarts from './pages/charts/echarts.vue'
import List from './pages/people/list.vue'
import Details from './pages/people/details.vue'
import Edit from './pages/people/edit.vue'
import Index from './pages/people/index.vue'



let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '用户管理',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/main', component: Main, name: '主页'},
            { path: '/table', component: Table, name: '用户地址' },
            { path: '/form', component: Form, name: '活动名称' },
            { path: '/list', component: user, name: '用户列表' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'life',
        iconCls: 'el-icon-message',//图标样式class
        children: [
            { path: '/details', component: Details, name: '详情'},
            { path: '/edit', component: Edit, name: '修改' },
            { path: '/index', component: Index, name: '主页2' },
            { path: '/peoplelist', component: List, name: '列表' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: 'Charts',
        iconCls: 'fa fa-bar-chart',
        children: [
            { path: '/echarts', component: echarts, name: '图表展示' }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;