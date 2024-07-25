import { Router } from 'express';
import { getSavedSpecies, getSpeciesData } from "../controllers/specieController";

const router = Router();

router.get('/', getSpeciesData);
router.get('/saved', getSavedSpecies);

export { router as specieRoutes };
