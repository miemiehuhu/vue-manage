<template>
  <el-form
    ref="localForm"
    label-width="100px"
    :model="localForm"
    :inline="localInline"
  >
    <el-form-item
      v-for="item in localFormLabel"
      :key="item.label"
      :label="item.label"
    >
      <el-input
        v-if="item.type === 'input'"
        :placeholder="'请输入' + item.label"
        v-model="localForm[item.model]"
      ></el-input>
      <el-switch
        v-if="item.type === 'switch'"
        v-model="localForm[item.model]"
      ></el-switch>
      <el-date-picker
        v-if="item.type === 'date'"
        type="date"
        value-format="yyyy-MM-dd"
        placeholder="选择日期"
        v-model="localForm[item.model]"
      ></el-date-picker>
      <el-select
        v-if="item.type === 'select'"
        placeholder="请选择"
        v-model="localForm[item.model]"
      >
        <el-option
          v-for="item in item.opts"
          :key="item.value"
          :label="item.label"
          v-model="item.value"
        ></el-option>
      </el-select>
    </el-form-item>
    <el-form-item><slot></slot></el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "CommonForm",
  // 用于接收form的相关配置
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {
      localFormLabel: this.formLabel,
      localForm: this.form,
      localInline: this.inline,
    };
  },
};
</script>