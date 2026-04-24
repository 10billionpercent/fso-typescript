interface CoursePart {
    name: string;
    exerciseCount: number;
}

export interface ContentAndTotalProps {
    courseParts: CoursePart[];
}