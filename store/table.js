import { getUser, editUser, delUser } from "../api";

// 管理对话框表单和用户列表相关数据
export default {
    state: {
        // 对话框表单
        dialogType: 0, // 0表示新增，1表示更新
        isShow: false, // dialog是否展示
        dialogFormLabel: [ // 表单
            {
                prop: "name",
                label: "姓名",
                type: "input",
            },
            {
                prop: "age",
                label: "年龄",
                type: "input",
            },
            {
                prop: "sex",
                label: "性别",
                type: "select",
                opts: [
                    {
                        label: "男",
                        value: 1,
                    },
                    {
                        label: "女",
                        value: 0,
                    },
                ],
            },
            {
                prop: "birth",
                label: "出生日期",
                type: "date",
            },
            {
                prop: "addr",
                label: "地址",
                type: "input",
            },
        ],
        dialogForm: {
            name: "",
            addr: "",
            age: "",
            birth: "",
            sex: "",
        },
        dialogFormRules: {
            name: [{ required: true, message: "请输入姓名" }],
            addr: [{ required: true, message: "请输入地址" }],
            age: [{ required: true, message: "请输入年龄" }],
            birth: [{ required: true, message: "请选择出生日期" }],
            sex: [{ required: true, message: "请选择性别" }],
        },
        // 用户列表
        tableData: [],
        tableLabel: [
            {
                prop: "name",
                label: "姓名",
            },
            {
                prop: "age",
                label: "年龄",
            },
            {
                prop: "sex",
                label: "性别",
            },
            {
                prop: "birth",
                label: "出生日期",
                width: 200,
            },
            {
                prop: "addr",
                label: "地址",
                width: 320,
            },
        ],
        tableConfig: {
            page: 1,
            total: 0, // 当前的总条数
            limit: 10,
        },
        // 搜索
        searchformLabel: [{ prop: "keyword", label: "", type: "input" }],
        searchForm: {
            keyword: "",
        },
    },
    actions: {
        // 获取、更新用户数据
        getLIST(state) {
            getUser({ params: {...state.state.searchForm,...state.state.tableConfig} }).then(({ data }) => {
                console.log(data);
                state.state.tableData = data.list;
                state.state.tableConfig.total = data.count || 0
            });
        },
        // 编辑用户数据
        editUSER(state, val) {
            editUser(val).then(() => {
                state.state.getLIST();
            });
        },
        // 删除用户数据
        delUSER(state, val) {
            delUser(val).then(() => {
                console.log(state);
            });
        },
    },
    mutations: {
    },
}