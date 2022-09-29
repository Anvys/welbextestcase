import React, {useEffect, useState} from 'react'
import styles from './SearchBar.module.scss'
import {useSelector} from "react-redux";
import {RadarSelectors} from "../../redux/Selectors";
import {TRadarKeys} from "../../Utils/Types";
import {ExprCodes} from "../../Utils/StatusCodes";
import {useAppDispatch} from "../../redux/store";
import {RadarSlice, RadarThunks} from "../../redux/reducers/radarSlice";
import useDebounce from "../../Utils/useDebounce";

type TProps = {}
export const SearchBar: React.FC<TProps> = (props) => {
    const dispatch = useAppDispatch()
    const filter = useSelector(RadarSelectors.getFilter)
    const [key, setKey] = useState<TRadarKeys | ''>(() => filter.filterType)
    const [expr, setExpr] = useState<ExprCodes>(() => filter.expr)
    const [searchString, setSearchString] = useState<string>(() => filter.searchStr)
    const [isSearching, setIsSearching] = useState(false);
    const debouncedSearchTerm = useDebounce(searchString, 300);
    const onFormSubmit: React.FormEventHandler = (e) => {
        e.preventDefault()
        const newFilter = {
            filterType: key,
            expr: expr,
            searchStr: searchString,
        }
        dispatch(RadarThunks.setFilter(newFilter))
        console.log('Submitted', newFilter)
    }
    const onClearHandler = ()=>{
        dispatch(RadarSlice.actions.resetFilter())
        setKey('')
        setExpr(() => filter.expr)
        setSearchString('')
    }
    useEffect(
        () => {
            setIsSearching(true);
            const newFilter = {
                filterType: key,
                expr: expr,
                searchStr: debouncedSearchTerm,
            }
            dispatch(RadarThunks.setFilter(newFilter)).then(r => {
                setIsSearching(false);
            })
        }, [debouncedSearchTerm]
    );
    return (
        <form onSubmit={onFormSubmit}>
            <div>
                <label>Search in </label>
                <select value={key} onChange={e => setKey(e.target.value as TRadarKeys | '')}>
                    <option value={''}
                            >{`Select key`}</option>
                    <option value={'name'}>{`Name`}</option>
                    <option value={'count'}>{`Count`}</option>
                    <option value={'range'}>{`Range`}</option>
                </select>
            </div>

            <div>
                <label>Expression </label>
                <select value={expr} onChange={e => setExpr(+e.target.value as ExprCodes)} disabled={!key}>
                    <option value={ExprCodes.include}>{`Include`}</option>
                    <option value={ExprCodes.equal}>{`Equal(=)`}</option>
                    {key !== 'name' && <option value={ExprCodes.less}>{`Less(<)`}</option>}
                    {key !== 'name' && <option value={ExprCodes.more}>{`More(>)`}</option>}
                </select>
            </div>
            <div>
                <label>Search string </label>
                <input placeholder={'Search...'} type={key==='name'?"text":'number'} value={searchString}
                       onChange={e => setSearchString(e.target.value)} disabled={!key}/>
            </div>
            <div>
                {isSearching ? <div>Searching ...</div> : <>
                <button type={'submit'}>Search!</button>
                <button type={'button'} onClick={onClearHandler}>clear!</button></>}
            </div>


        </form>
    )
}