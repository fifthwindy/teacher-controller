import{_ as b,d as _,E as s,M as k,h as y,j as e,w as l,F as C,J as g,v as E,o as m,p as i,q as f,k as U,u as h,K as I,s as w}from"./index-f6951b29.js";/* empty css               */import{h as B}from"./moment-fbc5633a.js";const F=_({data(){return{paper:{attachment:"",count:0,id:0,name:"",publication:"",publicationCate:"",publishTime:"",type:"",userId:0},rules:{},admin:!1}},mounted(){JSON.parse(localStorage.getItem("admin"))?this.admin=JSON.parse(localStorage.getItem("admin")):this.admin=!1},methods:{publish(){s("请等待管理员审核")},add(){const a=this.paper;this.getdata(),k(a).then(o=>{s("添加成功")}).catch(o=>{s("添加失败"),console.log(o)})},getdata(){this.publishTime=B().format("YYYY-MM-DD HH:mm:ss")}}});function M(a,o,N,S,Y,$){const n=U,u=h,p=I,d=g,V=E,r=w;return m(),y(C,null,[e(V,{"label-width":"100px",model:a.paper,style:{"max-width":"800px"},rules:a.rules},{default:l(()=>[e(d,null,{default:l(()=>[e(p,{span:12},{default:l(()=>[e(u,{label:"科研编号"},{default:l(()=>[e(n,{modelValue:a.paper.id,"onUpdate:modelValue":o[0]||(o[0]=t=>a.paper.id=t)},null,8,["modelValue"])]),_:1})]),_:1}),e(p,{span:12},{default:l(()=>[e(u,{label:"用户编号"},{default:l(()=>[e(n,{modelValue:a.paper.userId,"onUpdate:modelValue":o[1]||(o[1]=t=>a.paper.userId=t)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(p,{span:12},{default:l(()=>[e(u,{label:"论文题目"},{default:l(()=>[e(n,{modelValue:a.paper.name,"onUpdate:modelValue":o[2]||(o[2]=t=>a.paper.name=t)},null,8,["modelValue"])]),_:1})]),_:1}),e(p,{span:12},{default:l(()=>[e(u,{label:"论文类型"},{default:l(()=>[e(n,{modelValue:a.paper.type,"onUpdate:modelValue":o[3]||(o[3]=t=>a.paper.type=t)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(p,{span:12},{default:l(()=>[e(u,{label:"刊物"},{default:l(()=>[e(n,{modelValue:a.paper.publication,"onUpdate:modelValue":o[4]||(o[4]=t=>a.paper.publication=t)},null,8,["modelValue"])]),_:1})]),_:1}),e(p,{span:12},{default:l(()=>[e(u,{label:"刊物种类"},{default:l(()=>[e(n,{modelValue:a.paper.publicationCate,"onUpdate:modelValue":o[5]||(o[5]=t=>a.paper.publicationCate=t)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1}),e(d,null,{default:l(()=>[e(p,{span:12},{default:l(()=>[e(u,{label:"引用次数"},{default:l(()=>[e(n,{modelValue:a.paper.count,"onUpdate:modelValue":o[6]||(o[6]=t=>a.paper.count=t)},null,8,["modelValue"])]),_:1})]),_:1}),e(p,{span:12},{default:l(()=>[e(u,{label:"佐证材料"},{default:l(()=>[e(n,{modelValue:a.paper.attachment,"onUpdate:modelValue":o[7]||(o[7]=t=>a.paper.attachment=t)},null,8,["modelValue"])]),_:1})]),_:1})]),_:1})]),_:1},8,["model","rules"]),e(d,{justify:"center"},{default:l(()=>[e(p,{span:4},{default:l(()=>[a.admin?(m(),i(r,{key:0,link:"",type:"primary",onClick:a.add},{default:l(()=>[f("确认添加")]),_:1},8,["onClick"])):(m(),i(r,{key:1,link:"",type:"primary",onClick:a.publish},{default:l(()=>[f("发布科研")]),_:1},8,["onClick"]))]),_:1})]),_:1})],64)}const D=b(F,[["render",M]]);export{D as default};
