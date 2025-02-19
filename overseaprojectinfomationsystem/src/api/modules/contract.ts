import { ResPage, Contract } from "@/api/interface/index";
import { CONTRACT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 合同管理模块
 */
//收入合同管理
// 获取列表
export const getInfilingList = (params: any) => {
  return http.get<ResPage<Contract.InfilingTable>>(CONTRACT + `/infilings`, params);
};

// 新增
export const addInfiling = (params: { id: string }) => {
  return http.post(CONTRACT + `/infilings`, params);
};

// 编辑
export const editInfiling = (params: { id: string }) => {
  return http.put(CONTRACT + `/infilings`, params);
};

// 删除
export const deleteInfiling = (params: { id: string }) => {
  return http.delete(CONTRACT + `/infilings`, params);
};

// 审批
export const approvalInfiling = (params: { id: string }) => {
  return http.post(CONTRACT + `/pass?id=` + params.id, params);
  // return http.post(CONTRACT + `/pass`, params);
};

// 拒审
export const rejectInfiling = (params: { id: string }) => {
  return http.post(CONTRACT + `/reject?id=` + params.id, params);
  // return http.post(CONTRACT + `/pass`, params);
};

//支出合同管理
// 获取列表
export const getOutfilingList = (params: any) => {
  return http.get<ResPage<Contract.OutfilingTable>>(CONTRACT + `/outfilings`, params);
};

// 新增
export const addOutfiling = (params: { id: string }) => {
  return http.post(CONTRACT + `/outfilings`, params);
};

// 编辑
export const editOutfiling = (params: { id: string }) => {
  return http.put(CONTRACT + `/outfilings`, params);
};

// 删除
export const deleteOutfiling = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(CONTRACT + `/outfilings`, params);
};

// 审批
export const approvalOutfiling = (params: { id: string }) => {
  return http.post(CONTRACT + `/pass1?id=` + params.id, params);
  // return http.post(CONTRACT + `/pass`, params);
};

// 拒审
export const rejectOutfiling = (params: { id: string }) => {
  return http.post(CONTRACT + `/reject1?id=` + params.id, params);
  // return http.post(CONTRACT + `/pass`, params);
};

//管理合同
// 获取列表
export const getManageList = (params: any) => {
  return http.get<ResPage<Contract.ManageTable>>(CONTRACT + `/manages`, params);
};

// 新增
export const addManage = (params: { id: string }) => {
  return http.post(CONTRACT + `/manages`, params);
};

// 编辑
export const editManage = (params: { id: string }) => {
  return http.put(CONTRACT + `/manages`, params);
};

// 删除
export const deleteManage = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(CONTRACT + `/manages`, params);
};

// 导出
export const exportExcel = () => {
  // console.log("params",params)
  return http.download(CONTRACT + `/exportexcel`);
};
