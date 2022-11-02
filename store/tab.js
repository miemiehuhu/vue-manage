import Cookie from 'js-cookie'
// import router from '../router/index'
export default {
    state: {
        isCollapse: false,
        tabsList: [
            {
                path: '/home',
                name: 'vueHome',
                label: '首页',
                icon: 's-home',
            }
        ],
        currentMenu: null,
        menu: []
    },
    mutations: {
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val) {
            if (val.name !== 'home') {
                state.currentMenu = val
                // findIndex 寻找匹配的元素，返回第一个匹配元素的下标，没有就返回-1
                const result = state.tabsList.findIndex(item => item.name === val.name)
                if (result === -1) {
                    state.tabsList.push(val)
                } else {
                    state.currentMenu = null
                }
            }
        },
        closeTag(state, val) {
            const result = state.tabsList.findIndex(item => item.name === val.name)
            state.tabsList.splice(result, 1)
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () => require(`../views/${item.url}`)
                        return item
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = () => require(`../views/${item.url}`)
                    menuArray.push(item)
                }
            })
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('vueMain', item)
            })
        }
    }
}