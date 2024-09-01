import { db } from "@vercel/postgres";
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  if (req.method === 'POST') {
    const { username, password } = req.body;

    try {
      const client = await db.connect();
      const query = 'SELECT * FROM users WHERE username = $1';
      const values = [username];

      const result = await client.query(query, values);
      client.release();

      if (result.rows.length > 0) {
        const user = result.rows[0];

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
          // Successful login
          res.status(200).json({ id: user.id, username, loggedIn: true, message: 'Login successful' });
          // Here, you could set up a session or JWT token for authentication
        } else {
          // Incorrect password
          res.status(401).json({ error: 'Invalid username or password' });
        }
      } else {
        // Username not found
        res.status(401).json({ error: 'Invalid username or password' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
