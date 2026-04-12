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

console.log(calculateBmi(180, 74));