<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.path"
      :closable="tag.name !== 'vueHome'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="handleClose(tag, index)"
      >{{ tag.label }}</el-tag
    >
  </div>
</template>
<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "CommonTag",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations(["closeTag"]),
    // 点击tag跳转的功能
    changeMenu(tag) {
      this.$router.push({ name: tag.name });
    },
    // 删除tag的功能
    handleClose(tag, index) {
      // 调用store中的mutation
      const length = this.tags.length - 1;
      this.closeTag(tag);
      if (tag.name !== this.$route.name) {
        return;
      }
      // 删除指定tag之后的逻辑
      if (index === length) {
        // 删除的tag为最后一项（当前页面），跳转到前一项
        this.$router.push({
          name: this.tags[index - 1].name,
        });
      } else {
        // 删除的tag非最后一项，跳转到
        this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>
<style lang="less" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>