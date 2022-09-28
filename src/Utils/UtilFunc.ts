import {TRadar, TRadarKeys, TResponseBody} from "./Types";
import {StatusCodes} from "./StatusCodes";

export const checkError = (data: TResponseBody<TRadar>): boolean => {
    if (data.status !== StatusCodes.Ok) data.msg.forEach(v => console.log(v))

    return data.status === StatusCodes.Ok
}
export const sortByName = (key: TRadarKeys, asc: boolean) => (a: TRadar, b: TRadar): number => {
    if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        const valA = a[key] as number
        const valB = b[key] as number
        return (valA - valB) * (asc ? 1 : -1)
    } else {
        const valA = a[key] as string
        const valB = b[key] as string
        const nameA = valA.toUpperCase(); // ignore upper and lowercase
        const nameB = valB.toUpperCase(); // ignore upper and lowercase
        return (asc ? 1 : -1) * (nameA < nameB ? -1 : nameA > nameB? 1 : 0)
    }
}