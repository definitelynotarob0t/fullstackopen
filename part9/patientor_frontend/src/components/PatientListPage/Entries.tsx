import {
    Entry,
    HospitalEntry,
    OccupationalEntry,
    Diagnosis,
    HealthCheckEntry,
  } from "../../types";
import { useEffect, useState } from "react";
import diagnosisService from '../../services/diagnoses'
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';

const HospitalEntryDetails = ({entry}: {entry: HospitalEntry}) => (
    <div key={entry.id}>
        <div>{entry.date}</div>
        <i> {entry.description}</i> 
        <div> <strong>Discharge:</strong> {entry.discharge.date} -  {entry.discharge.criteria} </div>
    </div>
)

const OccupationalEntryDetails = ({entry}: {entry: OccupationalEntry}) => (
    <div key={entry.id}>
        <div>{entry.date}</div>
        <i> {entry.description}</i> 
        <div> <WorkIcon /> {entry.employerName} </div>
    </div>
)

const HealthCheckEntryDetails = ({entry}: {entry: HealthCheckEntry}) => {
    const healthIcon = entry.healthCheckRating === 0 ? < FavoriteIcon color="success" /> :
    entry.healthCheckRating === 1 ? < FavoriteIcon sx={{ color: "yellow" }} /> :
    entry.healthCheckRating === 2 ? < FavoriteIcon sx={{ color: "orange" }} /> :
    < FavoriteIcon sx={{ color: "brown" }} /> 

    return (
      <div key={entry.id}>
        <div>{entry.date}</div>
        <i> {entry.description}</i> 
        <div> {healthIcon} </div>
      </div>
    )
}


const DiagnosesDetails = ({entry}: {entry: Entry}) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[] | null>(null)

    useEffect(() => {
        const fetchDiagnoses = async () => {
          try {
            const diagnosesData = await diagnosisService.getAllDiagnoses();
            setDiagnoses(diagnosesData);
          } catch (error) {
            console.error("Error fetching diagnoses:", error);
          }
        };
    
        fetchDiagnoses();
      }, []);
    

    const getDiagnosisName = (code: string) => {
        if (diagnoses) {
            const diagnosis = diagnoses.find(d => d.code === code);
            return diagnosis ? diagnosis.name : "Unknown diagnosis";
        }
      };

      if (!entry.diagnosisCodes) {
        return 
      }

      return (
        <><p><strong>Diagnosis codes:</strong></p><ul>
                    {entry.diagnosisCodes.map((code: string) => (
                        <li key={code}>
                            {code} - {getDiagnosisName(code)}
                        </li>
                    ))}
                </ul></> 
      )
}


const Entries = ({entries}: {entries: Entry[] }) => {

    const EntryDetails = ( {entry}: {entry: Entry} ) => {
        switch (entry.type) {
            case "Hospital":
                return <HospitalEntryDetails entry={entry} />
            case "OccupationalHealthcare":
                return <OccupationalEntryDetails entry={entry} />
            case "HealthCheck":
                return <HealthCheckEntryDetails entry={entry} />
            default:
                console.log('Entry type not found')
                return
        }
    }
    
    const outline = {
        borderColor: 'black',
        border: '1px solid',
        padding: 5,
        margin: 5,
        backgroundColor: "#E5E4E2",
        borderRadius: 5

    }
    
    return (
        <div>
        <h3>Entries:</h3>
            {entries && entries.length > 0 ? 
            (
                entries.map((entry: Entry) => (
                    <div key={entry.id} style={outline}>
                    <EntryDetails entry={entry} />
                    < DiagnosesDetails entry={entry} />
                    </div>
                ))
            ) : (
            <div>No entries yet</div>)}
         </div>
    )
}

export default Entries