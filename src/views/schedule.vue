<template>
  <div>
    <van-list>
      <van-card v-for="(item, index) in list" :key="index">
        <template #desc>
          <div class="item">
            <div class="left">
              <div class="m_r20">
                <div class="cname">{{ toHM(item.showAt) }}</div>
                <div class="cadress">{{ toHM(item.endAt) }}散场</div>
              </div>

              <div>
                <div>{{ item.imagery }}</div>
                <div>{{ item.hallName }}</div>
              </div>
            </div>

            <div class="left">
              <div class="m_r20">
                <span class="symbal">¥</span>
                <span class="price">{{ item.salePrice / 100 }}</span>
              </div>

              <div class="distince">购买</div>
            </div>
          </div>
        </template>
      </van-card>
    </van-list>
  </div>
</template>
<script>
import time from "@/utils/timeformat";
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    ...time,
  },
  watch: {
    '$route': function () {
      this.$axios
        .get("playSchedule", {
          params: {
            cinemaId: this.$route.params.id,
            filmId: this.$route.params.fid,
            date: this.$route.params.time,
          },
        })
        .then((res) => {
          // console.log(res)
          this.list = res.data.schedules;
        });
    },
  },
  mounted() {
    console.log(this.$route);

    this.$axios
      .get("playSchedule", {
        params: {
          cinemaId: this.$route.params.id,
          filmId: this.$route.params.fid,
          date: this.$route.params.time,
        },
      })
      .then((res) => {
        // console.log(res)
        this.list = res.data.schedules;
      });
  },
};
</script>
<style scoped>
.m_r20 {
  margin-right: 20px;
}
.left {
  display: flex;
  align-items: center;
}

.van-card {
  height: 65px;
  padding: 0;
}
.item {
  height: 65px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  padding: 10px 15px;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
}

.cname {
  color: #191a1b;
  font-size: 15px;
  display: block;

  max-width: 80%;
  /* overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
  white-space: nowrap; */
}
.cadress {
  color: #797d82;
  font-size: 12px;
  margin-top: 5px;
}

.symbal {
  color: #ff5f16;
  font-size: 11px;
  transform: scale(0.9);
  font-weight: normal;
}

.distince {
  font-size: 11px;
  transform: scale(0.9);
  font-weight: normal;
  color: #797d82;
  margin-top: 5px;
}

.price {
  font-size: 15px;
  color: #ff5f16;
}

.upon {
  color: #ff5f16;
  font-size: 11px;
  transform: scale(0.7);
  font-weight: normal;
}
</style>