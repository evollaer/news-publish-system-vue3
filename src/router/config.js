
const routes = [
    {
        path: "/",
        redirect: '/index'
    },
    {
        path: "/:pathMatch(.*)*",
        name: 'NotFound',
        component: () => import('../views/notFound/notFound.vue')
    },
    {
        path: '/index',
        component: () => import('../views/home/home.vue')
    },
    {
        path: '/center',
        component: () => import('../views/center/center.vue')
    },
    {
        path: '/userManage/add',
        component: () => import('../views/user-manage/userAdd.vue')
    },
    {
        path: '/userManage/list',
        component: () => import('../views/user-manage/userList.vue')
    },
    {
        path: '/newsManage/add',
        component: () => import('../views/news-manage/newsAdd.vue')
    },
    {
        path: '/newsManage/list',
        component: () => import('../views/news-manage/newsList.vue')
    },
    {
        path: '/productManage/add',
        component: () => import('../views/product-manage/productAdd.vue')
    },
    {
        path: '/productManage/list',
        component: () => import('../views/product-manage/productList.vue')
    },
]
export default routes