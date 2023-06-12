<template>
    <div class="head">
        
        <el-table :data="papers" style="width: 100%">
            <el-table-column fixed prop="id" label="科研编号" width="150" />
            <el-table-column prop="userId" label="用户编号" width="120" />
            <el-table-column prop="name" label="论文题目" width="120" />
            <el-table-column prop="type" label="论文类型" width="120" />
            <el-table-column prop="publication" label="刊物" width="120" />
            <el-table-column prop="publicationCate" label="刊物种类" width="120" />
            <el-table-column prop="count" label="引用次数" width="120" />
            <el-table-column prop="attachment" label="佐证材料" width="120" />
            
            
            <el-table-column fixed="right" label="Operations" width="120" v-if="admin">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)">修改</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="pageinfo.totalpage" :page-size="pageinfo.pageSize"
            @current-change="pageChange" />

    </div>
    <!-- <el-row justify="center">
        <el-col :span="4"><el-button link type="primary" @click="add">确认添加</el-button></el-col>

    </el-row> -->
</template>

<script>
import { defineComponent } from "vue"
import { getPaper } from '@/http/index'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            papers:[],
            paper: {//自己取 里面的内容就是老师提供的表，在那个api文档也可以看 可以直接cv 我的视频有说
                "attachment": "",
                "count": 0,
                "id": 0,
                "name": "",
                "publication": "",
                "publicationCate": "",
                "publishTime": "",
                "type": "",
                "userId": 0
            },
            rules: {},
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
            EditDialogVisible: false,
            admin:false
        }
    },
    mounted(){
        this.get()
        if(JSON.parse(localStorage.getItem('admin'))){
            this.admin=JSON.parse(localStorage.getItem('admin'))
        }else{
            this.admin=false;
        }
    },
    methods: {
        pageChange(currentPage) {
            this.pageinfo.currentPage = currentPage;
            this.get();//记得改 改成和 176行一样的名字，都以176行的名字改
            //console.log(this.dormitory)
        },
        //获取老师那个api库的内容函数 没有数据得自己加
        getall() {
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;

            getTeachers().then(res => {
                //const sortedDormitorys = res.data.dormitories
                if (res.success) {
                    this.teachers = res.data.teachers.slice(start, end);//去浏览器的控制台看名字 我发的视频里也有
                    this.pageinfo.totalpage = res.data.teachers.length;

                } else {

                    return false
                }

                //console.log(this.pageinfo.totalpage);
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })


        },
        get() {
            const userId = 4;
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;
            //this.getdata();
            getPaper(userId).then(res => {
                if (res.success) {
                    this.papers = res.data.papers.slice(start, end);//去浏览器的控制台看名字 我发的视频里也有
                    this.pageinfo.totalpage = res.data.papers.length;

                } else {

                    return false
                }
                
            }).catch(err => {
                ElMessage('系统错误')
                console.log(err)
            })
        },
        getdata() {
            this.publishTime = moment().format('YYYY-MM-DD HH:mm:ss');
            
        },
    }
});
</script>

<style lang="scss" scoped></style>
