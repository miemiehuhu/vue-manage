import Vue from 'vue'
import App from './App.vue'
// 完整引入，将占用体积
// import ElementUI from 'element-ui'
// 按需引入，节省体积
import {
  Button,
  Radio,
  Container,
  Main,
  Header,
  Aside,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Row,
  Col,
  Card,
  Table,
  TableColumn,
  Breadcrumb,
  BreadcrumbItem,
  Tag,
  Form,
  FormItem,
  Input,
  Select,
  Option,
  Switch,
  DatePicker,
  Dialog,
  Pagination,
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/index.less'
import http from 'axios'
import '../api/mock.js'


import router from '../router'
import store from '../store'


Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Radio)
Vue.use(Container)
Vue.use(Main)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Tag)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)
Vue.use(DatePicker)
Vue.use(Dialog)
Vue.use(Pagination)

Vue.prototype.$http = http

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  //若token不存在且当前页不是登录页
  if (!token && to.name !== 'vueLogin') {
    next({ name: 'vueLogin' })
  }
   else if (token && to.name === 'vueLogin') {
    next({ name: 'vueHome' })
  }
   else {
    next()
  }
})

new Vue({
  store,
  router,
  render: h => h(App),
  created() {
    store.commit("addMenu", router);

  }
}).$mount('#app')
