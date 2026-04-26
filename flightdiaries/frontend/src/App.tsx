import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import diaryService from './services/diaries'
import { Plane, Calendar, Sun, RectangleGoggles, SquarePen } from 'lucide-react';
import './App.css'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')

  useEffect(() => {
    const getInitialData = async () => {
    const res = await diaryService.getAll()
    setDiaries(res)
    }
    getInitialData()
  }, [])

  const postDiary = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const diaryToPost = {
      date,
      weather,
      visibility,
      comment
    }
    const postedDiary = await diaryService.create(diaryToPost)
    setDiaries(diaries.concat(postedDiary))
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <div  id='main'>
      <h1 className='row'> <Plane size={40}/> Flight Diaries </h1>
      <h2> All Diaries </h2>
      {diaries.map(d => (
        <div>
          <h3 className='row'><Calendar /> {d.date}</h3>
          <p className='row'><Sun /><strong>Weather</strong> {d.weather}</p>
          <p className='row'><RectangleGoggles /> <strong>Visibility</strong> {d.visibility}</p>
          <p className='row'> <SquarePen /> {d.comment}</p>
        </div>
      ))}

      <form onSubmit={postDiary}>
      <h2> Add a New Diary </h2>
        <label>
          Date &nbsp;
        <input value={date} 
        onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Weather &nbsp;
          <input value={weather} 
        onChange={(e) => setWeather(e.target.value)} />
        </label>
        <label>
          Visibility &nbsp;
           <input value={visibility} 
        onChange={(e) => setVisibility(e.target.value)} />
        </label>
        <label>
          Comment &nbsp;
          <input value={comment} 
        onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type='submit'> Add </button>
      </form>
    </div>
  )
}

export default App
