<template>
    <div class="head">
        
        <el-table :data="schools" style="width: 100%">
            <el-table-column fixed prop="id" label="学校编号" width="150" />
            <el-table-column prop="province" label="省份" width="120" />
            <el-table-column prop="city" label="市区" width="120" />
            <el-table-column prop="area" label="县区" width="120" />
            <el-table-column prop="schoolName" label="学校名" width="120" />
            <el-table-column prop="latitude" label="纬度" width="120" />
            <el-table-column prop="longitude" label="经度" width="120" />
            <el-table-column prop="enable" label="是否启用" width="120" />
            <el-table-column prop="description" label="学校描述" width="120" />
            <el-table-column prop="address" label="学校地址" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
            <el-table-column prop="deleted" label="是否弃用" width="120" />
            <el-table-column fixed="right" label="Operations" width="180">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope.row)" v-if="admin">修改</el-button>
                    <el-button link type="primary" size="small" @click="del(scope.row.id)" v-if="admin">删除</el-button>
                    <el-button link type="primary" size="small" @click="openmap(scope.row)">显示在百度地图上</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination layout="prev, pager, next" :total="pageinfo.totalpage" :page-size="pageinfo.pageSize"
            @current-change="pageChange" />

    </div>

    
    <el-dialog v-model="EditDialogVisible" title="修改学校信息" width="50%" center>
        <el-form :model="school">
            <el-form-item label="省份" :label-width="formLabelWidth">
                <el-input v-model="school.province" autocomplete="off" />
            </el-form-item>
            <el-form-item label="市区" :label-width="formLabelWidth">
                <el-input v-model="school.city" autocomplete="off" />
            </el-form-item>
            <el-form-item label="县区" :label-width="formLabelWidth">
                <el-input v-model="school.area" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校名" :label-width="formLabelWidth">
                <el-input v-model="school.schoolName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="纬度" :label-width="formLabelWidth">
                <el-input v-model="school.latitude" autocomplete="off" />
            </el-form-item>
            <el-form-item label="经度" :label-width="formLabelWidth">
                <el-input v-model="school.longitude" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否启用" :label-width="formLabelWidth">
                <el-input v-model="school.enable" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校描述" :label-width="formLabelWidth">
                <el-input v-model="school.description" autocomplete="off" />
            </el-form-item>
            <el-form-item label="学校地址" :label-width="formLabelWidth">
                <el-input v-model="school.address" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="school.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <el-input v-model="school.updateTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="是否弃用" :label-width="formLabelWidth">
                <el-input v-model="school.deleted" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="EditDialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmEdit">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
    <el-dialog title="位置显示" v-model="openMap" width="600px" @open="baidumap">
         <el-input v-model="addressInfo.address" disabled>
            <template #prepend>当前位置：</template>
        </el-input>
        <div id="bdmap" style="width: 100%; height: 400px;"></div>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import { getSchool,getSchools,editSchool,deleteSchool,checkSchool } from "@/http/index"//在http的文件夹里index.js 是相对应的
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus';

