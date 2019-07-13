<template>
    <div class="wrapper">
        <el-carousel :interval="40000" type="card" height="380px">
            <el-carousel-item v-for="item in imgUrl" :key="item">
                <img :src="item" alt="">
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script>
export default {
    data() {
        return {
            imgUrl : ['../../static/images/1.jpg', '../../static/images/2.jpg', '../../static/images/3.jpg', '../../static/images/4.jpg', '../../static/images/5.jpg']
        }
    }
}
</script>

<style lang="less" scoped>
.wrapper{   
    /deep/ .el-carousel__indicators--outside button{
        background-color: #409eff;
    }
    /deep/ .el-carousel__button{
        height: 5px;
    }
}
</style>


