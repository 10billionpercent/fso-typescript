import type { ContentAndTotalProps } from "./types";

const Total = (props: ContentAndTotalProps) => {
    const totalExercises = props.courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);
    return (
        <div id='total'>
            <h2> Total Exercises </h2>
            <p> {totalExercises} </p>
        </div>
    )
}

export default Total;