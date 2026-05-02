import express, { type Request, type Response, type NextFunction } from 'express';
import patientService from '../services/patientService.ts';

import { NewPatientSchema, type NewPatient, type Patient,  NewEntrySchema, type NewEntry, type Entry } from '../types.ts';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
    const data = patientService.getNonSensitivePatients();
    res.send(data);
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const data = patientService.getPatient(id);
    res.send(data);
});

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewPatientSchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
    try {
        NewEntrySchema.parse(req.body);
        next();
    } catch (error: unknown) {
        next(error);
    }
};

const errorHandler = (error: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (error instanceof z.ZodError) {
        res.status(400).send({ error: error.issues });
    } else {
        next(error);
    }
};

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
        const addedPatient = patientService.addPatient(req.body);
        res.json(addedPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{ id: string }, unknown, NewEntry>, res: Response<Entry>) => {
        const id = req.params.id;
        const entry = req.body;
        const addedEntry = patientService.addEntry(entry, id);
        res.json(addedEntry);
});

router.use(errorHandler);

export default router;