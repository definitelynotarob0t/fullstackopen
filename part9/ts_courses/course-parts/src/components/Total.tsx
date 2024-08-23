import { CoursePart } from "../types";


interface CourseParts {
    courseParts: CoursePart[];
  }

const Total = (props: CourseParts) => {
    const totalExercises = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

    return (
        <p>
         <i>
            <strong>Number of exercises: </strong>{totalExercises}
        </i>
      </p>
    )
}

export default Total