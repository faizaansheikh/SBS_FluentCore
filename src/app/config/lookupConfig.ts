const CreateConfig = (key: string, label: string) => {
    return {
        key,
        label,
    }
}


  export const roleConfig = [
    CreateConfig('Id', 'Id'),
    CreateConfig('RoleName', 'Role Name'),

]
export const companyConfig = [
    CreateConfig("Id", "Company ID"),
    CreateConfig("CompName", "Company Name"),
  ];
  
  export const locationConfig = [
    CreateConfig("LocationID", "Location ID"),
    CreateConfig("Location", "Location"),
  ];
  export const segmentConfig = [
    CreateConfig("VSCode", "VS Code"),
    CreateConfig("VSDesc",  "VS Desc"),
  ];
  