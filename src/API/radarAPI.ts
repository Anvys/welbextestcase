import axios, { AxiosResponse } from 'axios'
import {axRes, TFilterData, TRadar, TRadarKeys, TRequestBody} from "../Utils/Types";

// const baseURL = process.env.NODE_ENV==='development'?`${process.env.BE_HOST_DEV}`:`${process.env.BE_HOST_PROD}`
const baseURL = 'http://62.84.122.87'
const port = 3000;
const instance = axios.create({
    baseURL: `${baseURL}:${port}/api`,
});


const uri='radar'
export const radarAPI = {
    create: (data: TRadar) => instance.post<axRes, AxiosResponse<axRes>, TRequestBody>(
        `${uri}`, {type: uri, data: data}).then(data => data.data),


    getOne: (id: string) => instance.get<axRes>(`${uri}/${id}`).then(data => data.data),
    getAll: (data:TFilterData) =>instance.get<axRes>(`${uri}`,{params:{...data}}).then(data => data.data),


    updateOne: (id: string, data: TRadar) => instance.put<axRes, AxiosResponse<axRes>, TRequestBody>(
        `${uri}/${id}`, {type: uri, data: data}).then(data => data.data),
    deleteOne: (id: string) => instance.delete<axRes, AxiosResponse<axRes>, TRequestBody>(
        `${uri}/${id}`).then(data => data.data),
}

