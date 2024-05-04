import{T as l,j as e}from"./index-H3FBRpbc.js";import{r as m}from"./index-Dl6G-zuu.js";import{u as c,c as d,a as u}from"./tableProps-Bcq9LBIs.js";import{o as b}from"./onSubmitFnWoRefresh-C5j0PHy8.js";import"./index-Beu9b4Vr.js";import"./inheritsLoose-BSOQp05f.js";import"./index-D1_ZHIBm.js";const O={title:"Tables/Eagle",component:l},f={useQueryOptions:c,columns:d,crudOptions:{...u,enableGlobalFilterLabels:void 0},lazy:!1},a={args:{tableProps:f},render:r=>{const s=m.useRef(null);return r.tableProps.crudOptions.onSubmitFn=(i,p)=>b(i,p,s.current),e.jsxs("div",{children:[e.jsx("div",{children:"This is Eagle load template"}),e.jsx("div",{className:"mt-3",children:e.jsx(l,{...r,ref:s})})]})}};var t,o,n;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    tableProps: tableProps
  },
  render: props => {
    const tableRef = useRef<TableRef>(null);
    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFnWoRefresh(data, action, tableRef.current);
    return <div>
        <div>
          This is Eagle load template
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
        </div>
      </div>;
  }
}`,...(n=(o=a.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const j=["EagleTemplateGlobal"];export{a as EagleTemplateGlobal,j as __namedExportsOrder,O as default};
