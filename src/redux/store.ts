import {configureStore} from "@reduxjs/toolkit";
import {RadarSlice} from "./reducers/radarSlice";
import {useDispatch} from "react-redux";


export const store = configureStore({
    reducer: {
        radar: RadarSlice.reducer,
    },
})

export type TAppState = ReturnType<typeof store.getState>
export type TAppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<TAppDispatch>()


