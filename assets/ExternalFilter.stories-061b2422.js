import{T as i,j as t,R as x,C as S,m as h}from"./index-3a35fc95.js";import{r as s}from"./index-f1286426.js";import{b as O,u as R}from"./tableProps-47d8bb61.js";import{S as P}from"./react-select.esm-dbe5a2d7.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-4dcb42d4.js";const z={title:"Tables/Filters",component:i},K=[...new Set(O().map(e=>e.name))].map(e=>({label:e,value:e})),a={render:()=>{const e=s.useRef(null),[r,c]=s.useState(void 0),[p,m]=s.useState({page:1,pageSize:10,sorting:[]});s.useEffect(()=>{var n;(n=e.current)==null||n.setColumnFilter("name",r)},[r]);const d={crudOptions:{primaryKey:"uuid",pageOptions:p,setPageOptions:m},lazy:!1,useQueryOptions:R,columns:[{accessorKey:"uuid"},{accessorKey:"name",header:"Name",enableSorting:!0,filterFn:(n,f,g)=>{const v=n.getValue(f);return g.every(b=>b.some(y=>h(v,y.value)))}},{accessorKey:"description",header:"Desc.",meta:{filterable:!0}},{accessorKey:"price",header:"€"}]};return t.jsxs("div",{children:[t.jsx(x,{children:t.jsx(S,{xs:4,children:t.jsx(P,{closeMenuOnSelect:!1,isMulti:!0,options:K,value:r??[],onChange:n=>{c(n.length>0?n:void 0)},menuPosition:"fixed"})})}),t.jsx("div",{className:"mt-3",children:t.jsx(i,{tableProps:d,ref:e})})]})}};var o,l,u;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  render: () => {
    const tableRef = useRef<TableRef>(null);
    const [value, setValue] = useState<MultiValue<{
      label: string;
      value: any;
    }> | undefined>(undefined);
    const [pageOptions, setPageOptions] = useState<PageOptions>({
      page: 1,
      pageSize: 10,
      sorting: []
    });
    useEffect(() => {
      tableRef.current?.setColumnFilter('name', value);
    }, [value]);
    const tableProps: TableProps<GeneratedData> = {
      crudOptions: {
        primaryKey: 'uuid',
        pageOptions,
        setPageOptions
      },
      lazy: false,
      useQueryOptions: useQueryOptionsEagle,
      columns: [{
        accessorKey: 'uuid'
      }, {
        accessorKey: 'name',
        header: 'Name',
        enableSorting: true,
        filterFn: (row, columnId, values) => {
          const text = (row.getValue(columnId) as string | number | null);
          return values.every(value => value.some(v => matchString(text, v.value)));
        }
      }, {
        accessorKey: 'description',
        header: 'Desc.',
        meta: {
          filterable: true
        }
      }, {
        accessorKey: 'price',
        header: '€'
      }]
    };
    return <div>
        <Row>
          <Col xs={4}>
            <Select closeMenuOnSelect={false} isMulti options={options} value={value ?? []} onChange={values => {
            setValue(values.length > 0 ? values : undefined);
          }} menuPosition={'fixed'} />
          </Col>
        </Row>
        <div className='mt-3'>
          <Table tableProps={tableProps} ref={tableRef} />
        </div>
      </div>;
  }
}`,...(u=(l=a.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const D=["ExternalFilter"];export{a as ExternalFilter,D as __namedExportsOrder,z as default};
//# sourceMappingURL=ExternalFilter.stories-061b2422.js.map
