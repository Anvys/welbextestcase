import React from 'react'
import {useSelector} from "react-redux";
import {RadarSelectors} from "./redux/Selectors";
import {useAppDispatch} from "./redux/store";
import {RadarThunks} from "./redux/reducers/radarSlice";
import {ExprCodes} from "./Utils/StatusCodes";
import {DataView} from "./components/DataView/DataView";
import s from './App.module.scss'

type TProps = {}
export const App:React.FC<TProps> = (props) => {
    const dispatch = useAppDispatch()
    const isInit = useSelector(RadarSelectors.isInit)
    if(!isInit) dispatch(RadarThunks.getAll({
        // page:1,
        // count:20,
        expr: ExprCodes.include,
        filterType:'',
        searchStr:''
    }))
    return (
        <div className={s.app}>
            <div className={s.dataView}>
                <DataView/>
            </div>

        </div>
    )
}