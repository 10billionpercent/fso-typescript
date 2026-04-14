import isNotNumber from '../utils';

const calculateBmi = (height: number, weight: number) : string => {
    const heightInMetres = height /100;
    const bmi = weight / (heightInMetres ** 2);
    if (bmi < 18.5) {
        return "Underweight";
    }
    else if (bmi <= 24.9 && bmi >= 18.5) {
        return "Normal range";
    }
    else {
        return "Overweight";
    }
}

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

if (height === 0 || weight === 0) {
    console.log("please provide non zero values for height and weight");
    process.exit(1);
}

console.log(calculateBmi(height, weight));