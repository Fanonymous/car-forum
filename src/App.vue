<template>
    <div id="app">
          <el-menu class="el-menu-demo" :default-active="index" mode="horizontal" background-color="rgb(84, 92, 100)" text-color="#fff" active-text-color="#409eff">
              <el-menu-item index="1" @click="index = '1'">
                  <router-link to="/">首页</router-link>
              </el-menu-item>
              <el-menu-item index="2" @click="index = '2'">
                 <router-link to="/community">社区</router-link>
              </el-menu-item>
          </el-menu>

          <div class="person-mess">
              <span class="el-icon-user"></span>
              <span class="login-but" v-if="!username" @click="toLogin">登录</span>
              <span>{{username}}</span>
          </div>
          <router-view></router-view>

          <div class="footer-copyright">
            © 2004-2019 All Rights Reserved. 汽车论坛 版权所有
          </div>
    </div>
</template>

<script>
import store from './store'
export default {
    data() {
        return {
            index : '1',
        }
    },

    methods : {
        toLogin() {
            this.$router.push({path:'/login'})
        }
    },

    mounted() {
        this.$router.push({path:'/'})
    },

    computed : {
        username() {
            return store.state.user.username
        }
    }
}
</script>

<style lang="less" scoped>
#app{
    position: relative;
}
.footer-copyright{
    width: 100%;
    text-align: center;
    line-height: 50px;
    position: fixed;
    bottom: 0;
}
.person-mess{
    position: absolute;
    top: 16px;
    right: 40px;
    font-size: 18px;
    cursor: pointer;
    color: #fff;
}
.login-but:hover{
    color: #f00;
}
</style>

<style>
a{
text-decoration: none;
}
.wrapper{
    height: 530px;
    overflow-y: auto;
}
</style>


