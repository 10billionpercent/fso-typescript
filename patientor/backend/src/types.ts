import { z } from 'zod';

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

export enum Gender {
    Other = 'other',
    Female = 'female',
    Male = 'male'
}

export const NewPatientSchema = z.object({
    name: z.string(),
    dateOfBirth: z.iso.date(),
    ssn: z.string(),
    gender: z.enum(Gender),
    occupation: z.string()
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;