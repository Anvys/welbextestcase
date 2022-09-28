import type {PayloadAction} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {TFilterData, TRadar, TRadarKeys} from "../../Utils/Types";
import {radarAPI} from "../../API/radarAPI";
import {checkError} from "../../Utils/UtilFunc";
import {ExprCodes} from "../../Utils/StatusCodes";
import {TAppState} from "../store";

const reducerPath = 'wtc/radar'

export type TFilter = {
    expr: ExprCodes,
    filterType: TRadarKeys | undefined,
    searchStr: string
}
export type TInitialState = {
    data: Array<TRadar>
    isInit: boolean
    total: number
    page: number
    count: number // rows per page
    filter: TFilter
}
const initialState: TInitialState = {
    data: [],
    isInit: false,
    total: 0,
    page: 1,
    count: 10,
    filter: {
        expr: ExprCodes.include,
        filterType: undefined,
        searchStr: ''
    }
}

export const RadarSlice = createSlice({
    name: 'radar',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Array<TRadar>>) => {
            state.data = [...action.payload];
            state.isInit = true;
        },
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload
        },
        setFilter: (state, action: PayloadAction<TFilter>) => {
            state.filter = {...action.payload}
        },
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        // builder.addCase(RadarThunks.getAll.fulfilled, (state, action) => {
        // })
    }
})

export type TRadarThunks = typeof RadarThunks;
export const RadarThunks = {
    getAll: createAsyncThunk(`${reducerPath}/getAll`, async (filter: TFilter, thunkAPI) => {
            const state = thunkAPI.getState() as TAppState
            const res = await radarAPI.getAll({...filter, page: state.radar.page, count: state.radar.count})
            if (checkError(res)) {
                thunkAPI.dispatch(RadarSlice.actions.init(res.data.rows.map(v =>
                    ({...v, date: Number(v.date), range: Number(v.range)}))))
                thunkAPI.dispatch(RadarSlice.actions.setTotal(res.data.total))
            }
        }
    ),
    setPage: createAsyncThunk(`${reducerPath}/setPage`, async (data: { page: number, count: number, filter: TFilter }, thunkAPI) => {
            thunkAPI.dispatch(RadarSlice.actions.setPage(data.page))
            thunkAPI.dispatch(RadarSlice.actions.setCount(data.count))
            thunkAPI.dispatch(RadarThunks.getAll({
                // page: data.page,
                // count: data.count,
                ...data.filter
            }))
        }
    ),
    setFilter: createAsyncThunk(`${reducerPath}/setFilter`, async (filter: TFilter, thunkAPI) => {
            thunkAPI.dispatch(RadarSlice.actions.setPage(1))
            thunkAPI.dispatch(RadarSlice.actions.setFilter(filter))
            thunkAPI.dispatch(RadarThunks.getAll({
                ...filter
            }))
        }
    ),
    // getOne: createAsyncThunk(`${reducerPath}/getOne`, async (id: string, thunkAPI) => {
    //         thunkAPI.dispatch(CurSlice.actions.initSelectArr())
    //         const res = await radarAPI.getOne(id)
    //         if (checkError(res)) return res.data
    //     }
    // ),
    // addOne: createAsyncThunk(`${reducerPath}/addOne`, async (data: TWOid<TQuest>, thunkAPI) => {
    //         const res = await radarAPI.addOne(data)
    //         if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.addOne(res.data))
    //     }
    // ),
    // updateOne: createAsyncThunk(`${reducerPath}/updateOne`, async (resInfo: { id: string, data: TQuest }, thunkAPI) => {
    //         const res = await radarAPI.updateOne(resInfo.id, resInfo.data)
    //         if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.updateOne({
    //             id: resInfo.id,
    //             data: resInfo.data
    //         }))
    //     }
    // ),
    // deleteOne: createAsyncThunk(`${reducerPath}/deleteOne`, async (id: string, thunkAPI) => {
    //         const res = await radarAPI.deleteOne(id)
    //         if (checkError(res)) thunkAPI.dispatch(CurSlice.actions.deleteOne({id: id}))
    //     }
    // ),
}
