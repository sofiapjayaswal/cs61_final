import { Router } from 'express';
import dbPromise from './db.js';

const router = Router();

// default index route
router.get('/data', async (req, res) => {
  const db = await dbPromise;
  const query = 'SELECT * FROM block_location'; // Adjust the query according to your database schema
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results);
    }
  });
});

export default router;