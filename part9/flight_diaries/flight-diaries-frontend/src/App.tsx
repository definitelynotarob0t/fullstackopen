import { useState, useEffect } from 'react'
import axios from 'axios'
import { apiBaseUrl } from './constants';
import diaryService from './services/diaries'
import { DiaryEntry } from './types';
import DiaryList from './components/DiaryList';
import { v1 as uuid } from 'uuid'

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
  const [dateOfFlight, setDateOfFlight] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)


  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/diaries`);

    const fetchDiaries = async () => {
      const diaries = await diaryService.getAll();
      setDiaries(diaries);
    };
      void fetchDiaries();
  }, []);

  const newDiaryEntry = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const diaryToAdd: DiaryEntry = {
      id: uuid(),
      date: dateOfFlight,
      weather,
      visibility,
      comment,
    }
    try {
      const savedDiary = await diaryService.create(diaryToAdd);
      setDiaries(diaries.concat(savedDiary));
      setDateOfFlight('')
      setWeather('')
      setVisibility('')
      setComment('')
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        setErrorMessage(error.response.data as string);
        console.log("Validation errors:", error.response.data); 
        } else {
          console.error("An unexpected error occurred:", error);
          setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };
  }

  return (
    <>
      <h1>Diary Entries</h1>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {/* < Notification errorMessage={errorMessage} setErrorMessage={setErrorMessage} /> */}
      <form onSubmit={newDiaryEntry}>
        <h2>Add new entry</h2>
        <div> Date: <input type="date" value={dateOfFlight} onChange={(event) => setDateOfFlight(event.target.value)}/></div>
        <div>
          Weather: 
          <input id="sunny" name="weather" type="radio" value={weather} onClick={() => setWeather("sunny")} />
          <label htmlFor="sunny">sunny</label>
          <input id="rainy" name="weather" type="radio" value={weather} onClick={() => setWeather("rainy")}/>
          <label htmlFor="rainy">rainy</label>
          <input id="cloudy" name="weather" type="radio" value={weather} onClick={() => setWeather("cloudy")}/>
          <label htmlFor="cloudy">cloudy</label>
          <input id="stormy" name="weather" type="radio" value={weather} onClick={() => setWeather("stormy")}/>
          <label htmlFor="stormy">stormy</label>
          <input id="windy" name="weather" type="radio" value={weather} onClick={() => setWeather("windy")}/>
          <label htmlFor="windy">windy</label>
        </div>
        <div>
          Visibility: 
          <input type="radio" id="great" name="visibility" value={visibility} onClick={() => setVisibility("great")}/>
          <label htmlFor="great">great</label>
          <input type="radio" id="good" name="visibility" value={visibility} onClick={() => setVisibility("good")}/>
          <label htmlFor="good">good</label>
          <input type="radio" id="ok" name="visibility" value={visibility} onClick={() => setVisibility("ok")}/>
          <label htmlFor="ok">ok</label>
          <input type="radio" id="poor" name="visibility" value={visibility} onClick={() => setVisibility("poor")}/>
          <label htmlFor="poor">poor</label>
         </div>
          <div>Comment: <input value={comment} onChange={(event) => setComment(event.target.value)}/></div>


        <button type='submit'>add</button>
      </form>
      <h2>Diary Entries</h2>
      <DiaryList diaries={diaries} />

    </>
  )
}

export default App

