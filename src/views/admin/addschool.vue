<template>
    
        <el-form label-width="100px" :model="school" style="max-width: 800px" :rules="rules">
            <el-row>
                <el-col :span="24">
                    <el-form-item label="学校编号">
                        <el-input v-model="school.id" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="学校名称">
                        <el-input v-model="school.schoolName" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="学校描述">
                        <el-input v-model="school.description" />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="8">
                    <el-form-item label="省份">
                        <el-input v-model="school.province"  disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="市区" >
                        <el-input v-model="school.city" disabled/>
                    </el-form-item>
                </el-col>
                <el-col :span="8">
                    <el-form-item label="县区">
                        <el-input v-model="school.area"  disabled/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <el-form-item label="学校地址" >
                        <el-input v-model="school.address" disabled/>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <el-form-item label="纬度" >
                        <el-input v-model="school.latitude" disabled />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="经度">
                        <el-input v-model="school.longitude"  disabled/>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="12">
                    <el-form-item label="是否启用">
                        <el-input v-model="school.enable" />
                    </el-form-item>
                </el-col>
                <el-col :span="12">
                    <el-form-item label="是否弃用">
                        <el-input v-model="school.deleted" />
                    </el-form-item>
                </el-col>
            </el-row>

        </el-form>
        <el-row justify="center">
            <el-col :span="4"><el-button link type="primary" @click="add">确认添加</el-button></el-col>
            <el-col :span="4"><el-button link type="primary" @click="openmap">添加地址信息</el-button></el-col>
        </el-row>

    <el-dialog title="位置选择" v-model="openMap" width="800px" @open="baidumap">
        <el-form label-width="80px">
            <el-row>
                <el-col :span="10" class="search">
                    <el-form-item label="搜索地址">
                        <el-input type="text" id="searchAddres" v-model="searchAddresKeywords" placeholder="请输入地点">
                        </el-input>
                    </el-form-item>
                </el-col>
                
            </el-row>
        </el-form>
        
        <div id="bdmap" style="width: 100%; height: 400px;"></div>

        <div>
            <el-button type="primary" @click="confirmSelect">确 定</el-button>
            <el-button @click="cancelSelect">取 消</el-button>
        </div>
    </el-dialog>
</template>

<script>
import { defineComponent } from "vue"
import { addSchool } from '@/http/index'
import moment from 'moment'

import { ElMessage, ElMessageBox } from 'element-plus';
export default defineComponent({
    data() {
        return {
            searchAddresKeywords: "",
            openMap: false,
            school: {
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
            rules: {}
        }
    },
    mounted() {
        


    },
    methods: {
        openmap() {
            this.openMap = true;

        },
        baidumap() {
            let that = this;
            var map = new BMap.Map("bdmap", {
                coordsType: 5 // coordsType指定输入输出的坐标类型，3为gcj02坐标，5为bd0ll坐标，默认为5。
                // 指定完成后API将以指定的坐标类型处理您传入的坐标
            });          // 创建地图实例  
            var point = new BMap.Point(116.404, 39.915);  // 创建点坐标  
            map.centerAndZoom(point, 15);
            map.enableScrollWheelZoom(true);

            // var marker = new BMap.Marker(point);        // 创建标注    
            // map.addOverlay(marker);
            // marker.enableDragging();
            // marker.addEventListener("dragend", function (e) {
            //   alert("当前位置：" + e.point.lng + ", " + e.point.lat);
            // })
            // var geoc = new BMap.Geocoder();
            // map.addEventListener("click", function (e) {
            //   var pt = e.point;

            //   geoc.getLocation(pt, function (rs) {
            //     var addComp = rs.addressComponents;
            //     alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
            //   });
            // });
            map.addEventListener("click", function (e) {
                var clickpt = e.point; // 点击的坐标
                map.clearOverlays(); // 移除地图上的标注
                var marker = new BMap.Marker(clickpt); // 创建标注
                map.addOverlay(marker); // 将标注添加到地图中
                // 逆地址解析
                that.geocAddress(clickpt);
            });
            var ac = new BMap.Autocomplete({
                input: "searchAddres",
                location: map,
                // onSearchComplete:function(rst){
                //     console.log(rst)
                // }
            });
            // 鼠标点击下拉列表后的事件
            ac.addEventListener("onconfirm", function (e) {
                map.clearOverlays(); // 移除地图上的标注

                var local = new BMap.LocalSearch(map, {
                    //智能搜索
                    onSearchComplete: function (results) {
                        let poi = results.getPoi(0); //获取第一个智能搜索的结果
                        var searchpt = poi.point; // 获取坐标
                        map.centerAndZoom(searchpt, 15);
                        map.addOverlay(new BMap.Marker(searchpt)); //添加标注
                        that.geocAddress(searchpt); // 逆地址解析
                    },
                });
                // 搜索词
                var searchValue = e.item.value;
                local.search(
                    searchValue.province +
                    searchValue.city +
                    searchValue.district +
                    searchValue.street +
                    searchValue.business
                );
            });
        },
        geocAddress(point) {
            let that = this;
            var geoc = new BMap.Geocoder({extensions_town:true});
            geoc.getLocation(point, function (geocInfo) {
                // 设置基本信息
                var addressInfo = geocInfo.addressComponents;
                that.addressInfo.longitude = point.lng;
                that.addressInfo.latitude = point.lat;
                that.addressInfo.province = addressInfo.province;
                that.addressInfo.city = addressInfo.city;
                that.addressInfo.district = addressInfo.district;
                let address = addressInfo.street + addressInfo.streetNumber;
                if (geocInfo.surroundingPois.length > 0) {
                    address = address + geocInfo.surroundingPois[0].title;
                }
                that.addressInfo.address = address;
            });
        },
        getdata() {
            this.createTime = moment().format('YYYY-MM-DD HH:mm:ss');
            this.updateTime = moment().format('YYYY-MM-DD HH:mm:ss')
        },
        add() {
            const school = this.school;
            this.getdata();
            addSchool(school).then(res => {
                ElMessage('添加成功')
            }).catch(err => {
                ElMessage('添加失败')
                console.log(err)
            })
        },
        /**
       * 确认选择
       */
        confirmSelect() {
            this.school.province=this.addressInfo.province;
            this.school.city=this.addressInfo.city;
            this.school.area=this.addressInfo.district;
            this.school.address=this.addressInfo.address;
            this.school.latitude=this.addressInfo.latitude;
            this.school.longitude=this.addressInfo.longitude;
            this.openMap = false;
        },

        /**
         * 取消选择
         */
        cancelSelect() {
            this.openMap = false;
        }
    }
});
</script>

<style lang="scss">
.tangram-suggestion {
    z-index: 9999;
}
</style>
