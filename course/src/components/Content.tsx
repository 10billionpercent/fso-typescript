import type { ContentAndTotalProps } from "./types";

const Content = (props: ContentAndTotalProps) => {
    return (
        <div id='content'>
            {props.courseParts.map(p => (
            <div key={p.partName}>
                <h2> {p.partName} </h2>
                <p> {p.exerciseCount} exercises </p>
            </div>
            ))}
        </div>
    )
}

export default Content;