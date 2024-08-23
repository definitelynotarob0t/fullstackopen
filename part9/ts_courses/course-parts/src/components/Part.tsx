import { CoursePart } from "../types";


const Part = (props: {courseParts: CoursePart[]}) => {
    return (
        <div>
            {props.courseParts.map((part, index) => {
                switch (part.kind) {
                    case "basic":
                        return(
                            <div key={index}>
                            <strong>{part.name} {part.exerciseCount}</strong>
                            <p><i>{part.description}</i></p>
                        </div> 
                        )
                    case "group": 
                        return (
                            <div key={index}>
                                <strong>{part.name} {part.exerciseCount}</strong>
                                <p>Project exercises: {part.groupProjectCount}</p>
                            </div>
                        )
                    case "background":
                        return (
                            <div key = {index}>
                                <strong>{part.name} {part.exerciseCount}</strong>
                                <p>{part.description}</p>
                                <p>Background material: {part.backgroundMaterial}</p>
                            </div>
                        )
                    default:
                        return null;
                }
            })}
        </div>
    )
}

export default Part