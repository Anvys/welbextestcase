import React, {useState} from 'react'
import {useAppDispatch} from "../../redux/store";
import {RadarThunks} from "../../redux/reducers/radarSlice";
import s from './AddForm.module.scss'

enum EAddState  {
    new = 0,
    added=1,
    error=2
}
type TProps = {}
export const AddForm:React.FC<TProps> = (props) => {
    const [isAdd, setIsAdd] = useState(false)
    const [addState, setAddState] = useState<EAddState>(EAddState.new)
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
            setName('')
            setCount(0)
            setRange(0)
            setAddState(EAddState.added)
            console.log(`to add: `, newRadar)
        }else{
            setAddState(EAddState.error)
        }
    }
    return (
        <div className={s.addForm}>

            <div className={s.checkDiv}>
                <label htmlFor={'check'}>{!isAdd?'Add one row?':'or not'}</label>
                <input name={'check'} type={'checkbox'} checked={isAdd} onChange={()=>setIsAdd(a=>!a)}/>
            </div>

            {isAdd && <form onSubmit={onFormSubmit} className={s.form}>
                <div>{addState===0?`Заполните поля:`:addState===1?`Добавлено! Заполните поля:`: `!err: Поля должны быть заполнены. Значения больше 0`}</div>
                <div className={s.fields}>
                    <div>
                        <label htmlFor={'name'}>Name</label>
                        <input type={'text'} name={'name'} value={name}
                               onChange={e=>setName(e.target.value)} className={name.length?s.isOK:s.isERR}/>
                    </div>
                    <div>
                        <label htmlFor={'count'}>Count</label>
                        <input type={'number'} name={'count'} value={count}
                               onChange={e=>setCount(Math.round(+e.target.value))} className={count>0?s.isOK:s.isERR}/>
                    </div>
                    <div>
                        <label htmlFor={'range'}>Range</label>
                        <input type={'number'} name={'range'} value={range}
                               onChange={e=>setRange(+e.target.value)} className={range>0?s.isOK:s.isERR}/>
                    </div>
                </div>
                <button type={'submit'}>Add</button>

            </form>}
        </div>
    )
}