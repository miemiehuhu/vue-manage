import Mock from "mockjs"
export default {
    getMenu: config => {
        const { username, password } = JSON.parse(config.body)
        //先判断用户是否存在
        //判断账号和密码是否对应
        if (username === 'admin' && password === 'admin') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'vueHome',
                            label: '首页',
                            icon: 's-home',
                            url: 'vueHome/vueHome'
                        }, {
                            path: "/mall",
                            name: "vueMall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "vueMall/vueMall",
                        },
                        {
                            path: "/user",
                            name: "vueUser",
                            label: "用户管理",
                            icon: "user",
                            url: "vueUser/vueUser",
                        },
                        {
                            label: "其他",
                            icon: "location",
                            children: [
                                {
                                    path: "/page1",
                                    name: "vuePageOne",
                                    label: "页面1",
                                    icon: "setting",
                                    url: "vueOther/vuePageOne",
                                },
                                {
                                    path: "/page2",
                                    name: "vuePageTwo",
                                    label: "页面2",
                                    icon: "setting",
                                    url: "vueOther/vuePageTwo",
                                },
                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xiaoxiao' && password === 'xiaoxiao') {
            return {
                code: 20000,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'vueHome',
                            label: '首页',
                            icon: 's-home',
                            url: 'vueHome/vueHome'
                        }, {
                            path: "/mall",
                            name: "vueMall",
                            label: "商品管理",
                            icon: "video-play",
                            url: "vueMall/vueMall",
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }
    }
}