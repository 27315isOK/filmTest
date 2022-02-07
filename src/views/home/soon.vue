<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-card v-for="item in list" :key="item.filmID" @click="goinfo(item)">
        <template #desc>
          <div class="box">
            <div class="img">
              <img :src="item.poster" />
            </div>
            <div class="desc">
              <div class="title">
                {{ item.name }}
                <span class="lable1">{{ item.filmType.name }}</span>
              </div>
              <div class="act">
                <template v-if="item.grade">
                  观众评分
                  <span class="grade">{{ item.grade }}</span>
                </template>
              </div>
              <div class="act">
                主演:
                <template v-for="act in item.actors">
                  {{ act.name }}
                </template>
              </div>
              <div class="act">上映日期:{{ toWMD(item.premiereAt) }}</div>
            </div>
            <div class="btu">
              <van-button plain type="info" color="#ff5f16" size="mini" hairline
                >预购</van-button
              >
            </div>
          </div>
        </template>
      </van-card>
    </van-list>
    <div style="height: 100px"></div>
  </div>
</template>
<script>
import { Toast } from "vant";
import time from '@/utils/timeformat.js'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
    };
  },

  methods: {
    ...time,
    onLoad() {
      this.loading = true;
      this.$axios
        .get("soon")
        .then((res) => {
          if (res.status === 0) {
            var maxpage = Math.ceil(res.data.total / 10);
            if (this.pageNum < maxpage) {
              this.pageNum++;
            } else {
              this.finished = true;
            }
            this.list = [...this.list, ...res.data.films];
            this.loading = false;
          } else {
            Toast.fail("请求数据失败");
          }
        })
        .catch((err) => {
          Toast.fail("请求数据失败");
        });
    },
    goinfo(info) {
      this.$router.push({name:'info',params:{id:info.filmId}})
    },
  },

  mounted() {
    time.toWMD(1641600000)
  },
};
</script>
<style scoped>
.van-card {
  padding: 0;
  background-color: #fff;
}

.box {
  height: 124px;
  padding: 15px 15px 15px 0;
  box-sizing: border-box;
  margin-left: 15px;
  border-bottom: 1px solid #ededed;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.img {
  width: 66px;
  height: 94px;
}

.img img {
  width: 66px;
  height: 94px;
}

.desc {
  flex: 1;
  margin-left: 10px;
  margin-right: 10px;
}

.title {
  color: #191a1b;
  font-size: 16px;
  height: 22px;
}

.act {
  font-size: 13px;
  margin-top: 4px;
  color: #797d82;
  height: 18px;
  line-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
}

.lable1 {
  font-size: 9px;
  color: #fff;
  background-color: #d2d6dc;
  height: 14px;
  line-height: 14px;
  padding: 0 2px;
  border-radius: 2px;
  transform: scale(0.8);
}

.grade {
  color: #ffb232;
  font-size: 14px;
}
</style>