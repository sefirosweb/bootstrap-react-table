import{T as m,D as p,j as t,B as b}from"./index-b8856a02.js";import{r as l}from"./index-f1286426.js";import{g as n,a as s,b as y,c as P,d as f,e as v}from"./tableProps-2157d55f.js";import{o as F}from"./onSubmitFn-6b7db90f.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";const _={title:"Tables/Lazy",component:m},x={pageSize:5,page:1,inputFilters:[{filter:"description",label:"Desc.",text:"!"+n(n(s()).description.split(" "))}],globalFilter:n(n(s()).description.split(" ")),columnFilters:[{id:"price",value:[100,null]},{id:"name",value:n(y()).name},{id:"id_category",value:n(s()).uuid},{id:"created_at_date",value:[null,p.now().toISODate()]},{id:"created_at",value:[p.now().minus({days:7}).toFormat("yyyy-MM-dd'T'HH:mm:ss"),null]}],sorting:[{desc:!0,id:"created_at"}]},a={args:{tableProps:{useQueryOptions:P,columns:f,crudOptions:{...v},lazy:!0}},render:e=>{const i=l.useRef(null),[o,r]=l.useState({page:1,pageSize:10,sorting:[]});return e.tableProps.crudOptions.enableGlobalFilterLabels=void 0,e.tableProps.crudOptions.onSubmitFn=(g,O)=>F(g,O,i.current),e.tableProps.crudOptions.pageOptions=o,e.tableProps.crudOptions.setPageOptions=r,e.tableProps.crudOptions.delayFilter=800,t.jsxs("div",{children:[t.jsx("div",{children:"This is Lazy load template"}),t.jsx("div",{children:t.jsx(b,{onClick:()=>{r({...o,...x,inputFilters:[]})},children:"Change Page & apply filters"})}),t.jsx("div",{className:"mt-3",children:t.jsx(m,{...e,ref:i})})]})}};var d,u,c;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    tableProps: {
      useQueryOptions: useQueryOptionsLazy,
      columns,
      crudOptions: {
        ...crudOptions
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
    props.tableProps.crudOptions.enableGlobalFilterLabels = undefined;
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
            inputFilters: []
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
}`,...(c=(u=a.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const D=["LazyTemplateGlobal"];export{a as LazyTemplateGlobal,D as __namedExportsOrder,_ as default};
//# sourceMappingURL=LazyTemplateGlobal.stories-76f9fcd3.js.map
