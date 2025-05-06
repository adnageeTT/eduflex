import { Router } from 'express';
const router = Router();

import insertUser from '../config/oracle.js';

router.post('/register', async (req, res) => {
  const user = req.body;
  try {
    await insertUser(user);
    res.json({ status: 'success', message: 'User registered in Oracle database' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

export default router;
