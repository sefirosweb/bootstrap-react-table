import{T as l,j as e}from"./index-3a35fc95.js";import{r as m}from"./index-f1286426.js";import{u as d,d as c,e as u}from"./tableProps-47d8bb61.js";import{o as b}from"./onSubmitFnWoRefresh-d33fc3b6.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";const O={title:"Tables/Eagle",component:l},f={useQueryOptions:d,columns:c,crudOptions:{...u,enableGlobalFilterLabels:void 0},lazy:!1},r={args:{tableProps:f},render:a=>{const s=m.useRef(null);return a.tableProps.crudOptions.onSubmitFn=(i,p)=>b(i,p,s.current),e.jsxs("div",{children:[e.jsx("div",{children:"This is Eagle load template"}),e.jsx("div",{className:"mt-3",children:e.jsx(l,{...a,ref:s})})]})}};var t,o,n;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
}`,...(n=(o=r.parameters)==null?void 0:o.docs)==null?void 0:n.source}}};const j=["EagleTemplateGlobal"];export{r as EagleTemplateGlobal,j as __namedExportsOrder,O as default};
//# sourceMappingURL=EagleTemplateGlobal.stories-92e53d66.js.map
