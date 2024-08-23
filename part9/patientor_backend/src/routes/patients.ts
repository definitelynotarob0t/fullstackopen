import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';
import { Patient } from '../types';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPatientsCensored());
});


router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient) 
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      res.status(400).send(errorMessage);
    }
  });


router.get('/:id', async (req, res) => {
  try {
    const currentPatients = await patientService.getPatientsSensitive()
    const selectedPatient: Patient | undefined = currentPatients.find((patient: Patient) => patient.id === req.params.id);    
    if (selectedPatient) {
      res.json(selectedPatient)
    } else {
      console.log('Patient not found')
      res.status(404).end()
      }
  } catch(error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
})
    


export default router;