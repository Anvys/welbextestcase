export type TResponseBody<T> = {
    status: number
    msg: Array<string>
    data: {
        total:number
        rows:Array<T>
    }}
export type TRadar = {
    id: number
    date: number,
    name: string,
    count: number,
    range: number
}
export type TRadarKeys = keyof TRadar
export type TFilterTypes = keyof Omit<TRadar, 'date'>
export type TFilterData = {
    page: number,
    count:number,
    filterType:TRadarKeys | undefined,
    expr:number,
    searchStr:string,
}
export type axRes = TResponseBody<TRadar>
export type TRequestBody = {
    type: string
    data: TRadar
}