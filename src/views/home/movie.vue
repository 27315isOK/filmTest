<template>
  <div>
    <banner></banner>
    <van-tabs v-model="active" :border="true" @change="change">
      <van-tab title="正在热映"></van-tab>
      <van-tab title="即将上映"></van-tab>
    </van-tabs>

    <router-view />
  </div>
</template>

<script>
import banner from "@/components/Banner.vue";
export default {
  data() {
    return {
      active: 0,
    };
  },
  mounted() {
    if (this.$route.name === "hot") {
      this.active = 0;
    } else if (this.$route.name === "soon") {
      this.active = 1;
    }
  },
  components: {
    banner,
  },
  methods: {
    change(name) {
      if (name === 0) {
        this.$router.push({ name: "hot" });
      } else if (name === 1) {
        this.$router.push({ name: "soon" });
      }
    },
  },
};
</script>
<style scoped>
</style>