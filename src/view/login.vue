<template>
    <div class="wrapper">
        <div class="box">
            <h3>欢迎登录</h3>
            <el-input v-model="username" prefix-icon="el-icon-user"></el-input>
            <el-input v-model="password" show-password prefix-icon="el-icon-s-goods"></el-input>
            <div class="login-btn" @click="login">登&nbsp;&nbsp;&nbsp;&nbsp;录</div>
        </div>
    </div>
</template>

<script>
import * as types from '../store/type'
export default {
    data() {
        return {
            username : '',
            password : '',
        }
    },
    methods : {
        login() {
            if (this.username && this.password) {
                this.$axios({
                    method: 'get',
                    url: '/login?username=' + this.username + '&password=' + this.password
                }).then(res => {
                    if (res.status == 200 && res.data.flag) {
                        this.$store.commit(types.LOGIN, {username:res.data.mini,accout:this.username})
                        this.$router.go(-1);
                    }else {
                        this.$message.warning('用户名或密码错误');
                    }
                })
            }else {
                this.$message.warning('请填写用户名和密码！');
            }
        },
    },
    mounted() {
        this.$store.commit(types.TITLE, 'Login');
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    position: relative;
    height: 538px;
    background-image: url('../../static/images/bg.jpg');
    background-size: 100% 100%;
}
.box{
    width: 340px;
    background-color: #fff;
    border-radius: 4px;
    /deep/ .el-input{
        margin-bottom: 10px;
        width: 300px;
        margin-left: 20px;
    }
    position: absolute;
    right: 150px;
    top: 100px;
    h3{
        text-align: center;
        color: #f70;
    }
}
.login-btn{
    height: 38px;
    margin: 0 19px;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    line-height: 38px;
    text-align: center;
    background-color: #ff7700;
    // letter-spacing: 7px;
    cursor: pointer;
    margin-bottom: 10px;
    border-radius: 4px;
}

</style>


