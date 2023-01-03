<template>
  <div class="common-table">
    <el-table :data="localTableData" height="90%" stripe>
      <el-table-column
        show-overflow-tooltip
        v-for="item in localTableLabel"
        :key="item.prop"
        :prop="item.prop"
        :label="item.label"
        :width="item.width ? item.width : 90"
      >
        <template slot-scope="scope">
          <span>{{ getData(scope.row, item.prop) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="handleDelete(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pager"
      layout="prev, pager, next"
      :total="localConfig.total"
      :current-page.sync="localConfig.page"
      @current-change="handlePage"
      :page-size="20"
    ></el-pagination>
  </div>
</template>
<script>
import { getUser, delUser } from "../../api";
import { MessageBox } from "element-ui";

export default {
  name: "CommonTable",
  props: {
    tableData: Array,
    tableLabel: Array,
    config: Object,
  },
  data() {
    return {
      // 保存父组件prop的数据，以后续数据处理
      localTableData: this.tableData,
      localTableLabel: this.tableLabel,
      localConfig: this.config,
      localType: this.operateType,
    };
  },
  methods: {
    handleEdit(row) {
      this.$store.state.table.dialogType = 1;
      this.$store.state.table.isShow = true;
      // 需要对当前行数据进行深拷贝，否则会出错
      this.$store.state.table.dialogForm = JSON.parse(JSON.stringify(row));
      // this.$emit("edit", row);
    },
    handleDelete(row) {
      MessageBox.confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ id: row.id }).then(() => {
            // this.$message({
            //   type: "success",
            //   message: "删除成功!",
            // });
            getUser().then(({ data }) => {
              this.$store.state.table.tableData = data.list;
            });
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
      // this.$emit("del", row);
    },
    // 选择页码的回调函数
    handlePage(page) {
      console.log(page);
      this.$store.state.table.tableConfig.page = page;
      this.$store.dispatch("getLIST");
    },
    // 处理localTableData中的sex数据
    getData(datalist, prop) {
      if (prop === "sex") {
        return datalist[prop] === 1 ? "男" : "女";
      } else {
        return datalist[prop];
      }
    },
  },
  watch: {
    tableData: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.localTableData = newVal;
      },
    },
    config: {
      immediate: true,
      deep: true,
      handler(newVal) {
        this.localConfig = newVal;
      },
    },
  },
};
</script>

<style lang="less" scoped>
.common-table {
  height: calc(100% - 32px);
  background-color: #fff;
  position: relative;
  .pager {
    position: absolute;
    bottom: 0;
    right: 20px;
  }
}
</style>