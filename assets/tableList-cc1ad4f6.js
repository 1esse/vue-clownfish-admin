import{d as u,G as m,k as p,o as _,aG as b,a as f,ax as e}from"./index-6b87b9fd.js";import{u as g,_ as k}from"./useTable-39f7a315.js";import"./index-f89248c0.js";import"./FolderOutlined-23d91209.js";const T=u({__name:"tableList",setup(y){const a=m(),{dataSource:t,columns:n,tableLoading:o,pagination:l,selectedRowKeys:s,updateTable:i,onTableRowSelectChange:d,tableResize:r}=g({table:a,columns:[{title:"id",dataIndex:"key",key:"key",width:50},{title:"名称",dataIndex:"name",key:"name",width:100},{title:"年龄",dataIndex:"age",key:"age",width:100},{title:"地址",dataIndex:"address",key:"address",width:400}],updateTableOptions:{fetchUrl:"/table/list"}});return p(()=>{i()}),(w,h)=>{const c=k;return _(),b("main",null,[f(c,{ref_key:"tableRef",ref:a,class:"table",rowKey:"key",dataSource:e(t),columns:e(n),pagination:e(l),loading:e(o),bordered:"",onResizeColumn:e(r),rowSelection:{selectedRowKeys:e(s),onChange:e(d)}},null,8,["dataSource","columns","pagination","loading","onResizeColumn","rowSelection"])])}}});export{T as default};