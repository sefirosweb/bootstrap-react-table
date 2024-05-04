import{T as i,j as e}from"./index-H3FBRpbc.js";import{r as u}from"./index-Dl6G-zuu.js";import{u as m,c,a as d}from"./tableProps-Bcq9LBIs.js";import{o as f}from"./onSubmitFnWoRefresh-C5j0PHy8.js";import"./index-Beu9b4Vr.js";import"./inheritsLoose-BSOQp05f.js";import"./index-D1_ZHIBm.js";const T={title:"Tables/Eagle",component:i},s={args:{tableProps:{useQueryOptions:m,columns:c,crudOptions:{...d},lazy:!1}},render:r=>{const n=u.useRef(null);return r.tableProps.crudOptions.onSubmitFn=(l,p)=>f(l,p,n.current),e.jsxs("div",{children:[e.jsx("div",{children:"This is Eagle load template"}),e.jsx("div",{className:"mt-3",children:e.jsx(i,{...r,ref:n})})]})}};var t,a,o;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
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
