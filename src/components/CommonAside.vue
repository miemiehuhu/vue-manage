<template>
  <!-- 右侧导航 -->
  <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
  >
    <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
    <!-- 无子菜单的导航 -->
    <el-menu-item
        @click="clickMenu(item)"
        v-for="item in noChildren"
        :index="item.path"
        :key="item.path"
    >
      <i :class="`el-icon-${item.icon}`"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <!-- 含子菜单的导航 -->
    <el-submenu v-for="item in hasChildren" :index="item.path" :key="item.path">
      <template slot="title">
        <i :class="`el-icon-${item.icon}`"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <!-- 子菜单 -->
      <el-menu-item-group
          v-for="(subItem, subIndex) in item.children"
          :key="subItem.path"
      >
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex">
          {{ subItem.label }}
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<style lang="less" scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu {
  height: 100%;
  border: none;

  h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
  }
}
</style>

<script>
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
      this.$router.push({
        name: item.name,
      });
      this.$store.commit("selectMenu", item);
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
      return this.$store.state.tab.menu
    }
  },
};
</script>