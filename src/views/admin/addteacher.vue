<template>
    <el-form label-width="100px" :model="teacher" style="max-width: 800px" :rules="rules">
        <el-row>
            <el-col :span="12">
                <el-form-item label="教师编号">
                    <el-input v-model="teacher.id" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="用户编号">
                    <el-input v-model="teacher.userId" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="学校编号">
                    <el-input v-model="teacher.school" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="学院">
                    <el-input v-model="teacher.depart" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="教师工号">
                    <el-input v-model="teacher.teacherNo" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="教师姓名">
                    <el-input v-model="teacher.teacherName" />
                </el-form-item>
            </el-col>

        </el-row>


    </el-form>
    <el-row justify="center">
        <el-col :span="4"><el-button link type="primary" @click="add">确认添加</el-button></el-col>

    </el-row>
</template>

<script>
import { defineComponent } from "vue"
import { addTeacher } from '@/http/index'
import moment from 'moment'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            teacher: {//自己取 里面的内容就是老师提供的表，在那个api文档也可以看 可以直接cv 我的视频有说
                "createTime": "",
                "depart": "",
                "id": 0,
                "professional": "",
                "school": "",
                "teacherName": "",
                "teacherNo": "",
                "updateTime": "",
                "userId": 0
            },
            rules: {},
            
        }
    },
    methods: {
        add() {
            const teacher = this.teacher;
            this.getdata();
            addTeacher(teacher).then(res => {
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
