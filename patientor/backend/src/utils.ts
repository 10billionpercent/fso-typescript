import { Gender, type NewPatient } from './types.ts';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const isValidDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
    return (Object.values(Gender) as string[]).includes(gender);
};

const parseName = (name: unknown): string => {
    if (!isString(name)) {
        throw new Error('incorrect or missing name ' + name);
    }
    return name;
};

const parseDateOfBirth = (dob: unknown): string => {
    if (!isString(dob) || !isValidDate(dob)) {
        throw new Error('incorrect or missing date of birth ' + dob);
    }
    return dob;
};

const parseSsn = (ssn: unknown): string => {
    if (!isString(ssn)) {
        throw new Error('incorrect or missing ssn ' + ssn);
    }
    return ssn;
};

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('incorrect or missing gender ' + gender);
    }
    return gender;
};

const parseOccupation = (occupation: unknown): string => {
    if (!isString(occupation)) {
        throw new Error('incorrect or missing occupation ' + occupation);
    }
    return occupation;
};

const parseNewPatient = (data: unknown): NewPatient => {
    if (!data || typeof data !== 'object') {
        throw new Error('incorrect or missing data');
    }

    if ('name' in data && 'dateOfBirth' in data && 'ssn' in data && 'gender' in data && 'occupation' in data) {
        const newPatient: NewPatient = {
            name: parseName(data.name),
            dateOfBirth: parseDateOfBirth(data.dateOfBirth),
            ssn: parseSsn(data.ssn),
            gender: parseGender(data.gender),
            occupation: parseOccupation(data.occupation)
        };
        return newPatient;
    }
    throw new Error('incorrect data as some fields are missing');
};

export default parseNewPatient;