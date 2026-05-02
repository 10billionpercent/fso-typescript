import { Patient, Diagnosis, Entry, HealthCheckEntry } from "../types";

import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, orange, green, yellow } from '@mui/material/colors';

interface Props {
  patient : Patient,
  diagnoses : Diagnosis[]
}

const PatientDetails = ({ patient, diagnoses }: Props) => {
    const assertNever = (value: never): never => {
        throw new Error(
            `unhandled discriminated union member ${JSON.stringify(value)}`
        );
    };

    const entryTypeIcon = (entry: Entry) => {
        switch (entry.type) {
            case "HealthCheck":
                return <MonitorHeartIcon></MonitorHeartIcon>;
            case "OccupationalHealthcare":
                return <WorkIcon></WorkIcon>;
            case "Hospital":
                return <LocalHospitalIcon></LocalHospitalIcon>;
            default:
                return assertNever(entry);
            }
    };

    const healthCheckEntryColor = (entry: HealthCheckEntry) => {
        switch (entry.healthCheckRating) {
            case 0:
                return <FavoriteIcon sx={{ color: green[700] }}></FavoriteIcon>;
            case 1:
                return <FavoriteIcon sx={{ color: yellow[700] }}></FavoriteIcon>;
            case 2: 
                return <FavoriteIcon sx={{ color: orange[700] }}></FavoriteIcon>;
            case 3:
                return <FavoriteIcon sx={{ color: red[700] }}></FavoriteIcon>;
            default:
                return assertNever(entry.healthCheckRating);
        }
    };

    return (
        <Container disableGutters>
            <Typography variant="h2">
                {patient.name} &nbsp;
                {patient.gender === 'female' ? <FemaleIcon />
                : patient.gender === 'other' ? <TransgenderIcon />
                : <MaleIcon />}
            </Typography>
            <Typography variant="subtitle1">
                ssn = {patient.ssn}
            </Typography>
            <Typography variant="subtitle1">
                occupation = {patient.occupation}
            </Typography>
            <Typography variant="subtitle1">
                date of birth = {patient.dateOfBirth}
            </Typography>
            <Typography variant="h3">
                entries
            </Typography>
            {patient.entries.length !== 0 ? patient.entries.map(e => (
                <Container key={e.id} sx={{ pb: '1rem' }} disableGutters>
                    <Typography variant="subtitle1" 
                    sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {entryTypeIcon(e)} &nbsp;
                        {e.date} &nbsp;
                        {e.type === "HealthCheck" ? healthCheckEntryColor(e) : null}
                    </Typography>
                    <Typography variant="subtitle1">
                        {e.description}
                    </Typography>
                    {e.diagnosisCodes ? <List sx={{ listStyleType: 'disc', pl: 4 }}>
                        {e.diagnosisCodes.map(d => {
                            const diagnosis = diagnoses.find(di => di.code === d);
                            return (
                            <ListItem key={d} sx={{ display: 'list-item', p: 0 }}>
                               <ListItemText primary={d} 
                               secondary={diagnosis ? diagnosis.name : "unknown"}>
                               </ListItemText>
                            </ListItem>
                            );})}
                    </List> : null}
                    <Typography variant="subtitle1">
                        diagnosed by {e.specialist}
                    </Typography>
                </Container>
            )) 
            : <Typography variant="subtitle1"> no entries </Typography>}
        </Container>
    );
};

export default PatientDetails;