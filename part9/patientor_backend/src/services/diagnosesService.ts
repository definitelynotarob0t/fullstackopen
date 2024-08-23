import diagnosesData from '../data/diagnoses.json' 
import { Diagnosis } from '../types';


const diagnoses: Diagnosis[] = diagnosesData


const getDiagnoses = (): Diagnosis[] => {
    return diagnoses;
};

export default {
    getDiagnoses
};