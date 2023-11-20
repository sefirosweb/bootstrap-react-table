import{T as i,j as e}from"./index-73f5591c.js";import{r as u}from"./index-f1286426.js";import{u as m,d,e as c}from"./tableProps-5b30609e.js";import{o as f}from"./onSubmitFnWoRefresh-044dcd1b.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";const T={title:"Tables/Eagle",component:i},s={args:{tableProps:{useQueryOptions:m,columns:d,crudOptions:{...c},lazy:!1}},render:r=>{const n=u.useRef(null);return r.tableProps.crudOptions.onSubmitFn=(l,p)=>f(l,p,n.current),e.jsxs("div",{children:[e.jsx("div",{children:"This is Eagle load template"}),e.jsx("div",{className:"mt-3",children:e.jsx(i,{...r,ref:n})})]})}};var t,a,o;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
    return <div>
        <div>
          This is Eagle load template
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
        </div>
      </div>;
  }
}`,...(o=(a=s.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};const h=["EagleTemplate"];export{s as EagleTemplate,h as __namedExportsOrder,T as default};
//# sourceMappingURL=EagleTemplate.stories-721f4d7e.js.map
