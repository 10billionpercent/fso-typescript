import { useState, useEffect } from 'react'
import type { DiaryEntry } from './types'
import diaryService from './services/diaries'
import { Plane, Calendar, Sun, RectangleGoggles, SquarePen } from 'lucide-react'
import Notification from './components/Notification'
import './App.css'
import axios from 'axios'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

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
    try {
      const postedDiary = await diaryService.create(diaryToPost)
    setDiaries(diaries.concat(postedDiary))
    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
    setMessage('posted')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        const errors = error.response.data.error.map(e => e.message)
        const errorMessage = errors.join()
        setMessage(errorMessage)
        setIsError(true)
        setTimeout(() => {
          setMessage(null)
          setIsError(false)
        }, 5000)
      }

      else {
        console.log(error)
      }
    }
  }

  return (
    <div  id='main'>
      <h1 className='row'> <Plane size={40}/> Flight Diaries </h1>
      <h2> All Diaries </h2>
      {diaries.map(d => (
        <div key={d.id}>
          <h3 className='row'><Calendar /> {d.date}</h3>
          <p className='row'><Sun /><strong>Weather</strong> {d.weather}</p>
          <p className='row'><RectangleGoggles /> <strong>Visibility</strong> {d.visibility}</p>
          {d.comment ? <p className='row'> <SquarePen /> {d.comment}</p> : null}
        </div>
      ))}

      <form onSubmit={postDiary}>
      <h2> Add a New Diary </h2>
      <Notification message={message} isError={isError} />
        <label>
          Date &nbsp;
          <input
        type="date"
        id="date"
        name="flight-date"
        value={date}
        onChange={(e) => {setDate(e.target.value)}} />
        </label>
        <label>
          Weather &nbsp;
        <div className='radio-buttons'>
          {["sunny","rainy","cloudy","stormy","windy"].map(w => (
          <label key={w}>
          <input type="radio" id={w} name={w} value={w} checked={weather === w}
          onChange={() => setWeather(w)} />  
          {w}
          </label>
        ))}
        </div>
        </label>
        <label>
          Visibility &nbsp;
        <div className='radio-buttons'>
        {["great","good","ok","poor"].map(v => (
          <label key={v}>
          <input type="radio" id={v} name={v} value={v} checked={visibility === v}
          onChange={() => setVisibility(v)} />  
          {v}
          </label>
        ))}
        </div>
        </label>
        <label>
          Comment &nbsp;
          <input value={comment} 
        onChange={(e) => setComment(e.target.value)} />
        </label>
        <button type='submit'> Add </button>
      </form>

      <script></script>
    </div>
  )
}

export default App
