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

const getPatient = (id: string): Patient => {
    const patient = patients.find(p => p.id === id);
    if (!patient) {
        throw new Error(`patient with ${id} not found`);
    }
    return patient;
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient,
        entries: []
    };
    patients.push(newPatient);
    return newPatient;

};

export default {
    getNonSensitivePatients,
    getPatient,
    addPatient
};