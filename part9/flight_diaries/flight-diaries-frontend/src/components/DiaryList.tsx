import Diary from "./Diary";
import { DiaryEntry } from "../types";


const DiaryList = (props: {diaries: DiaryEntry[]}) => {

    return (
        <div>
            {props.diaries.map((diary => (
                    <div key={diary.id}>
                        <Diary {...diary} />
                    </div>
            )))}
        </div>
    )
}

export default DiaryList 