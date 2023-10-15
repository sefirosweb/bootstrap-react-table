import{T as m,j as e}from"./index-2fc46444.js";import{r as i}from"./index-f1286426.js";import{b as f,u as b}from"./tableProps-58f2a93d.js";import{S as h}from"./react-select.esm-63bee458.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-4dcb42d4.js";const N={title:"Tables/Forms",component:m},S=[...new Set(f().map(n=>n.name))].map(n=>({label:n,value:n})),t={render:()=>{const n=i.useRef(null),[d,p]=i.useState(""),v={useQueryOptions:b,columns:[{accessorKey:"uuid",header:"UUID"},{accessorKey:"name",header:"Name",enableSorting:!0},{accessorKey:"description",header:"Desc."},{accessorKey:"price",header:"€",enableSorting:!0},{id:"custom",header:"Custom",accessorFn:()=>"Custom data",meta:{editable:!0,customForm:({value:r,setValue:a})=>e.jsxs(e.Fragment,{children:[e.jsx("div",{children:"Custom form"}),e.jsx("div",{children:e.jsx(h,{closeMenuOnSelect:!1,isMulti:!0,options:S,value:r??[],onChange:s=>{a(s.length>0?s:void 0)},menuPosition:"fixed"})})]})}}],crudOptions:{primaryKey:"uuid",edit:!0,onSubmitFn:(r,a)=>new Promise((s,y)=>{var o;p(JSON.stringify(r)),(o=n.current)==null||o.setShowModal(!1),s(null)})},lazy:!1};return e.jsxs("div",{children:[e.jsx("div",{className:"mt-3",children:e.jsx(m,{tableProps:v,ref:n})}),e.jsx("div",{className:"mt-3",children:"onSubmitFn:"}),e.jsx("div",{className:"mt-3",children:d})]})}};var u,l,c;t.parameters={...t.parameters,docs:{...(u=t.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: () => {
    const tableRef = useRef<TableRef>(null);
    const [response, setResponse] = useState<string>('');
    const tableProps: TableProps<GeneratedData> = {
      useQueryOptions: useQueryOptionsEagle,
      columns: [{
        accessorKey: 'uuid',
        header: 'UUID'
      }, {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true
      }, {
        accessorKey: 'description',
        header: 'Desc.'
      }, {
        accessorKey: 'price',
        header: '€',
        enableSorting: true
      }, {
        id: 'custom',
        header: 'Custom',
        accessorFn: () => 'Custom data',
        meta: {
          editable: true,
          customForm: ({
            value,
            setValue
          }) => {
            return <>
                  <div>Custom form</div>
                  <div>
                    <Select closeMenuOnSelect={false} isMulti options={options} value={value ?? []} onChange={values => {
                  setValue(values.length > 0 ? values : undefined);
                }} menuPosition={'fixed'} />
                  </div>
                </>;
          }
        }
      }],
      crudOptions: {
        primaryKey: 'uuid',
        edit: true,
        onSubmitFn: (data, action) => {
          return new Promise((resolve, reject) => {
            setResponse(JSON.stringify(data));
            tableRef.current?.setShowModal(false);
            resolve(null);
          });
        }
      },
      lazy: false
    };
    return <div>
        <div className='mt-3'>
          <Table tableProps={tableProps} ref={tableRef} />
        </div>
        <div className='mt-3'>
          onSubmitFn:
        </div>
        <div className='mt-3'>
          {response}
        </div>
      </div>;
  }
}`,...(c=(l=t.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const P=["CustomForm"];export{t as CustomForm,P as __namedExportsOrder,N as default};
//# sourceMappingURL=CustomForm.stories-6c82a5f0.js.map
