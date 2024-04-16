import{T as i,j as t,a as x,C as S,m as h}from"./index-CJMv-7GL.js";import{r as a}from"./index-Dl6G-zuu.js";import{g as O,u as P}from"./tableProps-C-DGoYGn.js";import{S as R}from"./react-select.esm-2_Zr2et-.js";import"./index-Beu9b4Vr.js";import"./inheritsLoose-BSOQp05f.js";import"./index-D1_ZHIBm.js";import"./emotion-use-insertion-effect-with-fallbacks.browser.esm-CLaqXPN6.js";const z={title:"Tables/Filters",component:i},K=[...new Set(O().map(e=>e.name))].map(e=>({label:e,value:e})),s={render:()=>{const e=a.useRef(null),[r,c]=a.useState(void 0),[p,m]=a.useState({page:1,pageSize:10,sorting:[]});a.useEffect(()=>{var n;(n=e.current)==null||n.setColumnFilter("name",r)},[r]);const d={crudOptions:{primaryKey:"uuid",pageOptions:p,setPageOptions:m},lazy:!1,useQueryOptions:P,columns:[{accessorKey:"uuid"},{accessorKey:"name",header:"Name",enableSorting:!0,filterFn:(n,f,g)=>{const v=n.getValue(f);return g.every(y=>y.some(b=>h(v,b.value)))}},{accessorKey:"description",header:"Desc.",meta:{filterable:!0}},{accessorKey:"price",header:"€"}]};return t.jsxs("div",{children:[t.jsx(x,{children:t.jsx(S,{xs:4,children:t.jsx(R,{closeMenuOnSelect:!1,isMulti:!0,options:K,value:r??[],onChange:n=>{c(n.length>0?n:void 0)},menuPosition:"fixed"})})}),t.jsx("div",{className:"mt-3",children:t.jsx(i,{tableProps:d,ref:e})})]})}};var o,l,u;s.parameters={...s.parameters,docs:{...(o=s.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
}`,...(u=(l=s.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};const D=["ExternalFilter"];export{s as ExternalFilter,D as __namedExportsOrder,z as default};
