import React, {useState} from 'react'
import {useAppDispatch} from "../../redux/store";
import {RadarThunks} from "../../redux/reducers/radarSlice";
import s from './AddForm.module.scss'

type TProps = {}
export const AddForm:React.FC<TProps> = (props) => {
    const [isAdd, setIsAdd] = useState(false)
    const [name, setName] = useState('')
    const [count, setCount] = useState(0)
    const [range, setRange] = useState(0)
    const dispatch = useAppDispatch()

    const onFormSubmit:React.FormEventHandler = (e)=>{
        e.preventDefault()
        if(!!name && count>0 && range>0){
            const newRadar = {
                name, count,range,
                date: Date.now(),
                id:-1//Заглушка
            }
            dispatch(RadarThunks.addOne(newRadar))
            console.log(`to add: `, newRadar)
        }
    }
    return (
        <div className={s.addForm}>
            <div className={s.checkDiv}>
                <label htmlFor={'check'}>{!isAdd?'Add one row?':'or not'}</label>
                <input name={'check'} type={'checkbox'} checked={isAdd} onChange={()=>setIsAdd(a=>!a)}/>

            </div>

            {isAdd && <form onSubmit={onFormSubmit} className={s.form}>
                <div className={s.fields}>
                    <div>
                        <label htmlFor={'name'}>Name</label>
                        <input type={'text'} name={'name'} value={name} onChange={e=>setName(e.target.value)}/>
                    </div>
                    <div>
                        <label htmlFor={'count'}>Count</label>
                        <input type={'number'} name={'count'} value={count} onChange={e=>setCount(Math.round(+e.target.value))}/>
                    </div>
                    <div>
                        <label htmlFor={'range'}>Range</label>
                        <input type={'number'} name={'range'} value={range} onChange={e=>setRange(+e.target.value)}/>
                    </div>
                </div>
                <button type={'submit'}>Add</button>

            </form>}
        </div>
    )
}