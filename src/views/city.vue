<template>
  <div>
    <div v-if="list">
      <van-index-bar :index-list="Object.keys(dict)">
        <div v-for="(val, key, index) in dict" :key="index">
          <van-index-anchor :index="key" />
          <van-cell
            :title="city.name"
            v-for="(city, idx) in val"
            :key="idx"
            @click="selcity(city)"
          />
        </div>
      </van-index-bar>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
    };
  },
  methods: {
    selcity(city) {
      this.$store.commit("setCity", city);
      this.$router.back();
    },
  },
  mounted() {
    this.$axios.get("city").then((res) => {
      console.log(res.data.cities);
      this.list = res.data.cities;

    });
  },
  computed: {
    dict() {
      var data = this.list;
      var field = "pinyin";

      var letter_reg = /^[A-Z]$/;
      var list = new Array();
      for (var i = 0; i < data.length; i++) {
        // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
        list["#"] = new Array();
        // 首字母 转 大写英文
        var letter = data[i][field].substr(0, 1).toUpperCase();
        // 是否 大写 英文 字母
        if (!letter_reg.test(letter)) {
          letter = "#";
        }
        // 创建 字母 分组
        if (!(letter in list)) {
          list[letter] = new Array();
        }
        // 字母 分组 添加 数据
        list[letter].push(data[i]);
      }
      // 转换 格式 进行 排序；
      var resault = new Array();
      for (var key in list) {
        resault.push({
          letter: key,
          list: list[key],
        });
      }
      resault.sort(function (x, y) {
        return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
      });
      // # 号分组 放最后
      var last_arr = resault[0];
      resault.splice(0, 1);
      resault.push(last_arr);

      // 转换 数据 格式
      var json_sort = {};
      for (var i = 0; i < resault.length; i++) {
        json_sort[resault[i].letter] = resault[i].list;
      }
      console.log(json_sort);
      return json_sort;
    },
  },
};
</script>
<style scoped>
</style>