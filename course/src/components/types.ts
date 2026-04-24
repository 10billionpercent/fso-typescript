interface CoursePart {
    partName: string;
    exerciseCount: number;
}

export interface ContentAndTotalProps {
    courseParts: CoursePart[];
}