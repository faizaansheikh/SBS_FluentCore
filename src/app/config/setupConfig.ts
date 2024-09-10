let CreateConfig = (
    field:any,
    searchable:any,
    show:any,
    title:any,
    type:any,
    searchField:any,
    width = "md"
  ) => {
    return {
      field: field,
      searchField: searchField ? searchField : field,
      key: field,
      searchable: searchable,
      show: show,
      filterRev: true,
      title: title,
      label: title,
      type: type,
      width: width,
    };
  };

  export let UsersConfig = [
    CreateConfig("UserName", true, true, "User Name", "text", null, "lg"),
    CreateConfig("Designation", true, true, "Designation", "text", null, "lg"),
    CreateConfig("Email", true, true, "Email", "text", null, "lg"),
    CreateConfig("ContactNo", true, true, "Contact No", "text", null, "lg"),
    CreateConfig("IsActive", true, true, "Is Active", "boolean", null, "md"),
  ];
  export const RolesConfig = [
    CreateConfig("RoleName", true, true, "Role Name", "text", null, "xl"),
    CreateConfig("Remarks", true, true, "Remarks", "text", null, "xl"),
    CreateConfig("IsActive", true, true, "Is Active", "boolean", null, "xl"),
  ];