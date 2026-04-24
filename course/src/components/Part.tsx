import type { CoursePart } from "./types";

interface PartProps {
    part: CoursePart;
}

const Part = ({ part }: PartProps) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `unhandled discriminated union member ${JSON.stringify(value)}`
        );
    }

    const renderExtra = () => {
        switch (part.kind) {
            case "basic":
                return <i>{part.description}</i>;
            case "group":
                return <p>{part.groupProjectCount} group projects </p>;
            case "background":
                return (
                <>
                    <i>{part.description}</i>
                    <p>{part.backgroundMaterial}</p>
                </>);
            case "special":
                return (
                <>
                    <i>{part.description}</i>
                    <p>required skills = {part.requirements.join(', ')}</p>
                </>);
            default:
                return assertNever(part);
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