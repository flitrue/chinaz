<template>
  <div class="page">
    <div>总量：{{ count }}</div>
    <Row>
      <Col span="16">
      <div id="line-chart"></div>
      </Col>
      <Col span="8">
      <div id="pie-chart"></div>
      </Col>
      <Col span="24">
      <Card>
        <p slot="title">
          行业排名
        </p>
        <span slot="extra">当前行业：{{ industry }}</span>
        <ul>
          <li class="li" v-for="(item,index) in list" :key="index">
            <div class="title">
              {{ (page - 1) * size + index + 1 }}、{{ item.name }} | {{ item.domain }}
            </div>
            <div class="info">
              <span class="span">alexa周排名：{{ item.alexa }}</span>
              <span class="span">百度权重为：{{ item.baidu }}</span>
              <span class="span">PR：{{ item.PR }}</span>
              <span class="span">反链数：{{ item.outlink }}</span>
              <span class="span">得分：{{ item.score }}</span>
            </div>
            <div class="content">
              {{ item.introduction }}
            </div>
          </li>
        </ul>
      </Card>
      <Page
        style="margin-top: 20px;"
        :current="page"
        :page-size="size"
        :total="total"
        @on-change="change"
      />
      </Col>
    </Row>
  </div>
</template>

<script>
import { url } from "@/configs/index.js";

export default {
  data() {
    return {
      industry_list: [],
      list: [],
      count: 0,
      page: 1,
      size: 10,
      total: 0,
      industry: "综合其他"
    };
  },
  methods: {
    change(page) {
      this.page = page;
      this.list = [];
      this.getList();
    },
    getList() {
      // http://192.168.1.143:8080/category/industry=%E7%BB%BC%E5%90%88%E5%85%B6%E4%BB%96&page=1
      fetch(url + "/category/industry="+ this.industry +"&page=" + this.page, {
        method: "GET",
        mode: "cors"
      }).then(res => {
        return res.json();
      }).then(data => {
        this.total = data.num;
        this.list = data.list;
      })
    },
    getData() {
      fetch(url + "/industry", {
        method: "GET",
        mode: "cors"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.count = _.reduce(
            data,
            (memo, item) => {
              return memo + item.industry_count;
            },
            0
          );
          this.industry_list = data;
          this.drawBar();
          this.drawPie();
        })
        .catch(err => {
          console.log("请求错误", err);
        });
    },
    drawBar() {
      let bar_option = {
        tooltip: {
          show: true
        },
        color: ["#3398DB"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            },
            axisLabel: {
              rotate: 90
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "地区占比",
            type: "bar",
            data: []
          }
        ]
      };
      bar_option.xAxis[0].data = _.map(this.industry_list, item => {
        return item.industry;
      });
      bar_option.series[0].data = _.map(this.industry_list, item => {
        return item.industry_count;
      });
      let chart = echarts.init(document.getElementById("line-chart"));
      chart.setOption(bar_option);
      chart.on("click", params => {
        this.page = 1;
        this.industry = params.name;
        this.getList();
      })
    },
    drawPie() {
      let pie_option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 20,
          bottom: 20,
          data: []
        },
        series: [
          {
            name: "地区占比",
            type: "pie",
            radius: "55%",
            center: ["40%", "50%"],
            data: [],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      pie_option.legend.data = _.map(this.industry_list, item => {
        return item.industry;
      });
      pie_option.series[0].data = _.map(this.industry_list, item => {
        let obj = {
          name: item.industry,
          value: item.industry_count
        };
        return obj;
      });
      let chart = echarts.init(document.getElementById("pie-chart"));
      chart.setOption(pie_option);
      chart.on("click", params => {
        this.page = 1;
        this.industry = params.name;
        this.getList();
      })
    }
  },
  mounted() {
    this.getData();
    this.getList();
  }
};
</script>

<style>
.page {
  background-color: #fff;
  min-height: 100%;
  width: 80%;
  margin: 0 auto;
  padding: 20px;
}

#line-chart {
  width: 100%;
  height: 300px;
}

#pie-chart {
  width: 400px;
  height: 400px;
}

.title {
  font-weight: bold;
  font-size: 14px;
}

.info {
  font-size: 12px;
  color: #f00;
  padding: 5px 0;
}

.li {
  border-bottom: 1px solid #ddd;
  padding: 10px;
}

.span {
  margin-right: 10px;
}
</style>
