<template>
    <el-form label-width="100px" :model="department" style="max-width: 800px" :rules="rules">
        <el-row>
            <el-col :span="12">
                <el-form-item label="部门编号">
                    <el-input v-model="department.id" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="学校ID">
                    <el-input v-model="department.schoolId" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="部门名">
                    <el-input v-model="department.departName" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="部门英文名">
                    <el-input v-model="department.departCode" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="部门描述">
                    <el-input v-model="department.departDesc" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="部门类别">
                    <el-input v-model="department.departType" />
                </el-form-item>
            </el-col>

        </el-row>


    </el-form>
    <el-row justify="center">
        <el-col :span="4">
            <el-button link type="primary" @click="add" v-if="admin">确认添加</el-button>
            <el-button link type="primary" @click="req" v-else>申请创建</el-button>
        </el-col>

    </el-row>
</template>

<script>
import { defineComponent } from "vue"
import { addDepartment } from '@/http/index'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            department: {//自己取 里面的内容就是老师提供的表，在那个api文档也可以看 可以直接cv 我的视频有说
                "createTime": "",
                "deleted": 0,
                "departCode": "",
                "departDesc": "",
                "departName": "",
                "departType": "",
                "id": 0,
                "schoolId": 0,
                "updateTime": ""
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
        req(){
            ElMessage('等待管理员审核')
        },
        add() {
            const department = this.department;
            this.getdata();
            addDepartment(department).then(res => {
                ElMessage('添加成功')
            }).catch(err => {
                ElMessage('添加失败')
                console.log(err)
            })
        },
        getdata() {
            this.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
            this.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        },
    }
});
</script>

<style lang="scss" scoped></style>
