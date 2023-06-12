<template>
    <el-form label-width="100px" :model="userinfo" style="max-width: 800px" :rules="rules">
        <el-row justify="center" style="margin-bottom: 20px;">
            <el-col :span="8">
                <span>用户信息</span>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="ID">
                    <el-input v-model="userinfo.id" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="用户名">
                    <el-input v-model="userinfo.userName" />
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="用户类型">
                    <el-input v-model="userinfo.userType" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12">
                <el-form-item label="email">
                    <el-input v-model="userinfo.email" />
                </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="绑定">
                    <el-input v-model="userinfo.binding" />
                </el-form-item>
            </el-col>
        </el-row>


    </el-form>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
    data() {
        return {
            userinfo: {
                "state": 1,
                "id": 0,
                "userName": "",
                "userType": "",
                "token": "",
                "binding": 0,
                "createTime": "",
                "updateTime": "",
                "email": "",
            },
            teacherinfo: {},
            rules: {}
        }
    },
    mounted() {

        this.userinfo = JSON.parse(localStorage.getItem('userinfo')).userinfo
        console.log(this.userinfo)
    },
    methods: {

    }
});
</script>

<style lang="scss" scoped></style>
