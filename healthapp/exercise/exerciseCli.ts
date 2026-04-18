import isNotNumber from '../utils.ts';
import calculateExercises from "./exerciseCalculator.ts";

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