import { ResPage, Market } from "@/api/interface/index";
import { MARKET } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 市场开发模块
 */
//市场营销
// 获取列表
export const getMarkList = (params: any) => {
  return http.get<ResPage<Market.MarkTable>>(MARKET + `/events`, params);
};

// 新增
export const addMark = (params: { id: string }) => {
  return http.post(MARKET + `/events`, params);
};

// 编辑
export const editMark = (params: { id: string }) => {
  return http.put(MARKET + `/events`, params);
};

// 删除
export const deleteMark = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(MARKET + `/events`, params);
};

// 导出
export const exportEventExcel = () => {
  // console.log("params",params)
  return http.download(MARKET + `/eventexcel`);
};

//技术宣讲
// 获取列表
export const getTechList = (params: any) => {
  return http.get<ResPage<Market.TechTable>>(MARKET + `/presentations`, params);
};

// 新增
export const addTech = (params: { id: string }) => {
  return http.post(MARKET + `/presentations`, params);
};

// 编辑
export const editTech = (params: { id: string }) => {
  return http.put(MARKET + `/presentations`, params);
};

// 删除
export const deleteTech = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(MARKET + `/presentations`, params);
};

// 导出
export const exportPreExcel = () => {
  // console.log("params",params)
  return http.download(MARKET + `/preexcel`);
};

//投标统计
// 获取列表
export const getBidList = (params: any) => {
  return http.get<ResPage<Market.BidTable>>(MARKET + `/bids`, params);
};

// 新增
export const addBid = (params: { id: string }) => {
  return http.post(MARKET + `/bids`, params);
};

// 编辑
export const editBid = (params: { id: string }) => {
  return http.put(MARKET + `/bids`, params);
};

// 删除
export const deleteBid = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(MARKET + `/bids`, params);
};

// 导出
export const exportBidExcel = () => {
  // console.log("params",params)
  return http.download(MARKET + `/bidexcel`);
};

//新签市场
// 获取列表
export const getNewSignList = (params: any) => {
  return http.get<ResPage<Market.NewSignTable>>(MARKET + `/newSigns`, params);
};

// 新增
export const addNewSign = (params: { id: string }) => {
  return http.post(MARKET + `/newSigns`, params);
};

// 编辑
export const editNewSign = (params: { id: string }) => {
  return http.put(MARKET + `/newSigns`, params);
};

// 删除
export const deleteNewSign = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(MARKET + `/newSigns`, params);
};

// 导出
export const exportNewsignExcel = () => {
  // console.log("params",params)
  return http.download(MARKET + `/newsignexcel`);
};

//潜在项目
// 获取列表
export const getPotProjectList = (params: any) => {
  return http.get<ResPage<Market.PotProjectTable>>(MARKET + `/potproject`, params);
};

// 新增
export const addPotProject = (params: { id: string }) => {
  return http.post(MARKET + `/potproject`, params);
};

// 编辑
export const editPotProject = (params: { id: string }) => {
  return http.put(MARKET + `/potproject`, params);
};

// 删除
export const deletePotProject = (params: { id: string }) => {
  // console.log("params",params)
  return http.delete(MARKET + `/potproject`, params);
};

// 导出
export const exportPotExcel = () => {
  // console.log("params",params)
  return http.download(MARKET + `/potexcel`);
};

//分中心
// 获取列表
export const getNewSignsByCenter = (params: any) => {
  return http.post(MARKET + `/newSignsByCenter`, params);
};