<template>
  <!-- 右侧导航 -->
  <el-menu
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#409EFF"
    default-active="/home"
    @open="handleOpen"
    @close="handleClose"
    :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <!-- 无子菜单的导航 -->
    <el-menu-item
      @click="clickMenu(item)"
      v-for="item in noChildren"
      :index="item.path + ''"
      :key="item.path + ''"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 含子菜单的导航 -->
    <el-submenu
      v-for="item in hasChildren"
      :index="item.label + ''"
      :key="item.label + ''"
    >
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 子菜单 -->
      <el-menu-item-group
        v-for="subItem in item.children"
        :index="item.path + ''"
        :key="subItem.path + ''"
      >
        <el-menu-item @click="clickMenu(subItem)" :index="subItem.path">
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import Cookie from 'js-cookie';

export default {
  data() {
    return {
      menu: [],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    clickMenu(item) {
      // 当前路由与跳转的路由不一致才允许跳转
      if (this.$route.path !== item.path && !(this.$route.path === '/home' && item.path === '/')) {
        this.$router.push({name: item.name});
        this.$store.commit("selectMenu", item);
      }
    },
  },
  //数据过滤
  computed: {
    //无子菜单
    noChildren() {
      return this.asyncMenu.filter((item) => !item.children);
    },
    //有子菜单
    hasChildren() {
      return this.asyncMenu.filter((item) => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    //异步菜单
    asyncMenu() {
      // 通过cookie缓存menu数据
      return JSON.parse(Cookie.get('menu')) || this.$store.state.tab.menu;
    },
  },
};
</script>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-height: 400px;
  overflow: hidden;
}

.el-menu {
  height: 100%;
  border-right: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }

}
</style>