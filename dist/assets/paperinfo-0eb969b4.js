import{_ as u,d as m,N as f,E as b,h as _,j as a,w as s,l as C,m as w,o as r,p as k,q as g,r as z,t as S,s as y}from"./index-f6951b29.js";/* empty css                        */import{h as E}from"./moment-fbc5633a.js";const P=m({data(){return{papers:[],paper:{attachment:"",count:0,id:0,name:"",publication:"",publicationCate:"",publishTime:"",type:"",userId:0},rules:{},pageinfo:{currentPage:1,pageSize:5,totalpage:10},EditDialogVisible:!1,admin:!1}},mounted(){this.get(),JSON.parse(localStorage.getItem("admin"))?this.admin=JSON.parse(localStorage.getItem("admin")):this.admin=!1},methods:{pageChange(e){this.pageinfo.currentPage=e,this.get()},getall(){let e=this.pageinfo.pageSize*(this.pageinfo.currentPage-1),o=this.pageinfo.currentPage*this.pageinfo.pageSize;getTeachers().then(i=>{if(i.success)this.teachers=i.data.teachers.slice(e,o),this.pageinfo.totalpage=i.data.teachers.length;else return!1}).catch(i=>{console.log(i)})},get(){let o=this.pageinfo.pageSize*(this.pageinfo.currentPage-1),i=this.pageinfo.currentPage*this.pageinfo.pageSize;f(4).then(n=>{if(n.success)this.papers=n.data.papers.slice(o,i),this.pageinfo.totalpage=n.data.papers.length;else return!1}).catch(n=>{b("系统错误"),console.log(n)})},getdata(){this.publishTime=E().format("YYYY-MM-DD HH:mm:ss")}}}),I={class:"head"};function N(e,o,i,n,T,$){const t=S,l=y,c=C,d=w;return r(),_("div",I,[a(c,{data:e.papers,style:{width:"100%"}},{default:s(()=>[a(t,{fixed:"",prop:"id",label:"科研编号",width:"150"}),a(t,{prop:"userId",label:"用户编号",width:"120"}),a(t,{prop:"name",label:"论文题目",width:"120"}),a(t,{prop:"type",label:"论文类型",width:"120"}),a(t,{prop:"publication",label:"刊物",width:"120"}),a(t,{prop:"publicationCate",label:"刊物种类",width:"120"}),a(t,{prop:"count",label:"引用次数",width:"120"}),a(t,{prop:"attachment",label:"佐证材料",width:"120"}),e.admin?(r(),k(t,{key:0,fixed:"right",label:"Operations",width:"120"},{default:s(p=>[a(l,{link:"",type:"primary",size:"small",onClick:h=>e.edit(p.row)},{default:s(()=>[g("修改")]),_:2},1032,["onClick"]),a(l,{link:"",type:"primary",size:"small",onClick:h=>e.del(p.row.id)},{default:s(()=>[g("删除")]),_:2},1032,["onClick"])]),_:1})):z("",!0)]),_:1},8,["data"]),a(d,{layout:"prev, pager, next",total:e.pageinfo.totalpage,"page-size":e.pageinfo.pageSize,onCurrentChange:e.pageChange},null,8,["total","page-size","onCurrentChange"])])}const Y=u(P,[["render",N]]);export{Y as default};