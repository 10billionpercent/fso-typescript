import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';
import { red } from '@mui/material/colors';

import AddEntryForm from "./AddEntryForm";
import { EntryFormValues, Diagnosis } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: EntryFormValues) => void;
  error?: string;
  clearError: () => void;
  diagnoses: Diagnosis[]
}

const AddEntryModal = ({ modalOpen, onClose, onSubmit, error, clearError, diagnoses }: Props) => (
  <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}
    slotProps={{
      paper: {
        sx: { backgroundImage: 'none', border: '2px solid', borderColor: 'primary.main', borderRadius: '1rem' }
      }
    }}>
    <DialogTitle>Add a new entry</DialogTitle>
    <Divider sx={{ borderColor: 'primary.main' }}/>
    <DialogContent>
      {error && <Alert severity="error" variant="outlined"
      sx={{ backgroundColor: 'transparent', 
      color: red[400],
      borderColor: red[400],
      mb: '1rem',
      whiteSpace: 'pre-line' }}>{error}</Alert>}
      <AddEntryForm onSubmit={onSubmit} onCancel={onClose} clearError={clearError} diagnoses={diagnoses}/>
    </DialogContent>
  </Dialog>
);

export default AddEntryModal;
