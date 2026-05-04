import { useState } from "react";
import axios from 'axios';
import { Patient, Diagnosis, Entry, HealthCheckEntry, EntryFormValues } from "../types";
import { assertNever } from "../utils";

import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import MaleIcon from '@mui/icons-material/Male';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { red, orange, green, yellow } from '@mui/material/colors';

import AddEntryModal from "./AddEntryModal";

import patientService from "../services/patients";

interface Props {
  patient : Patient,
  diagnoses : Diagnosis[]
}

const PatientDetails = ({ patient, diagnoses }: Props) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    const [entries, setEntries] = useState<Entry[]>(patient.entries);

    const openModal = (): void => {
        setModalOpen(true);
        setError(undefined);
    };

    const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
    };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const entry = await patientService.createEntry(values, patient.id);
      setEntries(prev => prev.concat(entry));
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        const data = e.response?.data; 
        if (data && typeof data === "object" && "error" in data) {
            const messages = data.error.map((err: { message: string, path: string[] }) => `${err.path} - ${err.message}`).join("\n");
            setError(messages);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
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
            {entries.length !== 0 ? entries.map(e => (
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
                    {e.diagnosisCodes && e.diagnosisCodes.length > 0 ? <List sx={{ listStyleType: 'disc', pl: 4 }}>
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
                    {e.type === 'Hospital' ? 
                    <Typography variant="subtitle1">
                        discharged on {e.discharge.date} as {e.discharge.criteria}
                    </Typography> : null}
                </Container>
            )) 
            : <Typography variant="subtitle1"> no entries </Typography>}
                  <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        clearError={() => setError(undefined)}
        diagnoses={diagnoses}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
        </Container>
    );
};

export default PatientDetails;