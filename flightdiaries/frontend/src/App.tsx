import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import diaryService from './services/diaries'
import { Plane, Calendar, Sun, RectangleGoggles, SquarePen } from 'lucide-react';
import './App.css'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])

  useEffect(() => {
    const getInitialData = async () => {
    const res = await diaryService.getAll()
    setDiaries(res)
    }
    getInitialData()
  }, [])

  return (
    <div  id='main'>
      <h1 className='row'> <Plane size={40}/> Flight Diaries </h1>
      {diaries.map(d => (
        <div>
          <h3 className='row'><Calendar /> {d.date}</h3>
          <p className='row'><Sun /><strong>Weather</strong> {d.weather}</p>
          <p className='row'><RectangleGoggles /> <strong>Visibility</strong> {d.visibility}</p>
          <p className='row'> <SquarePen /> {d.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default App
