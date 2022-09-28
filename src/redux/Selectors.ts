import {TAppState} from "./store";

export const RadarSelectors = {
    isInit:(state: TAppState) => state.radar.isInit,
    getData: (state: TAppState) => state.radar.data,
    getPage: (state: TAppState) => state.radar.page,
    getCount: (state: TAppState) => state.radar.count,
    getTotal: (state: TAppState) => state.radar.total,
    getFilter: (state: TAppState) => state.radar.filter,
}