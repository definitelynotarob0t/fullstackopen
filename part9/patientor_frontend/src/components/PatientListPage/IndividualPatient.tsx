import { useEffect, useState } from "react";
import { Patient } from "../../types";
import patientService from "../../services/patients";
import { useParams } from "react-router-dom";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import Entries from "./Entries";



const IndividualPatient = () => {
    const idObject = useParams<{ id: string }>();
    const id = idObject.id
    const [patient, setFoundPatient] = useState<Patient | null>(null);

    useEffect(() => {
        const fetchPatient = async () => {
          if (typeof id === "string") {
            try {
              const patientData = await patientService.findPatient(id);
              setFoundPatient(patientData);
            } catch (error) {
              console.error("Error fetching patient data:", error);
            }
          }
        };
    
        fetchPatient();
      }, [idObject]);


  console.log('patient:', patient)

  if (!patient) {
    return <div>Loading...</div>;
  }

  const genderIcon = patient.gender === 'female' ? <FemaleIcon /> :
    patient.gender === 'male' ? <MaleIcon /> : <TransgenderIcon />;

  return (
    <div>
      <h2>{patient.name} {genderIcon} </h2> 
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <Entries entries={patient.entries}/>
    </div>
  );
};

export default IndividualPatient;
