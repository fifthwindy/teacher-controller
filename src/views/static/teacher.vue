<template>
    <div class="head">
        <el-input placeholder="输入教师编号以便搜索" v-model="searchKey">
            <template #append><el-button icon="Search" @click="search"></el-button></template>
        </el-input>
        <el-table :data="teachers" style="width: 100%">
            <el-table-column fixed prop="id" label="教师id" width="150" />
            <el-table-column prop="userId" label="教师编号" width="120" />
            <el-table-column prop="teacherName" label="教师姓名" width="120" />
            <el-table-column prop="school" label="所在学校" width="120" />
            <el-table-column prop="depart" label="所在学院" width="120" />
            <el-table-column prop="teacherNo" label="教师工号" width="120" />
            <el-table-column prop="professional" label="教师职称" width="120" />
            <el-table-column prop="createTime" label="创建时间" width="120" />
            <el-table-column prop="updateTime" label="更新时间" width="120" />
            
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

    <el-dialog v-model="DialogVisible" title="查询教师结果" width="50%" center>
        <el-form :model="teacher">
            <el-form-item label="教师编号" :label-width="formLabelWidth">
                <el-input v-model="teacher.userId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="教师姓名" :label-width="formLabelWidth">
                <el-input v-model="teacher.teacherName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所在学校" :label-width="formLabelWidth">
                <el-input v-model="teacher.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所在学院" :label-width="formLabelWidth">
                <el-input v-model="teacher.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="教师工号" :label-width="formLabelWidth">
                <el-input v-model="teacher.teacherNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="教师职称" :label-width="formLabelWidth">
                <el-input v-model="teacher.professional" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="teacher.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <el-input v-model="teacher.updateTime" autocomplete="off" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="DialogVisible = false">关闭</el-button>
                
            </span>
        </template>
    </el-dialog>
    <el-dialog v-model="EditDialogVisible" title="修改教师信息" width="50%" center>
        <el-form :model="teacher">
            <el-form-item label="教师编号" :label-width="formLabelWidth">
                <el-input v-model="teacher.userId" autocomplete="off" />
            </el-form-item>
            <el-form-item label="教师姓名" :label-width="formLabelWidth">
                <el-input v-model="teacher.teacherName" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所在学校" :label-width="formLabelWidth">
                <el-input v-model="teacher.school" autocomplete="off" />
            </el-form-item>
            <el-form-item label="所在学院" :label-width="formLabelWidth">
                <el-input v-model="teacher.depart" autocomplete="off" />
            </el-form-item>
            <el-form-item label="教师工号" :label-width="formLabelWidth">
                <el-input v-model="teacher.teacherNo" autocomplete="off" />
            </el-form-item>
            <el-form-item label="教师职称" :label-width="formLabelWidth">
                <el-input v-model="teacher.professional" autocomplete="off" />
            </el-form-item>
            <el-form-item label="创建时间" :label-width="formLabelWidth">
                <el-input v-model="teacher.createTime" autocomplete="off" />
            </el-form-item>
            <el-form-item label="更新时间" :label-width="formLabelWidth">
                <el-input v-model="teacher.updateTime" autocomplete="off" />
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
</template>

<script>
import { defineComponent } from "vue"
import { getTeacher,getTeachers,editTeacher,addTeacher,deleteTeacher } from "@/http/index"//在http的文件夹里index.js 是相对应的
import { cloneDeep } from 'lodash-es'
import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            teachers: [],//自己取
            pageinfo: {
                "currentPage": 1,
                "pageSize": 5,
                "totalpage": 10
            },
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
            DialogVisible: false,
            EditDialogVisible: false,
            admin:false,
            searchKey: ''
        }
    },
    mounted() {
        //this.tested()
        //this.adds()
        this.getall()
        if(JSON.parse(localStorage.getItem('admin'))){
            this.admin=JSON.parse(localStorage.getItem('admin'))
        }else{
            this.admin=false;
        }

    },
    methods: {
        search() {
            getTeacher(this.searchKey).then(res => {
                if (res.success) {
                    ElMessage('查找成功')
                    this.teacher=res.data.teacher
                    this.DialogVisible = true
                }

            }).catch(err => {
                ElMessage(err.msg)
            })
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
        //添加记录 在第3行
        add() {
            //除了第211行，其他的够可以删了202到210行

            this.DialogVisible = true
        },
        //第64行 改名记得一起改
        confirmAdd() {

            const one = this.teacher;//第128行 记得改，等号左边的随便取，改了的话下面一行也得改，里面的参数

            addTeacher(one).then(res => {//第116行 记得一起改 
                this.getall()//174行 记得改
                //console.log(res);
            }).catch(err => {
                console.log(err);
            })
            this.DialogVisible = false
        },
        //下面这个不用看 要删掉也可以

        //修改 这个在18行，要改名记得看一下，edit()括号里的参数名随便取
        edit(teacher) {
            //console.log(dormitory)
            this.EditDialogVisible = true;
            this.teacher = cloneDeep(teacher);//这个cloneDeep括号里的参数要对应edit括号里的参数，在295行

        },
        //在第106行 改名要一起改
        confirmEdit() {
            let teacher = this.teacher; //等号左边的变量名随便取，右边的名字和第128行的对象名一样，有改名记得一起改
            //console.log(dormitory)
            editTeacher(teacher).then(res => {//这个函数在116行 改名记得一起
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
                        deleteTeacher(params).then(res => {
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

                deleteTeacher(params).then(res => {
                    if (res.success) {
                        this.getall();
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
