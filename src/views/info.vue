<template>
  <div class="bg">
    <div class="back" @click="back">
      <img src="@/assets/back.png" />
    </div>
    <div class="img">
      <img :src="info.poster" />
    </div>

    <div class="infobox">
      <div class="tbox">
        <div class="name">
          {{ info.name }}
          <span class="lable1">{{ info.item.name }}</span>
        </div>
        <div class="grade">
          {{ info.grade }}
          <span class="fen">分</span>
        </div>
      </div>

      <div class="common_text">{{ info.category }}</div>
      <div class="common_text">{{ toYMD(info.premiereAt) }}上映</div>
      <div class="common_text">{{ info.nation }} {{ info.runtime }}分钟</div>
      <div class="common_text m_t10">{{ info.synopsis }}</div>
    </div>

    <div class="infobox m_t10">
      <div class="actbox">
        <div class="acttitle">演职人员</div>
        <div>
          <div class="swiper m_t15 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide acts" :key="index" v-for="(item, index) in info.actors">
                <div class="avatar">
                  <img :src="item.avatarAddress" />
                </div>
                <div class="text m_t5">{{ item.name }}</div>
                <div class="text">{{ item.role }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="infobox m_t10">
      <div class="actbox">
        <div class="acttitle">剧照</div>
        <div>
          <div class="swiper m_t15 swiper-container">
            <div class="swiper-wrapper">
              <div class="swiper-slide photos" :key="index" v-for="(item, index) in info.photos">
                <div class="photo" @click="show(index)">
                  <img :src="item" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import time from "@/utils/timeformat.js";

import swiper from "swiper"; //导入swiper插件
import "swiper/dist/css/swiper.css"; //导入swiper样式
import { ImagePreview } from "vant"; //图片预览的插件

export default {
  data() {
    return {
      info: {},
    };
  },
  methods: {
    ...time,
    back() {
      this.$router.replace('/movie/hot')
    },
    show(idx) {
      ImagePreview({
        images: this.info.photos,
        startPosition: idx,
        closeable: true,
      });
    },
  },
  mounted() {
    this.$axios
      .get("/filmInfo", { params: { filmId: this.$route.params.id } })
      .then((res) => {
        this.info = res.data.film;
        console.log(res);
      });

    this.$nextTick(() => {
      //$nextTick这个回调函数意思是，在上面html结构渲染完再创建这个回调函数里的实例
      new swiper(".swiper-container", {
        freeMode: true,
      });
    });
  },
};
</script>
<style scoped>
.back {
  position: absolute;
  left: 15px;
  top: 10px;
  z-index:1;
}
.back img{
  width: 25px;
}
.bg {
  position: relative;
  background-color: #f4f4f4;
}
.img {
  width: 100%;
  height: 210px;
  overflow: hidden;
}

.img img {
  width: 100%;
  transform: translateY(-30%);
}

.infobox {
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
}

.tbox {
  display: flex;
  justify-content: space-between;
  height: 27px;
  align-items: center;
}

.name {
  color: #191a1b;
  font-size: 18px;
}

.grade {
  font-size: 18px;
  font-style: italic;
  color: #ffb232;
}

.grade .fen {
  font-size: 12px;
}

.common_text {
  font-size: 13px;
  color: #797d82;
  margin-top: 5px;
}
.m_t10 {
  margin-top: 10px;
}

.acttitle {
  font-size: 16px;
  text-align: left;
  color: #191a1b;
  margin-bottom: 10px;
}

.avatar {
  width: 90px;
  height: 90px;
  overflow: hidden;
}
.m_t5 {
  margin-top: 5px;
}
.avatar > img {
  width: 100%;
  transform: translateY(-8px);
}
.text {
  font-size: 13px;
  color: #191a1b;
  font-weight: 300;
  text-align: center;
}
.acts {
  width: 90px !important;
  height: 130px;
  /* border: 1px solid red; */
  margin-right: 15px;
}
.photos {
  width: 150px !important;
  height: 100px;
  margin-right: 15px;
  overflow: hidden;
}
.photo > img {
  width: 100%;
}

.m_t15 {
  margin-top: 15px;
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

.swiper {
  width: 100%;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.m_t15 {
  margin-top: 15px;
}
</style>