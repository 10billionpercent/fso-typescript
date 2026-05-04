import { useState, SyntheticEvent } from "react";
import { assertNever } from "../../utils";

import {
  TextField,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
} from "@mui/material";

import { EntryFormValues, HealthCheckRatings } from "../../types";
import type { HealthCheckRating, EntryType } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues) => void;
}

interface HealthCheckRatingOption {
  value: HealthCheckRating;
  label: string;
}

interface TypeOption {
  value: string;
  label: string;
}

const healthCheckRatingOptions: HealthCheckRatingOption[] = Object.values(
  HealthCheckRatings,
).map((v) => ({
  value: v,
  label: v.toString(),
}));

const typeOptions: TypeOption[] = [
  { value: "HealthCheck", label: "Health Check"},
  { value: "OccupationalHealthcare", label: "Occupational Healthcare"},
  { value: "Hospital", label: "Hospital"}
];

const AddEntryForm = ({ onCancel, onSubmit }: Props) => {
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

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    setType(event.target.value as EntryType);
  };

  const extraFields = (type: EntryType) => {
        switch (type) {
            case "HealthCheck":
                return (<>   
          <InputLabel sx={{ marginTop: 2 }}>Health Check Rating</InputLabel>
          <Select<number>
          label="Health Check Rating"
          fullWidth
          value={healthCheckRating}
          onChange={onHealthCheckRatingChange}
        >
          {healthCheckRatingOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select></>);
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
          label="Sick Leave Start Date"
          fullWidth
          value={sickLeaveStartDate}
          onChange={({ target }) => setSickLeaveStartDate(target.value)}
          sx={{ marginTop: 2 }}
        />
        <TextField
          label="Sick Leave End Date"
          fullWidth
          value={sickLeaveEndDate}
          onChange={({ target }) => setSickLeaveEndDate(target.value)}
          sx={{ marginTop: 2 }}
        />
      </>);
            case "Hospital":
                return (<>
      <TextField
          label="Discharge Date"
          fullWidth
          value={dischargeDate}
          onChange={({ target }) => setDischargeDate(target.value)}
          sx={{ marginTop: 2 }}
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

  const onHealthCheckRatingChange = (event: SelectChangeEvent<number>) => {
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
        <InputLabel sx={{ marginTop: 2 }}>Entry Type</InputLabel>
        <Select<string>
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
        </Select>
        <TextField
          label="Date"
          fullWidth
          value={date}
          onChange={({ target }) => setDate(target.value)}
          sx={{ marginTop: 2 }}
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
        <TextField
          label="Diagnosis codes (comma separated)"
          fullWidth
          value={diagnosisCodes}
          onChange={({ target }) => setDiagnosisCodes(target.value.split(","))}
          sx={{ marginTop: 2 }}
        />

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
