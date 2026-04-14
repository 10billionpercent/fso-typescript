import isNotNumber from '../utils.ts';
import calculateBmi from "./bmiCalculator.ts";

const height = Number(process.argv[2]);
const weight = Number(process.argv[3]);

if (process.argv.length < 4) {
    console.log("too few arguments");
    process.exit(1);
}

if (process.argv.length > 4) {
    console.log("too many arguments");
    process.exit(1);
}

if (isNotNumber(height) || isNotNumber(weight)) {
    console.log("please provide proper numbers");
    process.exit(1);
}

if (height <= 0 || weight <= 0) {
    console.log("height and weight must be positive");
    process.exit(1);
}

console.log(calculateBmi(height, weight));