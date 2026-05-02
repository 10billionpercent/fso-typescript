import { v7 as uuid } from 'uuid';
import type { NonSensitivePatient, NewPatient, Patient, NewEntry, Entry } from "../types.ts";
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

const addEntry = (entry: NewEntry, id: string): Entry => {
    const patient = patients.find(p => p.id === id);

    if (!patient) {
        throw new Error("patient not found");
    }

    const newEntry: Entry = {
        id: uuid(),
        ...entry
    };

    patient.entries.push(newEntry);
    return newEntry;
};

export default {
    getNonSensitivePatients,
    getPatient,
    addPatient,
    addEntry
};