import{T as l,j as e}from"./index-2fc46444.js";import{r as u}from"./index-f1286426.js";import{u as d,d as m,e as c}from"./tableProps-58f2a93d.js";import{o as b}from"./onSubmitFnWoRefresh-9f33bd9c.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";const T={title:"Tables/Eagle",component:l},s={args:{tableProps:{useQueryOptions:d,columns:m,crudOptions:{...c},lazy:!1}},render:r=>{const n=u.useRef(null);return r.tableProps.crudOptions.onSubmitFn=(i,p)=>b(i,p,n.current),r.tableProps.crudOptions.enableGlobalFilterLabels=void 0,e.jsxs("div",{children:[e.jsx("div",{children:"This is Eagle load template"}),e.jsx("div",{className:"mt-3",children:e.jsx(l,{...r,ref:n})})]})}};var a,t,o;s.parameters={...s.parameters,docs:{...(a=s.parameters)==null?void 0:a.docs,source:{originalSource:`{
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
    props.tableProps.crudOptions.enableGlobalFilterLabels = undefined;
    return <div>
        <div>
          This is Eagle load template
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
        </div>
      </div>;
  }
}`,...(o=(t=s.parameters)==null?void 0:t.docs)==null?void 0:o.source}}};const h=["EagleTemplateGlobal"];export{s as EagleTemplateGlobal,h as __namedExportsOrder,T as default};
//# sourceMappingURL=EagleTemplateGlobal.stories-da6cb297.js.map
