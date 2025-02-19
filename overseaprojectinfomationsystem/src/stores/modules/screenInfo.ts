import { defineStore } from "pinia";
import { ScreenInfoState } from "@/stores/interface";

export const screenInfoStore = defineStore({
  id: "screenInfo",
  state: (): ScreenInfoState => ({
    currentLeaderChart: 1,
    hotNewsList: [],
    monthlyVisits: [],
    monthlyBiddings: []
  }),
  getters: {},
  actions: {
    // Set currentLeaderChart
    setCurrentLeaderChart(currentLeaderChart: any) {
      this.currentLeaderChart = currentLeaderChart;
    },
    // Set hotNewsList
    setHotNewsList(hotNewsList: any[]) {
      this.hotNewsList = hotNewsList;
    },
    // Set MonthlyVisits
    setMonthlyVisits(monthlyVisits: string[]) {
      this.monthlyVisits = monthlyVisits;
    },
    // Set MonthlyBiddings
    setMonthlyBiddings(monthlyBiddings: string[]) {
      this.monthlyBiddings = monthlyBiddings;
    }
  }
});
