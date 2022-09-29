import React, {useState} from 'react'
import s from './Paginator.module.scss'
import {useSelector} from "react-redux";
import {RadarSelectors} from "../../redux/Selectors";
import {useAppDispatch} from "../../redux/store";
import {RadarThunks} from "../../redux/reducers/radarSlice";

type TProps = {}
export const Paginator: React.FC<TProps> = (props) => {
    const dispatch = useAppDispatch()
    const [showCount, setShowCount] = useState(0)
    const filter = useSelector(RadarSelectors.getFilter)
    const page = useSelector(RadarSelectors.getPage)
    const pageCount = useSelector(RadarSelectors.getCount)
    const total = useSelector(RadarSelectors.getTotal)
    const pages = Math.ceil(total / pageCount)
    const onPageCountClick = (c: number) => () => {
        if (c !== pageCount) {
            dispatch(RadarThunks.setPage({
                page: 1,
                count: c,
                filter: filter
            }))
        }
    }
    const onPageClick = (sPage: number) => () => {
        if (sPage !== page) {
            dispatch(RadarThunks.setPage({
                page: sPage,
                count: pageCount,
                filter: filter
            }))
        }
    }
    return (
        <div className={s.paginator}>
            <div className={s.main}>
                {<button disabled={!(showCount > 0)} onClick={() => setShowCount(a => a - 1)}>prev</button>}
                {new Array(pages).fill(1).map((v, i) => (i >= showCount * 10 && i < 10 * showCount + 10) ?
                    <div key={i} onClick={onPageClick(i + 1)}
                         className={page === i + 1 ? s.selected : ''}>{i + 1}</div> : null)}
                {<button onClick={() => setShowCount(a => a + 1)}
                         disabled={!(showCount * 10 + 10 < pages)}>next</button>}
            </div>
            <div className={s.pageCount}>
                <button className={pageCount === 10 ? s.selected : ''} onClick={onPageCountClick(10)}
                        type={'button'}>10
                </button>
                <button className={pageCount === 20 ? s.selected : ''} onClick={onPageCountClick(20)}
                        type={'button'}>20
                </button>
                <button className={pageCount === 50 ? s.selected : ''} onClick={onPageCountClick(50)}
                        type={'button'}>50
                </button>
                <button className={pageCount === 1000 ? s.selected : ''} onClick={onPageCountClick(1000)}
                        type={'button'}>1000!
                </button>
            </div>
        </div>
    )
}