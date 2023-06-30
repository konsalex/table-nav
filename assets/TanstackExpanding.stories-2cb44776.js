import{j as d,a as t}from"./jsx-runtime-a888423b.js";import{u as i}from"./index-8950ccd2.js";import"./index-8db94870.js";import"./_commonjsHelpers-042e6b4d.js";const p={title:"Svelte/Example"},e=()=>{const{listeners:l}=i({debug:!0});return d("table",{...l,children:[d("thead",{children:[d("tr",{children:[t("th",{colSpan:2,tabIndex:-1,children:t("div",{children:"Name "})}),t("th",{colSpan:4,tabIndex:-1,children:t("div",{children:"Info "})})," "]}),d("tr",{children:[t("th",{colSpan:1}),t("th",{colSpan:1}),t("th",{colSpan:1}),t("th",{colSpan:3,children:t("div",{children:"More Info "})})," "]}),d("tr",{children:[t("th",{colSpan:1,children:t("div",{className:"cursor-pointer select-none",children:"firstName "})}),t("th",{colSpan:1,children:t("div",{className:"cursor-pointer select-none",children:"Last Name "})}),t("th",{colSpan:1,children:t("div",{className:"cursor-pointer select-none",children:"Age "})}),t("th",{colSpan:1,children:t("div",{className:"cursor-pointer select-none",children:"Visits "})}),t("th",{colSpan:1,children:t("div",{className:"cursor-pointer select-none",children:"Status "})}),t("th",{colSpan:1,children:t("div",{className:"cursor-pointer select-none",children:"Profile Progress "})})," "]})]})," ",d("tbody",{children:[d("tr",{children:[t("td",{children:"Oran"}),t("td",{children:"Hyatt"}),t("td",{children:"0"}),t("td",{children:"796"}),t("td",{children:"relationship"}),t("td",{children:"31"})," "]}),d("tr",{children:[t("td",{children:"Carter"}),t("td",{children:"Watsica"}),t("td",{children:"24"}),t("td",{children:"581"}),t("td",{children:"single"}),t("td",{children:"90"})," "]}),d("tr",{children:[t("td",{children:"Jade"}),t("td",{children:"Windler"}),t("td",{children:"24"}),t("td",{children:"379"}),t("td",{children:"complicated"}),t("td",{children:"65"})," "]}),d("tr",{children:[t("td",{children:"Craig"}),t("td",{children:"Russel"}),t("td",{children:"7"}),t("td",{children:"712"}),t("td",{children:"complicated"}),t("td",{children:"84"})," "]}),d("tr",{children:[t("td",{children:"Alfonzo"}),t("td",{children:"Bogisich"}),t("td",{children:"35"}),t("td",{children:"59"}),t("td",{children:"complicated"}),t("td",{children:"73"})," "]}),d("tr",{children:[t("td",{children:"Tanya"}),t("td",{children:"Barton"}),t("td",{children:"36"}),t("td",{children:"340"}),t("td",{children:"relationship"}),t("td",{children:"31"})," "]}),d("tr",{children:[t("td",{children:"Rhett"}),t("td",{children:"Paucek"}),t("td",{children:"38"}),t("td",{children:"425"}),t("td",{children:"complicated"}),t("td",{children:"99"})," "]}),d("tr",{children:[t("td",{children:"Otilia"}),t("td",{children:"Kuhic"}),t("td",{children:"36"}),t("td",{children:"617"}),t("td",{children:"complicated"}),t("td",{children:"95"})," "]}),d("tr",{children:[t("td",{children:"Maddison"}),t("td",{children:"Tromp"}),t("td",{children:"9"}),t("td",{children:"576"}),t("td",{children:"relationship"}),t("td",{children:"22"})," "]}),d("tr",{children:[t("td",{children:"Cielo"}),t("td",{children:"Kshlerin"}),t("td",{children:"14"}),t("td",{children:"775"}),t("td",{children:"relationship"}),t("td",{children:"86"})," "]})]})," ",d("tfoot",{children:[d("tr",{children:[t("th",{colSpan:1,tabIndex:-1,children:"firstName"}),t("th",{colSpan:1,tabIndex:-1,children:"lastName"}),t("th",{colSpan:1,tabIndex:-1,children:"age"}),t("th",{colSpan:1,tabIndex:-1,children:"visits"}),t("th",{colSpan:1,tabIndex:-1,children:"status"}),t("th",{colSpan:1,tabIndex:-1,children:"progress"})," "]}),d("tr",{children:[t("th",{colSpan:1}),t("th",{colSpan:1}),t("th",{colSpan:1}),t("th",{colSpan:3})," "]}),d("tr",{children:[t("th",{colSpan:2,children:"Name"}),t("th",{colSpan:4,children:"Info"})," "]})]})]})};var r,n,c;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`() => {
  const {
    listeners
  } = useTableNav({
    debug: true
  });
  return <table {...listeners}>
      <thead>
        <tr>
          <th colSpan={2} tabIndex={-1}>
            <div>Name </div>
          </th>
          <th colSpan={4} tabIndex={-1}>
            <div>Info </div>
          </th>{' '}
        </tr>
        <tr>
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={3}>
            <div>More Info </div>
          </th>{' '}
        </tr>
        <tr>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">firstName </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Last Name </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Age </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Visits </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Status </div>
          </th>
          <th colSpan={1}>
            <div className="cursor-pointer select-none">Profile Progress </div>
          </th>{' '}
        </tr>
      </thead>{' '}
      <tbody>
        <tr>
          <td>Oran</td>
          <td>Hyatt</td>
          <td>0</td>
          <td>796</td>
          <td>relationship</td>
          <td>31</td>{' '}
        </tr>
        <tr>
          <td>Carter</td>
          <td>Watsica</td>
          <td>24</td>
          <td>581</td>
          <td>single</td>
          <td>90</td>{' '}
        </tr>
        <tr>
          <td>Jade</td>
          <td>Windler</td>
          <td>24</td>
          <td>379</td>
          <td>complicated</td>
          <td>65</td>{' '}
        </tr>
        <tr>
          <td>Craig</td>
          <td>Russel</td>
          <td>7</td>
          <td>712</td>
          <td>complicated</td>
          <td>84</td>{' '}
        </tr>
        <tr>
          <td>Alfonzo</td>
          <td>Bogisich</td>
          <td>35</td>
          <td>59</td>
          <td>complicated</td>
          <td>73</td>{' '}
        </tr>
        <tr>
          <td>Tanya</td>
          <td>Barton</td>
          <td>36</td>
          <td>340</td>
          <td>relationship</td>
          <td>31</td>{' '}
        </tr>
        <tr>
          <td>Rhett</td>
          <td>Paucek</td>
          <td>38</td>
          <td>425</td>
          <td>complicated</td>
          <td>99</td>{' '}
        </tr>
        <tr>
          <td>Otilia</td>
          <td>Kuhic</td>
          <td>36</td>
          <td>617</td>
          <td>complicated</td>
          <td>95</td>{' '}
        </tr>
        <tr>
          <td>Maddison</td>
          <td>Tromp</td>
          <td>9</td>
          <td>576</td>
          <td>relationship</td>
          <td>22</td>{' '}
        </tr>
        <tr>
          <td>Cielo</td>
          <td>Kshlerin</td>
          <td>14</td>
          <td>775</td>
          <td>relationship</td>
          <td>86</td>{' '}
        </tr>
      </tbody>{' '}
      <tfoot>
        <tr>
          <th colSpan={1} tabIndex={-1}>
            firstName
          </th>
          <th colSpan={1} tabIndex={-1}>
            lastName
          </th>
          <th colSpan={1} tabIndex={-1}>
            age
          </th>
          <th colSpan={1} tabIndex={-1}>
            visits
          </th>
          <th colSpan={1} tabIndex={-1}>
            status
          </th>
          <th colSpan={1} tabIndex={-1}>
            progress
          </th>{' '}
        </tr>
        <tr>
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={1} />
          <th colSpan={3} />{' '}
        </tr>
        <tr>
          <th colSpan={2}>Name</th>
          <th colSpan={4}>Info</th>{' '}
        </tr>
      </tfoot>
    </table>;
}`,...(c=(n=e.parameters)==null?void 0:n.docs)==null?void 0:c.source}}};const S=["Test"];export{e as Test,S as __namedExportsOrder,p as default};
//# sourceMappingURL=TanstackExpanding.stories-2cb44776.js.map
