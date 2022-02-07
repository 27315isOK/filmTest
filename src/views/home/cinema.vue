<template>
  <div>
    <van-list>
      <van-card v-for="(item, index) in list" :key="index" @click="goinfo(item)">
        <template #desc>
          <div class="box" >
            <div class="left">
              <div class="cname">{{ item.name }}</div>
              <div class="addres">{{ item.address }}</div>
            </div>
            <div class="right">
              <div class="price">
                <i>¥</i> {{ item.lowPrice / 100 }} <span>起</span>
              </div>
              <div class="distance">
                {{
                  item.Distance ? item.Distance.toFixed(2) + "公里" : "距离未知"
                }}
              </div>
            </div>
          </div>
        </template>
      </van-card>
    </van-list>
    <div style="height: 50px"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.$axios
      .get("cinemaList",{params:{cityId:this.$store.state.city.cityId}})
      .then((res) => {
        console.log(res);
        this.list = res.data.cinemas;
      })
      .catch((err) => {
        alert("出错了");
      });
  },
  methods: {
      goinfo(info){
          this.$router.push({name:'cinfo',params:{id:info.cinemaId}})
      }
  },
};
</script>
<style scoped>
.van-card {
  padding: 0;
  background-color: #fff;
  height: 75.5px;
}
.van-card__content {
  min-height: 75.5px;
}

.box {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 15px;
  padding-top: 15px;
  padding-bottom: 15px;
  align-items: center;
  border-bottom: 1px solid #f4f4f4;
}

.cname {
  color: #191a1b;
  font-size: 15px;
}

.addres {
  color: #797d82;
  font-size: 12px;
  margin-top: 5px;
  width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.price {
  color: #ff5f16;
  font-size: 15px;
}

.price i {
  font-size: 11px;
  font-style: normal;
  transform: scale(0.9);
}

.price span {
  font-size: 10px;
  font-style: normal;
  transform: scale(0.8);
}

.distance {
  margin-top: 5px;
  color: #797d82;
  font-weight: 400;
}
</style>