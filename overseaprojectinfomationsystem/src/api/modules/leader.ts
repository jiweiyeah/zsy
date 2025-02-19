import { MONTOTAL, COCKPIT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 领导者驾驶舱模块
 */
//领导者驾驶舱
// 新签市场金额
export const getnewSignChartData = (params: { startDate: Date; endDate: Date }) => {
  return http.post(COCKPIT + `/newSignChart`, params);
};
//中标率百分比4
export const getWinRatesData = (params: { startDate: Date; endDate: Date }) => {
  return http.post(MONTOTAL + `/winRates`, params);
};
//市场营销活动数量5
export const getMarketNumData = () => {
  return http.get(COCKPIT + `/marketnum`);
};
//市场活跃度指数7
export const getMarketActiveData = () => {
  return http.get(COCKPIT + `/marketactive`);
};
//海外中心市场累计完成进度条形图录入
export const getMarketConditionsData = (params:any) => {
  return http.post(COCKPIT + `/marketConditions`,params);
};
//海外中心市场累计完成进度条形图
export const getProgressChartData = () => {
  return http.get(COCKPIT + `/chart`);
};
//潜在项目数量
export const getTotalPotNumData = () => {
  return http.get(COCKPIT + `/totalPotNum`);
};
//月度汇总近六个月评标与中标数量
export const getTotalBidNumData = () => {
  return http.get(MONTOTAL + `/totalBidNum`);
};
//月度汇总近六个月总标的额同期对比
export const getTotalBidMoneyData = () => {
  return http.get(MONTOTAL + `/totalBidMoney`);
};
//月度汇总近六个月新签市场金额
export const getNewSignMoneyData = () => {
  return http.get(MONTOTAL + `/newSignMoney`);
};
//月度汇总潜在项目金额汇总
export const getPotMoneyData = () => {
  return http.get(MONTOTAL + `/potMoney`);
};