import { Router } from 'express';
import dbPromise from './db.js';

const router = Router();

// default index route
router.get('/data', async (req, res) => {
  const { location, dataType } = req.query; // get params sent by axios
  const db = await dbPromise;
  let final_query;
  // set latitude range depending on location that user wants to view
  let min_lat;
  let max_lat;
  if (location === "Northern California") {
    min_lat = 38.55
    max_lat = 41.95
  } else if (location === "Central California") {
    min_lat = 35.54
    max_lat = 38.54
  } else {
    min_lat = 32.54
    max_lat = 35.53
  }
  const first_part = 'SELECT b_l.block_id, latitude, longitude'

  // define final_query based on what data user wants to examine
  if (dataType === "Financial Information" ) {
    final_query = `${first_part}, median_income, median_house_value FROM block_location b_l JOIN financial_info f_i 
    ON b_l.block_id = f_i.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (dataType === "Ocean Proximity" ) {
    final_query = `${first_part}, ocean_prox FROM block_location b_l JOIN ocean_proximity o 
    ON b_l.block_id = o.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (dataType === "House Size" ) {
    final_query = `${first_part}, total_rooms, total_bedrooms FROM block_location b_l JOIN house_size s 
    ON b_l.block_id = s.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (dataType === "Block Size" ) {
    final_query = `${first_part}, population, households FROM block_location b_l JOIN block_size s 
    ON b_l.block_id = s.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (dataType === "House Age" ) {
    final_query = `${first_part}, housing_median_age FROM block_location b_l JOIN house_age a
    ON b_l.block_id = a.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  }
  
  // perform query
  db.query(final_query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Error fetching data' });
    } else {
      res.json(results);
    }
  });
});
export default router;