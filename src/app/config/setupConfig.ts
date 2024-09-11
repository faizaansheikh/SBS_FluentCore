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
  export const PeriodConfig = [
    CreateConfig("YearID", true, true, "Year ID", "text", null, "lg"),
    CreateConfig("StartDate", true, true, "Start Date", "date", null, "lg"),
    CreateConfig("EndDate", true, true, "End Date", "date", null, "lg"),
    CreateConfig("Closed", true, true, "Closed", "boolean", null, "md"),
    CreateConfig("CreatedUser", true, true, "Created By", "text", null, "md"),
    CreateConfig("createdAt", true, true, "Created At", "datetime", "md"),
  ];
  export const TaxDetailConfig = [
    CreateConfig(
      "TaxDetailCode",
      true,
      true,
      "Tax Detail Code",
      "text",
      null,
      "md"
    ),
    CreateConfig("TaxDetail", true, true, "Tax Detail", "text", null, "lg"),
    CreateConfig("TaxType", true, true, "Tax Type", "text", null, "md"),
    CreateConfig("TaxRate", true, true, "Tax Rate", "text", null, "md"),
    CreateConfig("CreatedUser", true, true, "Created By", "text", null, "md"),
    CreateConfig("createdAt", true, true, "Created At", "datetime", null, "md"),
    CreateConfig("IsActive", true, true, "Is Active", "boolean", null, "md"),
  ];