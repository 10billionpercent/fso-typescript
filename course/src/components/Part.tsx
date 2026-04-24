import type { CoursePart } from "./types";

interface PartProps {
    part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    const renderExtra = () => {
        switch (part.kind) {
            case "basic":
                return <p>{part.description}</p>;
            case "group":
                return <p>{part.groupProjectCount} group projects </p>;
            case "background":
                return (
                <>
                    <p>{part.description}</p>
                    <p>{part.backgroundMaterial}</p>
                </>);
            default:
                return null;
            }
    }

    return (
            <div>
                <h2> {part.name} </h2>
                <p> {part.exerciseCount} exercises </p>
                {renderExtra()}
            </div>
    )
}

export default Part;