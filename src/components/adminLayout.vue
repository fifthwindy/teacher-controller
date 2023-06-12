<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Top ref="top"></Top>
            </el-header>
            <el-container>
                <el-aside width="160px" >
                    <div class="left">
                        <el-scrollbar height="520px"><Left :admin="admin"></Left></el-scrollbar>
                        
                    </div>
                    
                </el-aside>
                <el-container>
                    <el-main><RouterView></RouterView></el-main>
                    
                </el-container>
            </el-container>
        </el-container>
    </div>
</template>
    
<script>
import { defineComponent } from "vue"
import Top from "@/components/top.vue"
import Left from "@/components/left.vue"
import { useUserStore } from '@/store/user';
export default defineComponent({
    data(){
        return{
            admin:false,
            
        }
    },
    mounted(){
       // this.a()
       console.log(this.$refs.top.admin)
       this.admin=this.$refs.top.admin
    },
    
    methods:{
        a(){
            const user=useUserStore();
            console.log(user.userinfo);
        }
    },
    components: { Top, Left }
    
});
</script>
    
<style lang="scss" scoped>
*{
  
  
  padding: 0;
  margin: 0;
}
.left{
    height: 100%;
    background-color: #545c64;
}
</style>
    