import{T as m,D as p,j as t,B as b}from"./index-14e1ce6b.js";import{r as l}from"./index-f1286426.js";import{g as n,a,b as y,c as P,d as f,e as v}from"./tableProps-524cbdfe.js";import{o as x}from"./onSubmitFn-c0c24b7e.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";const _={title:"Tables/Lazy",component:m},F={pageSize:5,page:1,inputFilters:[{filter:"description",label:"Desc.",text:"!"+n(n(a()).description.split(" "))}],globalFilter:n(n(a()).description.split(" ")),columnFilters:[{id:"price",value:[100,null]},{id:"name",value:n(y()).name},{id:"id_category",value:n(a()).uuid},{id:"created_at_date",value:[null,p.now().toISODate()]},{id:"created_at",value:[p.now().minus({days:7}).toFormat("yyyy-MM-dd'T'HH:mm:ss"),null]}],sorting:[{desc:!0,id:"created_at"}]},s={args:{tableProps:{useQueryOptions:P,columns:f,crudOptions:{...v,exportFn:e=>console.log("Add custom export",e)},lazy:!0}},render:e=>{const o=l.useRef(null),[r,i]=l.useState({page:1,pageSize:10,sorting:[]});return e.tableProps.crudOptions.onSubmitFn=(g,O)=>x(g,O,o.current),e.tableProps.crudOptions.pageOptions=r,e.tableProps.crudOptions.setPageOptions=i,e.tableProps.crudOptions.delayFilter=800,t.jsxs("div",{children:[t.jsx("div",{children:"This is Lazy load template"}),t.jsx("div",{children:t.jsx(b,{onClick:()=>{i({...r,...F,globalFilter:""})},children:"Change Page & apply filters"})}),t.jsx("div",{className:"mt-3",children:t.jsx(m,{...e,ref:o})})]})}};var d,u,c;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions: {
        ...crudOptions,
        exportFn: props => console.log('Add custom export', props)
      },
      lazy: true
    }
  },
  render: props => {
    const tableRef = useRef<TableRef>(null);
    const [pageOptions, setPageOptions] = useState<PageOptions>({
      page: 1,
      pageSize: 10,
      sorting: []
    });
    props.tableProps.crudOptions.onSubmitFn = (data, action) => onSubmitFn(data, action, tableRef.current);
    props.tableProps.crudOptions.pageOptions = pageOptions;
    props.tableProps.crudOptions.setPageOptions = setPageOptions;
    props.tableProps.crudOptions.delayFilter = 800;
    return <div>
        <div>
          This is Lazy load template
        </div>
        <div>
          <Button onClick={() => {
          setPageOptions({
            ...pageOptions,
            ...newPageOptions,
            globalFilter: ''
          });
        }}>
            Change Page & apply filters
          </Button>
        </div>
        <div className='mt-3'>
          <Table {...props} ref={tableRef} />
        </div>
      </div>;
  }
}`,...(c=(u=s.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const D=["LazyTemplate"];export{s as LazyTemplate,D as __namedExportsOrder,_ as default};
//# sourceMappingURL=LazyTemplate.stories-b2a444f2.js.map
