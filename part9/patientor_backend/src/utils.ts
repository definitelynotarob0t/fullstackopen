import { NewPatient, Gender } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };


const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date of birth');
}
return date;
};

const parseSSN = (ssn: unknown): string => {
    const ssnRegEx = /^\d{6}-\d{3}[A-Z0-9]$/;

    if (!isString(ssn) || !ssnRegEx.test(ssn)) {
        throw new Error('Invalid or missing SSN');
    }

    return ssn;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(param);
  };

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender
}

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation
}

const toNewPatient = (object: unknown): NewPatient => {

    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
      }
    
    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const addPatient: NewPatient = {
            name: parseName(object.name), 
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSSN(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: []
        }
        return addPatient
    } 
    throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatient
