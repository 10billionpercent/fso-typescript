import { Patient } from "../types";

import { Container, Typography } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';

interface Props {
  patient : Patient
}

const PatientDetails = ({ patient }: Props) => {
    return (
        <Container>
            <Typography variant="h2">
                {patient.name} 
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
        </Container>
    );
};

export default PatientDetails;