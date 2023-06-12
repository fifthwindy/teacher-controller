<template>
    <el-form label-width="100px" :model="paper" style="max-width: 800px" :rules="rules">
        <el-row>
            <el-col :span="12">
                <el-form-item label="科研编号">
                    <el-input v-model="paper.id" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="用户编号">
                    <el-input v-model="paper.userId" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="论文题目">
                    <el-input v-model="paper.name" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="论文类型">
                    <el-input v-model="paper.type" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="刊物">
                    <el-input v-model="paper.publication" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="刊物种类">
                    <el-input v-model="paper.publicationCate" />
                </el-form-item>
            </el-col>
            
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="引用次数">
                    <el-input v-model="paper.count" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="佐证材料">
                    <el-input v-model="paper.attachment" />
                </el-form-item>
            </el-col>
        </el-row>

    </el-form>
    <el-row justify="center">
        <el-col :span="4">
            <el-button link type="primary" @click="add" v-if="admin">确认添加</el-button>
            <el-button link type="primary" @click="publish" v-else>发布科研</el-button>
        </el-col>

    </el-row>
</template>

<script>
import { defineComponent } from "vue"
import { addPaper } from '@/http/index'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
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
            admin:false
        }
    },
    mounted(){
        if(JSON.parse(localStorage.getItem('admin'))){
            this.admin=JSON.parse(localStorage.getItem('admin'))
        }else{
            this.admin=false;
        }
    },
    methods: {
        publish(){
            ElMessage("请等待管理员审核")
        },
        add() {
            const paper = this.paper;
            this.getdata()
            addPaper(paper).then(res => {
                ElMessage('添加成功')
            }).catch(err => {
                ElMessage('添加失败')
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
