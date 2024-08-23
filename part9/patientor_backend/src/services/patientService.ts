import patientData from '../data/patients'
import { Patient, PatientCensored, NewPatient } from '../types'
import { v1 as uuid } from 'uuid'


const patients: Patient[] = patientData


const getPatientsSensitive = (): Patient[] => {
    return patients;
};

const getPatientsCensored = (): PatientCensored[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }));
  }



const addPatient = (entry: NewPatient): Patient => {

    const newPatient = {
        id: uuid(),
       ... entry
      }; 

    patients.push(newPatient) // newPatient will not persist
    return newPatient
}

export default {
    getPatientsSensitive,
    getPatientsCensored,
    addPatient
};