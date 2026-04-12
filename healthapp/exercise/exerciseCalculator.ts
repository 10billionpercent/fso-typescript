interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (exercises: number[], target: number) : Result => {
    const average = exercises.reduce((acc, val) => acc + val, 0) / exercises.length;
    const success = average === target;
    const percentage = average / target;
    let rating: number;
    let ratingDescription: string;
    if (percentage < 0.3) {
        rating = 1;
        ratingDescription = "try harder";
    } 
    else if (percentage >= 0.3 && percentage <= 0.9) {
        rating = 2;
        ratingDescription = "not bad, could be better";
    }
    else {
        rating = 3;
        ratingDescription = "great job, keep it up";
    }

    return {
        periodLength: exercises.length,
        trainingDays: exercises.filter(d => d !== 0).length,
        success: success,
        rating: rating,
        ratingDescription: ratingDescription,
        target: target,
        average: average 
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));