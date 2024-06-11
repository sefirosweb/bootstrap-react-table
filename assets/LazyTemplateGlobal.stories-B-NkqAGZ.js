import{T as m,b as p,j as t,B as O}from"./index-D1QxWjcS.js";import{r as l}from"./index-Dl6G-zuu.js";import{b as n,d as s,g as y,e as P,c as f,a as v}from"./tableProps-BqjqJ60T.js";import{o as F}from"./onSubmitFn-vn8g0bqA.js";import"./index-Beu9b4Vr.js";import"./inheritsLoose-BSOQp05f.js";import"./index-D1_ZHIBm.js";const _={title:"Tables/Lazy",component:m},x={pageSize:5,page:1,inputFilters:[{filter:"description",label:"Desc.",text:"!"+n(n(s()).description.split(" "))}],globalFilter:n(n(s()).description.split(" ")),columnFilters:[{id:"price",value:[100,null]},{id:"name",value:n(y()).name},{id:"id_category",value:n(s()).uuid},{id:"created_at_date",value:[null,p.now().toISODate()]},{id:"created_at",value:[p.now().minus({days:7}).toFormat("yyyy-MM-dd'T'HH:mm:ss"),null]}],sorting:[{desc:!0,id:"created_at"}]},a={args:{tableProps:{useQueryOptions:P,columns:f,crudOptions:{...v},lazy:!0}},render:e=>{const i=l.useRef(null),[o,r]=l.useState({page:1,pageSize:10,sorting:[]});return e.tableProps.crudOptions.enableGlobalFilterLabels=void 0,e.tableProps.crudOptions.onSubmitFn=(g,b)=>F(g,b,i.current),e.tableProps.crudOptions.pageOptions=o,e.tableProps.crudOptions.setPageOptions=r,e.tableProps.crudOptions.delayFilter=800,t.jsxs("div",{children:[t.jsx("div",{children:"This is Lazy load template"}),t.jsx("div",{children:t.jsx(O,{onClick:()=>{r({...o,...x,inputFilters:[]})},children:"Change Page & apply filters"})}),t.jsx("div",{className:"mt-3",children:t.jsx(m,{...e,ref:i})})]})}};var d,u,c;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(c=(u=a.parameters)==null?void 0:u.docs)==null?void 0:c.source}}};const w=["LazyTemplateGlobal"];export{a as LazyTemplateGlobal,w as __namedExportsOrder,_ as default};
