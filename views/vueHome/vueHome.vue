<template>
  <el-row class="home" :gutter="20">
    <!-- 左侧col -->
    <el-col :span="10" style="margin-top: 20px">
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
      <el-card style="margin-top: 20px; height: 370px" shadow="hover">
        <el-table :data="tableData">
          <el-table-column
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          >
          </el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <!-- 右侧col -->
    <el-col :span="14" style="margin-top: 20px">
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
            <p class="value">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 图表 -->
      <el-card class="graph-card" style="height: 280px">
        <!-- <div style="height: 280px" ref="echarts"></div> -->
        <echart :ChartData="echartData.order" style="height: 280px" />
      </el-card>
      <div class="graph">
        <el-card style="height: 260px; width: 48%">
          <!-- <div style="height: 240px" ref="userEcharts"></div> -->
          <echart :ChartData="echartData.user" style="height: 240px" />
        </el-card>
        <el-card style="height: 260px; width: 48%">
          <!-- <div style="height: 240px" ref="videoEcharts"></div> -->
          <echart :ChartData="echartData.video" :isAxisChart="false" style="height: 240px" />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getData } from "../../api/data.js";
// import * as echarts from "echarts";
import Echart from "../../src/components/ECharts.vue";

export default {
  name: "vueHome",
  components: {
    Echart,
  },
  data() {
    return {
      userImg: require("../../src/assets/images/user.jpg"),
      tableData: [],
      tableLabel: {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买",
      },
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
    getData().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        const keyArray = Object.keys(order.data[0]);
        const series = [];
        keyArray.forEach((key) => {
          series.push({
            name: key,
            data: order.data.map((item) => item[key]),
            type: "line",
          });
        });

        // 折线图
        this.echartData.order.xData = xData
        this.echartData.order.series = series

        // 用户柱状图
        this.echartData.user.xData = data.userData.map((item) => item.date),
        this.echartData.user.series = [
            {
              name: "新增用户",
              data: data.userData.map((item) => item.new),
              type: "bar",
            },
            {
              name: "活跃用户",
              data: data.userData.map((item) => item.active),
              type: "bar",
            },
          ]

        // 饼图
        this.echartData.video.series = [
            {
              data: data.videoData,
              type: "pie",
            },
          ]
      }
    });
  },
};
</script>