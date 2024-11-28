import{T as l,j as s}from"./index-B-DUVf7N.js";import{r as u}from"./index-Dl6G-zuu.js";import{u as c,c as m,a as d}from"./tableProps-DHxE0Oyn.js";import{o as f}from"./onSubmitFnWoRefresh-CcToFRdA.js";import"./index-Beu9b4Vr.js";import"./inheritsLoose-BSOQp05f.js";import"./index-D1_ZHIBm.js";const v={title:"Tables/Style",component:l},e={args:{tableProps:{useQueryOptions:c,columns:m,crudOptions:{...d},lazy:!1}},render:n=>{const r=u.useRef(null);return n.tableProps.crudOptions.onSubmitFn=(p,i)=>f(p,i,r.current),s.jsx("div",{style:{display:"flex",flexDirection:"column",height:"calc(100vh - 200px)"},children:s.jsx(l,{...n,ref:r})})}};var t,o,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsEagle,
      columns,
      crudOptions: {
        ...crudOptions
      },
      lazy: false
    }
  },
  render: props => {
    const tableRef = useRef<TableRef>(null);
    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFnWoRefresh(data, action, tableRef.current);
    return <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: 'calc(100vh - 200px)'
    }}>
        <Table {...props} ref={tableRef} />
      </div>;
  }
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const T=["ResponsiveTemplate"];export{e as ResponsiveTemplate,T as __namedExportsOrder,v as default};
