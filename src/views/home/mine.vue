<template>
  <div class="box">
    <div class="m_t25">
      <input type="text" class="input1" placeholder="用户名" />
    </div>

    <div class="m_t25">
      <input type="password" class="input1" placeholder="密码" />
    </div>

    <div class="m_t25">
      <!-- a button(disabled)   -->
      <input type="button" class="login_btn" value="登录" />
    </div>

    <div class="m_t15">
      <div class="tar">
        <a href="#/sign" class="link_btn">注册</a>
      </div>
    </div>
  </div>
</template>

<script>
import style from '../../style.css'
export default {
  data() {
    return {
      
    };
  },
  mounted() {
      this.$axios()
  },
  methods: {},
  components: {},
  
};
</script>
<style scoped>
.box {
  box-sizing: border-box;
  padding-left: 10px;
  padding-right: 10px;
}

.input1 {
  appearance: none;
  -webkit-appearance: none;
  box-sizing: border-box;
  border: 1px solid #de3232;
  border-radius: 5px;
  width: 100%;
  min-width: 1px;
  height: 38px;
  padding-left: 10px;
  outline: none;
  font-size: 18px;
}
.input1::placeholder {
  color: #a5a5a5;
  font-size: 18px;
}

.login_btn {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  min-width: 1px;
  height: 38px;
  border-radius: 5px;
  background-color: #de3232;
  color: #ffffff;
  font-size: 18px;
  outline: none;
  text-align: center;
}
.link_btn {
  color: #4d35a6;
  font-size: 14px;
  text-decoration: underline;
}
</style>