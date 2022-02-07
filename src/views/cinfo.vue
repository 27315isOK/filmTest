<template>
  <div class="all">
    <div class="back" @click="back">
      <img src="@/assets/back.png" >
    </div>
    <div class="cname">{{ info.name }}</div>

    <div class="labelbox">
      <span v-for="(item, index) in info.services" :key="index">{{
        item.name
      }}</span>
    </div>

    <div class="apbox">
      <div>
        <span class="iconfont icon-icon-test"></span>
        <span>{{ info.address }}</span>
      </div>
      <div>
        <!-- <a href="mailto://zlin18@126.com">111</a> -->
        <a :href="'tel://' + info.phone" class="iconfont icon-dianhua"></a>
      </div>
    </div>

    <div class="moviebox">
      <div class="swiper-container mySwiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item, index) in list" :key="index">
            <img :src="item.poster" alt="" />
          </div>
        </div>
      </div>
    </div>

    <div class="infobox">
      <div class="titlebox" v-if="list[index]">
        <span class="title">{{ list[index].name }}</span>
        <span class="score"
          ><i>{{ list[index].grade }}</i
          ><small>分</small>
        </span>
      </div>
      <div class="movieinfo" v-if="list[index]">
        {{ list[index].category }} | {{ list[index].runtime }} 分钟 |
        <template v-for="(item, idx) in list[index].actors">
          {{ item.name }}
          <span :key="idx" v-if="idx < list[index].actors.length - 1">|</span>
        </template>
      </div>
    </div>

    <van-tabs v-if="list[index]" @change="tabchange">
      <van-tab
        :key="index"
        :name="item"
        :title="toTime(item)"
        v-for="(item, index) in list[index].showDate"
      ></van-tab>
    </van-tabs>

    <router-view />
  </div>
</template>
<script>
import swiper from "swiper"; //导入swiper插件
import "swiper/dist/css/swiper.css"; //导入swiper样式
import "@/assets/font/iconfont.css";
import time from "@/utils/timeformat";

export default {
  data() {
    return {
      info: {},
      list: [],
      index: 0,
    };
  },
  mounted() {
    var that = this;
    this.$axios
      .get("cinemaInfo", {
        params: { cinemaId: this.$route.params.id },
      })
      .then((res) => {
        // console.log(res),
        this.info = res.data.cinema;
      })
      .catch((err) => {
        alert("详情出错了");
      });

    this.$axios
      .get("filmSchedule", {
        params: { cinemaId: this.$route.params.id },
      })
      .then((res) => {
        // console.log(res),
        this.list = res.data.films;
        this.$router.replace(
          `/cinfo/${this.$route.params.id}/${this.list[0].filmId}/${this.list[0].showDate[0]}`
        );

        this.$nextTick(() => {
          new swiper(".mySwiper", {
            spaceBetween: 30,
            slidesPerView: 3,
            centeredSlides: true,
            freeMode: true,
            on: {
              slideChange() {
                // console.log(this.activeIndex)
                that.index = this.activeIndex;
              },
              click() {
                // console.log(this.clickedIndex)
                this.slideTo(this.clickedIndex); // 点击第几个就滑动到第几个

                that.$router.push(
                  `/cinfo/${that.$route.params.id}/${
                    that.list[that.index].filmId
                  }`
                );
              },
            },
          });
        });
      })
      .catch((err) => {
        alert("排片出错了");
      });

    // 当影院详情页打开, 就跳转到 第一部电影的第一天的播放时间排片
  },
  methods: {
    ...time,
    back(){
      this.$router.replace('/cinema')
    },
    tabchange(index) {
      var that = this;
      // console.log(index)
      // this.$router.push(`/cinfo/${this.$route.params.id}/${index}`)
      that.$router.push(
        `/cinfo/${that.$route.params.id}/${
          that.list[that.index].filmId
        }/${index}`
      );
    },
  },
};
</script>
<style scoped>
.all {
  position: relative;
}
.back {
  position: absolute;
  left:15px;
  top:2px;
}
.back img{
  width: 25px;
}
.cname {
  text-align: center;
  font-size: 17px;
  color: #191a1b;
  margin-top: 10px;
  line-height: 30px;
  height: 30px;
}

.labelbox {
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #ededed;
}

.labelbox > span {
  border: 1px solid #ffb232;
  color: #ffb232;
  font-size: 12px;
  padding: 2px 5px;
  transform: scale(0.78);
}

.apbox {
  display: flex;
  padding: 5px 15px;
  height: 50px;
  justify-content: space-between;
  align-items: center;
}

.moviebox {
  height: 160px;
  width: 100%;
  border: 1px solid red;
  box-sizing: border-box;
  padding: 15px 0;
}

.swiper-container {
  width: 100%;
  height: 100%;
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  transition: 300ms;
  transform: scale(0.8);
  width: 90px;
  height: 130px;
}

.swiper-slide > img {
  width: 90px;
  height: 130px;
}
.swiper-slide-active,
.swiper-slide-duplicate-active {
  transform: scale(1);
}
.title {
  font-size: 15px;
  color: #191a1b;
}

.titlebox {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.score {
  color: #ffb232;
}

.movieinfo {
  width: 85%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-left: auto;
  margin-right: auto;
}

.infobox {
  border-bottom: 1px solid #ededed;
  padding-bottom: 20px;
}
</style>