import { Delete, Get, Post, Put } from "./apimethods";

export const GeneralCoreService = (controller:any, apiName?:any, module?:any) => {
  return {
    Save: (body:any, id:any) => {
      body.CompanyID = 1;
      body.CreatedBy = "Testing User";
      if (id) {
        return Put(`${controller}${apiName ? "/" + apiName : ""}`, body, id);
      } else {
        return Post(`${controller}${apiName ? "/" + apiName : ""}`, body);
      }
    },
    GetOne: (id:any) => {
      return Get(`${controller}${apiName ? "/" + apiName : ""}`, id);
    },
    GetAll: () => {
      return Get(`${controller}${apiName ? "/" + apiName : ""}`);
    },
    DeleteOne: (id:any) => {
      return Delete(`${controller}${apiName ? "/" + apiName : ""}`, id);
    },
    BulkDelete: (idList:any) => {
      return Post(`${controller}${apiName ? "/" + apiName : "/bulkdelete"}`, {
        idList: idList,
      });
    },
    BulkPost: (idList:any) => {
      return Post(`${controller}/bulkpost`, {
        idList: idList
      })
    },
    BulkVoid: (idList:any) => {
      return Post(`${controller}/${apiName}/bulkvoid`, {
        idList: idList
      })
    },
    Register: (params:any) => {
      return Get(
        `${controller}${apiName ? "/" + apiName : ""}/register`,
        null,
        params
      );
    },
    Lookup: (params:any) => {
      return Get(`${module}/lookup/${controller}`, null, params);
    },
  };
};
