import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Species API!');
});

router.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

export { router as defaultRoutes };