export default defineComponent({
    data() {
        return {
            openMap:false,
            schools: [],//自己取
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
            school: {//自己取 里面的内容就是老师提供的表，在那个api文档也可以看 可以直接cv 我的视频有说
                "address": "",
                "area": "",
                "city": "",
                "createTime": "",
                "deleted": 0,
                "description": "",
                "enable": 0,
                "id": 0,
                "latitude": "",
                "longitude": "",
                "province": "",
                "schoolName": "",
                "updateTime": ""
            },
            addressInfo: {
                // 地址信息
                longitude: "", // 经度
                latitude: "", // 纬度
                province: "", // 省
                city: "", // 市
                district: "", // 区
                address: "", // 详细地址
            },
            DialogVisible: false,
            EditDialogVisible: false,
            admin:false
        }
    },
    mounted() {
        //this.tested()
        //this.adds()
        this.getall()
        
        //this.stores()
        if(JSON.parse(localStorage.getItem('admin'))){
            this.admin=JSON.parse(localStorage.getItem('admin'))
        }else{
            this.admin=false;
        }
        

    },
    
    methods: {
        getroot(){
            
        },
        baidumap() {
            let that = this;
            var map = new BMap.Map("bdmap", {
                coordsType: 5 // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
                // 指定完成后API将以指定的坐标类型处理您传入的坐标
            });          // 创建地图实例  
            var point = new BMap.Point(that.addressInfo.longitude,that.addressInfo.latitude);  // 创建点坐标  
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom(true);
            var marker = new BMap.Marker(point);        // 创建标注    
            map.addOverlay(marker);
        },
        openmap(sc){
            this.addressInfo.longitude=sc.longitude;
            this.addressInfo.latitude=sc.latitude;
            this.addressInfo.address=sc.address;
            this.openMap=true;
            
        },
        stores(){
            let i=JSON.parse(localStorage.getItem('userinfo'))
            console.log(i.token)
        },
        //不用康
        tested() {
            console.log("2#A211".slice(3, 6))
            const a = "2#A211".split("")
            console.log(parseInt("2") + 1)
        },
        getid(name) {
            const arr = name.split("");
            if (arr[2] == "A") {
                return 1000 + parseInt(name.slice(3, 6))
            } else {
                return 2000 + parseInt(name.slice(3, 6))
            }
        },
        //排序 不用看
        dsort(dormitorys) {

            for (var i = 0; i < dormitorys.length; i++) {

                dormitorys[i].id = i + 1;

            }
            return dormitorys;
        },
        pageChange(currentPage) {
            this.pageinfo.currentPage = currentPage;
            this.getall();//记得改 改成和 176行一样的名字，都以176行的名字改
            //console.log(this.dormitory)
        },
        //获取老师那个api库的内容函数 没有数据得自己加
        getall() {
            let start = this.pageinfo.pageSize * (this.pageinfo.currentPage - 1);
            let end = this.pageinfo.currentPage * this.pageinfo.pageSize;

            getSchools().then(res => {
                //const sortedDormitorys = res.data.dormitories
                if (res.success) {
                    this.schools = res.data.schools.slice(start, end);//去浏览器的控制台看名字 我发的视频里也有
                    this.pageinfo.totalpage = res.data.schools.length;
                    
                } else {
                    
                    return false
                }

                //console.log(this.pageinfo.totalpage);
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })


        },
        //添加记录 在第3行
        add() {
            //除了第211行，其他的够可以删了202到210行
            
            this.DialogVisible = true
        },
        //第64行 改名记得一起改
        confirmAdd() {

            const one = this.school;//第128行 记得改，等号左边的随便取，改了的话下面一行也得改，里面的参数
           
            addSchool(one).then(res => {//第116行 记得一起改 
                this.getall()//174行 记得改
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.DialogVisible = false
        },
        //下面这个不用看 要删掉也可以
        
        //修改 这个在18行，要改名记得看一下，edit()括号里的参数名随便取
        edit(school) {
            //console.log(dormitory)
            this.EditDialogVisible = true;
            this.school = cloneDeep(school);//这个cloneDeep括号里的参数要对应edit括号里的参数，在295行

        },
        //在第106行 改名要一起改
        confirmEdit() {
            let school = this.school; //等号左边的变量名随便取，右边的名字和第128行的对象名一样，有改名记得一起改
            //console.log(dormitory)
            editSchool(school).then(res => {//这个函数在116行 改名记得一起
                if (res.success) {
                    this.EditDialogVisible = false;
                    this.getall();//这个函数在176行 改名记得一起
                    ElMessage(res.msg)
                } else {
                    ElMessage(res.msg)
                    return false
                }

            }).catch(err => {
                ElMessage('网络错误联系管理员')
            })
        },
        //删除 del在19行被调用了，如果你要改名记得一起改
        del(id) {
            console.log(id);
            const params = {
                id: id
            }
            ElMessageBox.confirm(
                '是否确认删除',
                'Warning',
                {
                    confirmButtonText: '确认删除',
                    cancelButtonText: '在考虑一下',
                    type: 'warning',
                }
            )
                .then(() => {
                    ElMessage({
                        type: 'success',
                        message: '删除成功',
                    }),
                        //下面这个deleteDormitory要改名的话 代码第116行也得改，改成一样的
                        deleteSchool(params).then(res => {
                            if (res.success) {
                                this.getall();//这个函数在176行 改名记得一起
                            } else {
                                console.log(res.msg);
                                return false
                            }
                        }).catch(err => {
                            console.log(err);

                        })
                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '在考虑一下',
                    })
                })

        },
        //删除所有记录  这个不用管
        delall() {
            //console.log(this.dormitorys.length)
            for (let i = 1; i <= this.pageinfo.totalpage; i++) {
                let params = {
                    id: i
                }

                deleteDormitory(params).then(res => {
                    if (res.success) {
                        this.getdormitorys();
                    } else {
                        console.log(res.msg);
                        return false
                    }
                }).catch(err => {
                    console.log(err);

                })
            }
        }




    }

});
</script>

<style lang="scss" scoped></style>
