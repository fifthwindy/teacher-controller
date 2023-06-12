<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
    router default-active="/user/info">
    <el-menu-item index="1" class="item1" v-if="admin">管理中心</el-menu-item>
    <el-menu-item index="1" class="item1" v-else>教师中心</el-menu-item>
    <el-menu-item index="/user/info">个人信息中心</el-menu-item>
    <el-menu-item v-if="admin" @click="exitroot">退出管理</el-menu-item>
    <el-menu-item v-else @click="show">获取管理权限</el-menu-item>
  </el-menu>
  <el-dialog v-model="DialogVisible" title="获取管理员权限" width="50%" center>
    <el-input v-model="adminkey" placeholder="请输入管理员密匙" type="password" show-password></el-input>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="DialogVisible = false">取消</el-button>
        <el-button type="primary" @click="getroot">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      admin: false,
      DialogVisible: false,
      adminkey: ''
    }
  },
  mounted() {
    if (localStorage.getItem('admin')) {
      localStorage.removeItem('admin')

    }
  },
  methods: {
    show() {
      this.DialogVisible = true;
    },
    getroot() {

      if (this.adminkey == 'root') {

        localStorage.setItem('admin', true)

        this.admin = true;
        this.DialogVisible = false;
      }
      this.adminkey = '',
        this.$router.push('/admin/department')

    },
    exitroot() {
      localStorage.removeItem('admin')
      this.admin = false;
      this.$router.push('/admin/teacher')
    }
  }

});
</script>

<style lang="scss" scoped>
.el-menu-demo .item1 {
  width: 160px;
}
</style>
