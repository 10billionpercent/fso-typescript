import { v7 as uuid } from 'uuid';
import type { NonSensitivePatient, NewPatient, Patient } from "../types.ts";
import patients from "../data/patients.ts";

const getNonSensitivePatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    };
    patients.push(newPatient);
    return newPatient;

};

export default {
    getNonSensitivePatients,
    addPatient
};