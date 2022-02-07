<template>
  <div>
    <router-view />
    <van-tabbar v-model="active" @change="tabchange">
      <van-tabbar-item icon="tv-o">电影</van-tabbar-item>
      <van-tabbar-item icon="home-o">影院</van-tabbar-item>
      <van-tabbar-item icon="comment-o">新闻</van-tabbar-item>
      <van-tabbar-item icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    if (this.$route.name === "cinema") {
      this.active = 1;
    } else if (this.$route.name === "news") {
      this.active = 2;
    } else if (this.$route.name === "mine") {
      this.active = 3;
    } else if (this.$route.name === "movie") {
      this.active = 0;
    }
  },
  methods: {
    tabchange(active) {
      if (active === 0) {
        this.$router.push("/movie");
      } else if (active === 1) {
        this.$router.push("/cinema");
      } else if (active === 2) {
        this.$router.push("/news");
      } else if (active === 3) {
        this.$router.push("/mine");
      }
    },
  },
};
</script>
