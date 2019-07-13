<template>
    <div class="wrapper">
        <el-table :data="tableData" style="width:710px;cursor:pointer;margin-left: 50px;" :show-header="false" @row-click="handclick">
            <el-table-column prop="title" label="主题" width="300"></el-table-column>
            <el-table-column prop="author" label="作者" width="100"></el-table-column>
            <el-table-column prop="sum" label="评论总数" width="100" align="center">
                <template slot-scope="scope">
                    <span class="el-icon-news">{{scope.row.sum}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="createdate" label="日期" width="200" align="center"></el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" style="width:710px;text-align:right;margin-top:10px;"
            :current-page.sync="currentpage"
            :page-size="10"
            @current-change="handCurrentChange"
            :total="total">
        </el-pagination>
        <!-- <div class="create">
            <el-button type="primary">发布帖子</el-button>
        </div> -->
    </div>
</template>

<script>
export default {
    data() {
        return {
            cookieTable : [],
            tableData : [],
            currentpage : 1,
            total : 0
        }
    },

    methods : {
        handCurrentChange() {
            this.tableData = this.cookieTable.slice((this.currentpage - 1) *　10, (this.currentpage - 1) *　10 + 10)
        },
        handclick(row, event, column) {
            this.$router.push({path:'/reply',query:row})
        }
    },
    created() {
        this.$axios({
            method: 'get',
            url: '/community'
        }).then(res => {
            if (res.status == 200) {
               this.cookieTable = res.data;
               this.total = res.data.length;
               this.handCurrentChange();
            }
        })
    }
}
</script>

<style lang="less" scoped>
.wrapper{
    position: relative;
}
.create{
    position: absolute;
    top: 20px;
    right: 400px;
}
</style>

