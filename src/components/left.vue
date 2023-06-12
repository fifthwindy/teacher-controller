<template>
  <el-menu active-text-color="#ffd04b" background-color="#545c64" router class="el-menu-vertical-demo"
     text-color="#fff" @open="handleOpen" @close="handleClose">
    <el-sub-menu index="1">
      <template #title>
        <el-icon>
          <location />
        </el-icon>
        学校管理
      </template>
      <el-menu-item class="item" index="/admin/addschool" v-if="admin">
        <span>添加学校</span>
      </el-menu-item>
      <el-menu-item index="/admin/school" class="item">
        <span>学校信息</span>
      </el-menu-item>
    </el-sub-menu>
    <!-- <el-menu-item-group title="Group One">
            <el-menu-item index="1-1">item one</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
          </el-menu-item-group> -->
    <el-sub-menu index="2">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        部门管理
      </template>
      <el-menu-item index="/admin/adddepartment" class="item">
        <span>创建新部门</span>
      </el-menu-item>
      <el-menu-item index="/admin/department" class="item">
        <span>部门信息</span>
      </el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="3">
      <template #title>
        <el-icon>
          <setting />
        </el-icon>
        教师管理
      </template>
      <el-menu-item index="/admin/addteacher" class="item" v-if="admin">

        <span>录入新教师</span>
      </el-menu-item>
      
      <el-menu-item index="/admin/teacher" class="item">

        <span>学校教师信息</span>
      </el-menu-item>
      <el-sub-menu index="3-3">
        <template #title>
          <span class="item">教师科研</span>
        </template>
        <el-menu-item index="/user/paperinfo">
          <span class="item1">科研信息</span>
        </el-menu-item>
        <el-menu-item index="/user/publishpaper">
          <span class="item1">发布科研</span>
        </el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
  </el-menu>
</template>

<script>
import { defineComponent } from "vue"
export default defineComponent({
  data(){
    return{
      admin:false,
      
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
    handleOpen(key, keyPath) {
      if(JSON.parse(localStorage.getItem('admin'))){
            this.admin=JSON.parse(localStorage.getItem('admin'))
        }else{
            this.admin=false;
        }
      console.log(this.admin)
      console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath)
    }
  },
});
</script>

<style lang="scss" scoped>
.item {
  font-size: small;
}

.item1 {
  font-size: smaller;
}
</style>
