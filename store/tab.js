// 管理菜单相关的数据
import Cookie from 'js-cookie'
export default {
    state: {
        isCollapse: false, // 控制菜单展开还是收起
        tabsList: [ // 面包屑与tab共享数据
            { // 首页数据
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
        // 控制菜单展开或收起的方法
        collapseMenu(state) {
            state.isCollapse = !state.isCollapse;
        },
        // 更新面包屑数据
        selectMenu(state, val) {
            if (val.name !== 'vueHome') { // 判断是否为首页
                state.currentMenu = val;
                // findIndex 寻找匹配的元素，返回第一个匹配元素的下标，没有就返回-1
                const result = state.tabsList.findIndex(item => item.name === val.name);
                if (result === -1) { // 若不存在
                    state.tabsList.push(val);
                } else {
                    state.currentMenu = null;
                }
            }
        },
        // 删除指定的tag数据
        closeTag(state, val) {
            const index = state.tabsList.findIndex(item => item.name === val.name);
            state.tabsList.splice(index, 1);
        },
        setMenu(state, val) {
            state.menu = val
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        // 动态注册路由
        addMenu(state, router) {
            // 容错判断
            if (!Cookie.get('menu')) {
                return;
            }
            const menu = JSON.parse(Cookie.get('menu'));
            state.menu = menu;
            const menuArray = [];
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = (resolve) => require([`../views/${item.url}`],resolve);
                        return item;
                    })
                    menuArray.push(...item.children)
                } else {
                    item.component = (resolve) => require([`../views/${item.url}`],resolve);
                    menuArray.push(item);
                }
            })
            //路由的动态添加
            menuArray.forEach(item => {
                router.addRoute('main', item);
            })
        }
    }
}