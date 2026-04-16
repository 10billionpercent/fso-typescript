import isNotNumber from '../utils.ts';

interface Result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (target: number, exercises: number[]) : Result => {
    const average = exercises.reduce((acc, val) => acc + val, 0) / exercises.length;
    const success = average >= target;
    const percentage = average / target;
    let rating: number;
    let ratingDescription: string;

    if (percentage < 0.3) {
        rating = 1;
        ratingDescription = "try harder";
    } 
    else if (percentage <= 0.9) {
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
        success,
        rating,
        ratingDescription,
        target,
        average 
    };
};

const target = Number(process.argv[2]);
const exercises : number[] = [];

if (process.argv.length < 4) {
    console.log("too few arguments");
    process.exit(1);
}

if (isNotNumber(target)) {
    console.log("please enter only numbers");
    process.exit(1);
}

for (let i = 3; i < process.argv.length; i++) {
    const value = process.argv[i];
    if (isNotNumber(value)) {
        console.log("please enter only numbers");
        process.exit(1);
    }
    else {
        exercises.push(Number(value));
    }
}

console.log(calculateExercises(target, exercises));