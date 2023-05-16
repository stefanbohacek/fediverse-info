import express from 'express';
import rejectRequest from '../modules/rejectRequest.js';
// import { dirname } from 'path';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

const router = express.Router();

router.get('/', async (req, res) => {
  rejectRequest(req, res, 422);
});

export default router;