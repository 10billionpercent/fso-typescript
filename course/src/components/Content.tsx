import Part from "./Part";
import type { ContentAndTotalProps } from "./types";

const Content = ({ courseParts }: ContentAndTotalProps) => {
    return (
        <div id='content'>
            {courseParts.map(p => (
            <Part key={p.name} part={p} />
            ))}
        </div>
    );
}

export default Content;