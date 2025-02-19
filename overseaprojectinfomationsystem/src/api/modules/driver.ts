import { ResPage, Driver } from "@/api/interface/index";
import { COCKPIT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 领导者驾驶舱模块
 */
//海外领导出访立项
// 获取列表
export const getLeadVisitsByKey = (params: any) => {
  return http.post<ResPage<Driver.leadVisits>>(COCKPIT + `/leadVisitsByKey`, params);
};

// 新增
export const addLeadVisits = (params: { id: string }) => {
  return http.post(COCKPIT + `/leadVisits`, params);
};

// 编辑
export const editLeadVisits = (params: { id: string }) => {
  return http.put(COCKPIT + `/leadVisits`, params);
};

// 删除
export const deleteLeadVisits = (params: { id: string }) => {
  return http.delete(COCKPIT + `/leadVisits`, params);
};

//海外中心市场累计完成进度
// 获取列表
export const getMarketConditionsList = (params: any) => {
  return http.get<ResPage<Driver.marketConditions>>(COCKPIT + `/marketConditions`, params);
};

// 新增
export const addMarketConditions = (params: { id: string }) => {
  return http.post(COCKPIT + `/marketConditions`, params);
};

// 编辑
export const editMarketConditions = (params: { id: string }) => {
  return http.put(COCKPIT + `/marketConditions`, params);
};

// 删除
export const deleteMarketConditions = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(COCKPIT + `/marketConditions`, params);
};
