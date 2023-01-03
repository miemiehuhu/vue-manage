// axios的二次封装
import http from '../src/utils/request';

// 请求首页数据
export const getData = () => {
    // 返回一个Promise对象
    return http.get('/home/getData'); // 通过mock模拟后端数据
};

// 请求用户列表数据
export const getUser = (params) => {
    // 返回用户列表
    return http.get('/user/getUser', params);
};

// 添加用户数据 
export const addUser = (data) => {
    return http.post('/user/add', data);
};

// 编辑用户数据
export const editUser = (data) => {
    return http.post('/user/edit', data);
};

// 删除用户数据
export const delUser = (data) => {
    return http.post('/user/del', data);
};

// 登录后获取菜单
export const getMenu = (data) => {
    return http.post('/permission/getMenu', data);
}