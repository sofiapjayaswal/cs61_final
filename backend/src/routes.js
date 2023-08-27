import { Router } from 'express';
import dbPromise from './db.js';

const router = Router();

// default index route
router.get('/data', async (req, res) => {
  const { location, dataType } = req.query; // get params sent by axios
  console.log(location, dataType)
  const db = await dbPromise;
  let final_query;
  // set latitude range depending on location that user wants to view
  let min_lat;
  let max_lat;
  if (location === "North") {
    min_lat = 38.55
    max_lat = 41.95
  } else if (location === "Central") {
    min_lat = 35.54
    max_lat = 38.54
  } else {
    min_lat = 32.54
    max_lat = 35.53
  }
  const first_part = 'SELECT b_l.block_id, latitude, longitude'
  const other_table = dataType // data type is the other table that we will join with block_location
  // define final_query based on what data user wants to examine
  if (other_table === "financial_info" ) {
    final_query = `${first_part}, median_income, median_house_value FROM block_location b_l JOIN ${other_table} f_i 
    ON b_l.block_id = f_i.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (other_table === "ocean_proximity" ) {
    final_query = `${first_part}, ocean_prox FROM block_location b_l JOIN ${other_table} o 
    ON b_l.block_id = o.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (other_table === "house_size" ) {
    final_query = `${first_part}, total_rooms, total_bedrooms FROM block_location b_l JOIN ${other_table} s 
    ON b_l.block_id = s.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (other_table === "block_size" ) {
    final_query = `${first_part}, population, households FROM block_location b_l JOIN ${other_table} s 
    ON b_l.block_id = s.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  } else if (other_table === "house_age" ) {
    final_query = `${first_part}, housing_median_age FROM block_location b_l JOIN ${other_table} a
    ON b_l.block_id = a.block_id WHERE latitude >= ${min_lat} AND latitude <= ${max_lat};`
  }

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