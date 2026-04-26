import axios from "axios"
import type { DiaryEntry, NewDiaryEntry } from "../types"

const baseUrl = 'http://localhost:3000/api/diaries';

const getAll = async () => {
    const res = await axios.get<DiaryEntry[]>(baseUrl)
    return res.data
}

const create = async (newDiary: NewDiaryEntry) => {
    const res = await axios.post<DiaryEntry>(baseUrl, newDiary)
    return res.data
}
export default { getAll, create }