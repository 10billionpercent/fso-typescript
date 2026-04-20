export interface Diagnosis {
    code: string;
    name: string;
    latin?: string
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export type NonSensitivePatient = Omit<Patient, 'ssn'>;
export type NewPatient = Omit<Patient, 'id'>;

export const Gender = {
    Other: 'other',
    Female: 'female',
    Male: 'male'
} as const;
export type Gender = typeof Gender[keyof typeof Gender];