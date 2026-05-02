import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientDetails from "./components/PatientDetails";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#029ffa'
    }
  },
});

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | null>(null);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  const match = useMatch('/:id');

  useEffect(() => {
    const fetchPatient = async () => {
    if (match && match.params.id) {
    const fetchedPatient = await patientService.getPatient(match.params.id);
    setPatient(fetchedPatient);
    }
  };
  void fetchPatient();
  }, [match]);
  
  return (
    <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <div className="App" style={{ "paddingTop": "3rem"}}>
        <Container>
          <Typography variant="h3" sx={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
            <Route path="/:id" element={patient ? <PatientDetails patient={patient}/> : null}/>
          </Routes>
        </Container>
    </div>
    </ThemeProvider>
  );
};

export default App;
