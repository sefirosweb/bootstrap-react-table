import{f as c,h as d,i as t}from"./tableProps-ac2b0091.js";import"./index-f582422f.js";const g=(r,n,o)=>(console.log("onSubmitFn-data",r),console.log("onSubmitFn-action",n),new Promise((i,s)=>{o==null||o.setIsLoadingModal(!0),(()=>n==="create"?c(r,230):n==="edit"?d(r,230):n==="delete"?r.uuid?t(r.uuid,230):Promise.reject("uuid is required"):Promise.reject("Action not found"))().then(()=>{o==null||o.setShowModal(!1),o==null||o.refreshTable(),i(null)}).catch(u=>{s(u)}).finally(()=>{o==null||o.setIsLoadingModal(!1)})}));export{g as o};
//# sourceMappingURL=onSubmitFn-f28b94ca.js.map