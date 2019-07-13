<template>
    <div class="wrapper">
        <div class="box">
            <h3 style="text-align: center;">{{rowParams.titleAll}}</h3>
            <div style="text-align: center;">
                <span>{{rowParams.author}}</span>
                <span>{{rowParams.createdate}}</span>
            </div>
            <p style="text-indent:2em;">{{rowParams.content}}</p>
            <div style="font-size: 18px;font-weight: bold;color: #409eff;">评论</div>
            <div class="reply-content">
                <div v-for="(item, index) in replyArr" :key="index" style="border-bottom: 1px solid #DCDFE6;">
                    <div>{{item.username}}</div>
                    <div style="padding-left:20px;padding-top:5px;padding-bottom:5px;">{{item.content}}</div>
                    <div>{{item.time}}</div>
                </div>
            </div>

            <div class="add-reply">
                <h3>添加评论</h3>
                <el-input type="textarea" :rows="3" placeholder="请输入内容" v-model="textarea"></el-input>
                <el-button type="primary" style="margin-top:5px;" @click="addReply">发表</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            replyArr : [],
            rowParams : null,
            textarea : ''
        }
    },

    methods : {
        addReply() {
            this.$axios({
                method: 'get',
                url: '/addReply?id=' + this.$route.query.id + '&username=' + localStorage.username + '&content=' + this.textarea
            }).then(res => {
                if (res.status == 200 && res.data.flag) {
                    this.$axios({
                        method: 'get',
                        url: '/getReply?id=' + this.$route.query.id
                    }).then(res => {
                        if (res.status == 200) {
                            this.replyArr = res.data;
                        }
                    })
                    this.$message.success('评论成功');
                    this.textarea = '';
                }
            })
        }
    },

    created() {
        this.rowParams = this.$route.query;
        this.$axios({
            method: 'get',
            url: '/getReply?id=' + this.$route.query.id
        }).then(res => {
            if (res.status == 200) {
               this.replyArr = res.data;
            }
        })
        console.log(this.$route.query)
    }
}
</script>

<style lang="less" scoped>
.box{
    width: 800px;
}
.reply-content{
    padding-left: 10px;
}
</style>


