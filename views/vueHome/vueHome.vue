<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧col -->
    <el-col :span="8" style="padding-right: 10px">
      <!-- 管理员卡片 -->
      <el-card class="info-wrapper" shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="user-info">
            <p class="name">Admin</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间：<span>2021-7-19</span></p>
          <p>上次登录地点：<span>武汉</span></p>
        </div>
      </el-card>
      <!-- 购买情况卡片 -->
      <el-card style="margin-top: 20px; height: 100%" shadow="hover">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
            width="68"
            header-align="center"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧col -->
    <el-col :span="16" style="padding-left: 10px">
      <!-- 订单情况卡片 -->
      <div class="num">
        <el-card
          class="num-card"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="price">￥{{ item.value }}</p>
            <p class="desc">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 图表 -->
      <el-card class="line-chart">
        <!-- 折线图 -->
        <div ref="echarts1" style="height: 240px; width: 650px"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图 -->
        <el-card style="height: 260px; width: 290px">
          <div ref="echarts2" style="height: 240px; width: 280px"></div>
        </el-card>
        <!-- 饼状图 -->
        <el-card 
          :body-style="{'padding-top':'10px'}"
          style="height: 260px; width: 350px">
          <div ref="echarts3" style="height: 240px; width: 320px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/index.js";
import * as echarts from "echarts";

export default {
  name: "vueHome",
  data() {
    return {
      userImg: require("../../src/assets/images/user.jpg"),
      // 左侧表格数据
      tableData: [],
      // 左侧表格表头
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
      // 右侧数据
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 1234,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    // 获取数据
    getData().then(({ data }) => {
      // 左侧表格数据
      const { tableData, orderData, userData, videoData } = data.data;
      this.tableData = tableData;

      // 折线图
      // 基于准备好的dom，初始化echarts实例
      const echarts1 = echarts.init(this.$refs.echarts1);
      // 指定图表的配置项和数据
      var echarts1Option = {};
      // 处理数据xAxis
      const brand = Object.keys(orderData.data[0]); // 品牌名称
      echarts1Option.xAxis = {
        // x轴日期
        data: orderData.date,
      };
      echarts1Option.yAxis = {}; // y轴不配置，默认显示数量
      echarts1Option.legend = {
        data: brand,
      };
      echarts1Option.series = [];
      brand.forEach((key) => {
        echarts1Option.series.push({
          name: key,
          data: orderData.data.map((item) => item[key]),
          type: "line",
        });
      });
      // 根据配置和数据显示图表
      echarts1.setOption(echarts1Option);

      // 柱状图
      const echarts2 = echarts.init(this.$refs.echarts2);
      var echarts2Option = {};
      echarts2Option.xAxis = {
        data: userData.map((item) => item.date),
      };
      echarts2Option.legend = {
        data: ["新增用户", "活跃用户"],
      };
      echarts2Option.yAxis = {};
      echarts2Option.series = [
        {
          name: "新增用户",
          type: "bar",
          data: userData.map((item) => item.new),
        },
        {
          name: "活跃用户",
          type: "bar",
          data: userData.map((item) => item.active),
        },
      ];
      echarts2.setOption(echarts2Option);

      // 饼状图
      const echarts3 = echarts.init(this.$refs.echarts3);
      const echarts3Option = {};
      echarts3Option.series = [{ type: "pie", data: videoData }];
      echarts3.setOption(echarts3Option);
    });
  },
};
</script>

<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;

  img {
    width: 100px;
    height: 100px;
    margin-right: 40px;
    border-radius: 50%;
  }

  .user-info {
    .name {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .access {
      color: #999;
    }
  }
}

.login-info {
  p {
    line-height: 24px;
    font-size: 12px;
    color: #999;
    span {
      color: #666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .icon {
    width: 50px;
    height: 50px;
    font-size: 20px;
    text-align: center;
    line-height: 50px;
    color: #fff;
  }
  .detail {
    padding: 0;
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .price {
      font-size: 20px;
      line-height: 20px;
      margin-bottom: 5px;
    }
    .desc {
      font-size: 12px;
      color: #999;
      text-align: center;
    }
  }
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
}

.line-chart {
  height: 280px;
  width: auto;
}

.graph {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 48%;
  }
}
</style>