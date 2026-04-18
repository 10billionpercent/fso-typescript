import type { NonSensitivePatient } from "../types.ts";
import patients from "../data/patients.ts";

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients
};