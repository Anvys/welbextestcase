import React, {useState} from 'react'
import {TRadarKeys} from "../../Utils/Types";
import s from './DataView.module.scss'
import {sortByName} from "../../Utils/UtilFunc";
import {useSelector} from "react-redux";
import {RadarSelectors} from "../../redux/Selectors";
import {Paginator} from "../Paginator/Paginator";
import {SearchBar} from "../SearchBar/SearchBar";
import {AddForm} from "../AddForm/AddForm";

type TProps = {}
export const DataView: React.FC<TProps> = (props) => {
    const data = useSelector(RadarSelectors.getData)
    const errors = useSelector(RadarSelectors.getError)
    const [filter, setFilter] = useState<TRadarKeys>('name')
    const [asc, setAsc] = useState(false)
    const sortedData = [...data].sort(sortByName(filter, asc))
    const currentSortedCol = {
        textDecoration: 'underline',
        fontSize: '18px',
        fontWeight: 'bold',
    }
    const onSortClickHandler = (key: TRadarKeys) => () => {
        if (key !== filter) setAsc(false)
        else setAsc(a => !a)
        setFilter(key)
    }
    return (
        <>
            {errors.length > 0 && <div className={s.errorMsg}>{errors.join('\n')}</div>}
            <div className={s.searchDiv}>
                <SearchBar/>
                <AddForm/>
            </div>
            <Paginator/>
            <table className={s.table}>
                <thead className={s.thead}>
                    <tr className={s.headRow}>
                        <th>Дата</th>
                        <th style={filter === 'name' ? currentSortedCol : {}}
                            onClick={onSortClickHandler('name')}>Название
                        </th>
                        <th style={filter === 'count' ? currentSortedCol : {}}
                            onClick={onSortClickHandler('count')}>Количество
                        </th>
                        <th style={filter === 'range' ? currentSortedCol : {}}
                            onClick={onSortClickHandler('range')}>Расстояние
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.length > 0 ? sortedData.map((row, i) =>
                            <tr key={row.id}>
                                <td>{new Date(row.date).toLocaleDateString()}</td>
                                <td>{row.name}</td>
                                <td>{row.count}</td>
                                <td>{row.range.toFixed(5)}</td>
                            </tr>)
                        : <tr>
                            <td colSpan={4}>Nothing found</td>
                        </tr>}
                </tbody>
            </table>
        </>
    )
}