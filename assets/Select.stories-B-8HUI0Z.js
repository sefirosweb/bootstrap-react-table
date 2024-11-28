import{T as l,j as e,B as u}from"./index-B-DUVf7N.js";import{r as m,R as p}from"./index-Dl6G-zuu.js";import{u as R}from"./tableProps-DHxE0Oyn.js";import"./index-Beu9b4Vr.js";import"./inheritsLoose-BSOQp05f.js";import"./index-D1_ZHIBm.js";const x={title:"Tables/Select",component:l},f={useQueryOptions:R,columns:[{accessorKey:"uuid",header:"UUID"},{accessorKey:"name",header:"Name",enableSorting:!0,meta:{filterable:!0}},{accessorKey:"description",header:"Desc."},{accessorKey:"price",header:"€",enableSorting:!0}],crudOptions:{primaryKey:"uuid",canSelectRow:!0,canRefresh:!0},lazy:!1},t={render:()=>{const r=m.useRef(null),[s,d]=p.useState([]),i=()=>{r.current&&d(r.current.getSelectedRows().map(n=>({uuid:n.uuid,name:n.name})))};return e.jsxs(e.Fragment,{children:[e.jsx(u,{onClick:i,children:"Get selected rows"}),e.jsx(l,{tableProps:f,ref:r}),e.jsxs("div",{children:["Selected rows: ",s.length]}),e.jsx("div",{children:JSON.stringify(s)})]})}};var a,o,c;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  render: () => {
    const tableRef = useRef<TableRef>(null);
    const [selectedRows, setSelectedRows] = React.useState<Array<any>>([]);
    const handleClick = () => {
      if (!tableRef.current) {
        return;
      }
      setSelectedRows(tableRef.current.getSelectedRows<GeneratedData>().map(row => ({
        uuid: row.uuid,
        name: row.name
      })));
    };
    return <>
        <Button onClick={handleClick}>Get selected rows</Button>
        <Table tableProps={tableProps} ref={tableRef} />
        <div>
          Selected rows: {selectedRows.length}
        </div>
        <div>
          {JSON.stringify(selectedRows)}
        </div>
      </>;
  }
}`,...(c=(o=t.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};const j=["SelectRowTemplate"];export{t as SelectRowTemplate,j as __namedExportsOrder,x as default};
