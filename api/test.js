const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,
  },
});

export default async function handler(req, res) {
  try {
    // A simple query to prove the database is talking to us
    const result = await pool.query("SELECT NOW() as current_time, 'Neon connected successfully!' as message");
    
    res.status(200).json({ success: true, data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
