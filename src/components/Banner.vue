<template>
  <div class="all">
    <div class="city" @click="gocity">
      {{this.$store.state.city.name}}
    </div>
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image.imgUrl" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>     
<script>
export default {
  data() {
    return {
      images: [],
    };
  },
  methods:{
    gocity(){
      this.$router.push('/city')
    }
  },
  mounted() {
    this.$axios.get("banners").then((res) => {
      this.images = res.data;
    });
  },
};
</script>
<style  scoped>
.all{
  position: relative;
}
.city{
  position: absolute;
  left: 15px;
  top:15px;
  z-index: 9999;
  background-color: rgb(255,255,255, 0.5);
  padding: 5px;
  border-radius: 3px;
}
.my-swipe {
  height: 210px;
  overflow: hidden;
  /* border: 1px solid blue; */
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.van-swipe-item img {
  width: 100%;
}
</style>