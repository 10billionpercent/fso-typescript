import { useState, SyntheticEvent } from "react";
import { assertNever } from "../../utils";

import {
  FormControl,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Grid,
  Button,
  SelectChangeEvent
} from "@mui/material";

import { EntryFormValues, HealthCheckRatings } from "../../types";
import type { HealthCheckRating, EntryType, Diagnosis } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
  clearError: () => void;
  diagnoses: Diagnosis[]
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

interface TypeOption {
  value: string;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = [
  { value: 0, label: 'Healthy'},
  { value: 1, label: 'Low Risk'},
  { value: 2, label: 'High Risk'},
  { value: 3, label: 'Critical Risk'}
];

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check"},
  { value: "OccupationalHealthcare", label: "Occupational Healthcare"},
  { value: "Hospital", label: "Hospital"}
];

const AddEntryForm = ({ onCancel, onSubmit, clearError, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(HealthCheckRatings.Healthy);
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  const onTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setType(event.target.value as EntryType);
    clearError();
  };

  const onDiagnosisCodesChange = (event: SelectChangeEvent<string[]>) => {
    const { target: { value }} = event;
    setDiagnosisCodes(typeof value === 'string' ? value.split(",") : value);
  };

  const extraFields = (type: EntryType) => {
        switch (type) {
            case "HealthCheck":
                return  <TextField
          select
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
          sx={{ marginTop: 2 }}>
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.value} - {option.label}
            </MenuItem>
          ))}
        </TextField>;
            case "OccupationalHealthcare":
                return (<>
        <TextField
          label="Employer Name"
          fullWidth
          value={employerName}
          onChange={({ target }) => setEmployerName(target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          type="date"
          label="Sick Leave Start Date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
          sx={{ marginTop: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          type="date"
          label="Sick Leave End Date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
          sx={{ marginTop: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      </>);
            case "Hospital":
                return (<>
      <TextField
          type="date"
          label="Discharge Date"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
          sx={{ marginTop: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
      <TextField
          label="Discharge Criteria"
          fullWidth
          value={dischargeCriteria}
          onChange={({ target }) => setDischargeCriteria(target.value)}
          sx={{ marginTop: 2 }}
        />
        </>);
            default:
                return assertNever(type);
            }
    };

  const onHealthCheckRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setHealthCheckRating(Number(event.target.value) as HealthCheckRating);
  };

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    switch (type) {
      case "HealthCheck":
          return onSubmit({
                    type,
                    date,
                    description,
                    specialist,
                    healthCheckRating,
                    diagnosisCodes,
          });
      case "OccupationalHealthcare":
          return onSubmit({
                    type,
                    date,
                    description,
                    specialist,
                    employerName,
                    sickLeave: {
                      startDate: sickLeaveStartDate,
                      endDate: sickLeaveEndDate
                    },
                    diagnosisCodes,
          });
      case "Hospital":
          return onSubmit({
                    type,
                    date,
                    description,
                    specialist,
                    discharge: {
                      date: dischargeDate,
                      criteria: dischargeCriteria
                    },
                    diagnosisCodes,
          });
      default:
        return assertNever(type);
    }
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          select
          label="Entry Type"
          fullWidth
          value={type}
          onChange={onTypeChange}
        >
          {typeOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Entry Date"
          type="date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ marginTop: 2 }}
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
          sx={{ marginTop: 2 }}
        />
        {extraFields(type)}
        <FormControl fullWidth sx={{ marginTop: 2 }}>
          <InputLabel id="diagnosis-codes"> Diagnosis Codes </InputLabel>
        <Select
          multiple
          label="Diagnosis codes"
          fullWidth
          value={diagnosisCodes}
          onChange={onDiagnosisCodesChange}
          renderValue={(selected) => selected.filter(Boolean).join(", ")}>
          {diagnoses.map(d => (
            <MenuItem key={d.code} value={d.code}>
              {`${d.code} - ${d.name}`}
            </MenuItem>
          ))}
          </Select>
          </FormControl>

        <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
          <Grid size="auto">
            <Button
              color="primary"
              variant="outlined"
              type="button"
              onClick={onCancel}
              sx={{ borderWidth: 3, "&:hover": { borderWidth: 3 } }}
            >
              Cancel
            </Button>
          </Grid>
          <Grid size="auto">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;
