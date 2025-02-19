import { ResPage, Screen } from "@/api/interface/index";
import { COCKPIT } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 数据大屏模块
 */

// 获取新闻热点列表
export const getHotNews = () => {
  return http.get(COCKPIT + `/news`);
};
// 获取新闻热点列表
export const getMonthVisits = () => {
  return http.get(COCKPIT + `/monthvisits`);
};
// 获取新闻热点列表
export const getMonthBids = () => {
  return http.get(COCKPIT + `/monthbids`);
};