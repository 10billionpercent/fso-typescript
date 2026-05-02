import { Patient } from "../types";

import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
  patient : Patient
}

const PatientDetails = ({ patient }: Props) => {
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
                date of birth = {patient.ssn}
            </Typography>
            <Typography variant="h3">
                entries
            </Typography>
            {patient.entries.length !== 0 ? patient.entries.map(e => (
                <Container key={e.id} sx={{ p: 0 }} disableGutters>
                    <Typography variant="subtitle1">
                        {e.date}
                    </Typography>
                    <Typography variant="subtitle1">
                        {e.description}
                    </Typography>
                    <List sx={{ listStyleType: 'disc', pl: 4 }}>
                        {e.diagnosisCodes?.map(d => (                        
                        <ListItem key={d} sx={{ display: 'list-item', p: 0 }}>
                            <ListItemText primary={d}></ListItemText>
                        </ListItem>))}
                    </List>
                </Container>
            )) 
            : <Typography variant="subtitle1"> no entries </Typography>}
        </Container>
    );
};

export default PatientDetails;