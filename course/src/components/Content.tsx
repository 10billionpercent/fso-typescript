import type { ContentAndTotalProps } from "./types";

const Content = ({ courseParts }: ContentAndTotalProps) => {
    return (
        <div id='content'>
            {courseParts.map(p => (
            <div key={p.name}>
                <h2> {p.name} </h2>
                <p> {p.exerciseCount} exercises </p>
            </div>
            ))}
        </div>
    )
}

export default Content;