<template>
  <div class="page">
    <Card>
      <p slot="title">
        网站排行
      </p>
      <span slot="extra">更新时间：{{date}}</span>
      <div>
        <ButtonGroup>
          <Button
            v-for="(item,index) in btns"
            :key="index"
            :type="sort_key==item.label?'primary':'default'"
            @click="handler(index)"
          >{{item.name}}</Button>
        </ButtonGroup>
      </div>
      <ul>
        <li class="li" v-for="(item,index) in list" :key="index">
          <div class="title">{{(page - 1) * size + index + 1}}、{{item.name}} | {{item.domain}}</div>
          <div class="info">
            <span class="span">alexa周排名：{{item.alexa}}</span>
            <span class="span">百度权重为：{{item.baidu}}</span>
            <span class="span">PR：{{item.PR}}</span>
            <span class="span">反链数：{{item.outlink}}</span>
            <span class="span">得分：{{item.score}}</span>
          </div>
          <div class="content">{{item.introduction}}</div>
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
  </div>
</template>

<script>
import { url } from "@/configs/index.js";

export default {
  data() {
    return {
      btns: [
        {
          name: "综合",
          label: "score"
        },
        {
          name: "Alexa周",
          label: "alexa"
        },
        {
          name: "百度权重",
          label: "baidu"
        },

        {
          name: "PR",
          label: "pr"
        },
        {
          name: "反链接数",
          label: "outlink"
        }
      ],
      list: [],
      sort_key: "score",
      page: 1,
      size: 5,
      total: 0,
      date: ""
    };
  },
  methods: {
    change(page) {
      this.page = page;
      this.list = [];
      this.getList();
      this.getDate();
    },
    handler(index) {
      this.list = [];
      this.sort_key = this.btns[index].label;
      this.getList();
      this.getDate();
    },
    getDate() {
      fetch(url + "/update", {
        method: "GET",
        mode: "cors"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.date = data.update_date;
        })
        .catch(err => {
          console.log("请求错误", err);
        });
    },
    getList() {
      fetch(url + "/lists/" + this.sort_key + "/" + this.page, {
        method: "GET",
        mode: "cors"
      })
        .then(res => {
          return res.json();
        })
        .then(data => {
          this.total = data.num;
          this.list = data.list;
        })
        .catch(err => {
          console.log("请求错误", err);
        });
    }
  },
  mounted() {
    this.getDate();
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
