<template>
  <div class="manage">
    <el-dialog
      :title="table.dialogType === 0 ? '新增用户' : '更新用户'"
      :visible.sync="table.isShow"
      width="60%"
      :before-close="handleClose"
    >
      <common-form
        :formLabel="table.dialogFormLabel"
        :form="table.dialogForm"
        :inline="true"
        :rules="table.dialogFormRules"
        ref="userForm"
      ></common-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
    <div class="manage-header">
      <el-button type="primary" @click="handleAdd">+ 新 增</el-button>
      <common-form
        :formLabel="table.searchformLabel"
        :form="table.searchForm"
        :inline="true"
      >
        <el-button type="primary" @click="handleSearch">搜索</el-button>
      </common-form>
    </div>
    <common-table
      :tableData="table.tableData"
      :tableLabel="table.tableLabel"
      :config="table.tableConfig"
      @changePage="getList()"
      @edit="editUser"
      @del="delUser"
    >
    </common-table>
  </div>
</template>

<script>
import CommonForm from "../../src/components/CommonForm.vue";
import CommonTable from "../../src/components/CommonTable.vue";
import { addUser, editUser } from "../../api";

export default {
  name: "vueUser",
  components: {
    CommonForm,
    CommonTable,
  },
  data() {
    return {
      table: this.$store.state.table,
      /* operateType: 0, // 0表示新增，1表示更新
      isShow: false,
      operateFormLabel: [
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
      operateForm: {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      },
      operateRules: {
        name: [{ required: true, message: "请输入姓名" }],
        addr: [{ required: true, message: "请输入地址" }],
        age: [{ required: true, message: "请输入年龄" }],
        birth: [{ required: true, message: "请选择出生日期" }],
        sex: [{ required: true, message: "请选择性别" }],
      }, */
      /* // 搜索
      searchformLabel: [{ model: "keyword", label: "", type: "input" }],
      searchForm: {
        keyword: "",
      }, */
      // 表格
      //  tableData: [],
      /*tableLabel: [
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
      config: {
        page: 1,
        total: 30,
      }, */
    };
  },
  methods: {
    // 提交用户表单
    confirm() {
      this.$refs.userForm.$refs.localForm.validate((valid) => {
        if (valid) {
          if (this.table.dialogType === 0) {
            // 新增数据
            addUser(this.table.dialogForm).then(() => {
              // 重新获取列表的接口
              this.getList();
            });
          } else {
            // 更新数据
            editUser(this.table.dialogForm).then(() => {
              this.getList();
            });
          }
          // 清除数据
          this.$refs.userForm.$refs.localForm.resetFields();
          //关闭窗口
          this.table.isShow = false;
        }
      });
    },
    // dialog点击叉叉关闭的时候
    handleClose() {
      this.$refs.userForm.$refs.localForm.resetFields();
      this.table.isShow = false;
    },
    // dialog点击取消的时候
    cancel() {
      this.handleClose();
    },
    handleAdd() {
      this.table.isShow = true;
      this.table.dialogType = 0;
      this.table.dialogForm = {
        name: "",
        addr: "",
        age: "",
        birth: "",
        sex: "",
      };
    },
    editUser(row) {
      this.operateType = "edit";
      this.isShow = true;
      this.operateForm = row;
    },
    delUser(row) {
      this.$confirm("此操作将永久删除该文件，是否继续？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        const id = row.id;
        this.$http
          .get("/user/del", {
            params: { id },
          })
          .then(() => {
            this.$message({
              type: "sucess",
              message: "删除成功",
            });
            this.getList();
          });
      });
    },
    // 获取列表数据
    getList() {
      // 获取用户数据
      this.$store.dispatch("getLIST");
    },
    // 搜索
    handleSearch() {
      this.getList();
      console.log("aaa", this.$store.state.table.searchForm);
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style lang="less" scoped>
.manage {
  height: 90%;
  .manage-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    /deep/.el-form {
      &.el-form--inline {
        height: 100%;
        display: flex;
        align-items: center;
        div.el-form-item {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>