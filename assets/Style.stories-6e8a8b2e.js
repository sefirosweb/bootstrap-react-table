import{T as s}from"./index-d6d886a5.js";import{u as n}from"./tableProps-35607553.js";import"./index-f1286426.js";import"./_commonjsHelpers-de833af9.js";import"./index-8d47fad6.js";import"./inheritsLoose-843c0be4.js";const d={title:"Tables/Style",component:s},i={useQueryOptions:n,columns:[{accessorKey:"uuid",header:"UUID"},{accessorKey:"name",header:"Name",enableSorting:!0,meta:{getCellStyle:e=>({color:e.row.original.price>100?"red":"green"})}},{accessorKey:"description",header:"Desc."},{accessorKey:"price",header:"€",enableSorting:!0,meta:{getCellClass:e=>e.row.original.price>100?"text-warning":"text-white"}}],crudOptions:{primaryKey:"uuid",getRowStyles:e=>({backgroundColor:e.original.price>100?"red":"green"}),getRowClass:e=>e.original.price>100?"table-danger":"table-success"},lazy:!1},r={args:{tableProps:i}};var t,o,a;r.parameters={...r.parameters,docs:{...(t=r.parameters)==null?void 0:t.docs,source:{originalSource:`{
  args: {
    tableProps: tableProps
  }
}`,...(a=(o=r.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};const y=["CustomStyle"];export{r as CustomStyle,y as __namedExportsOrder,d as default};
//# sourceMappingURL=Style.stories-6e8a8b2e.js.map
