import { DiaryEntry } from '../types'


const Diary = (props: DiaryEntry) => {
    return (
        <div>
            <p><strong>{props.date}</strong></p>
            <p>Visibility: {props.visibility}</p>
            <p>Weather: {props.weather}</p>
        </div>
    )
}

export default Diary 


