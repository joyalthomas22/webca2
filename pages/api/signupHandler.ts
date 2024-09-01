import { db } from "@vercel/postgres";
import bcrypt from 'bcryptjs';
import { NextApiRequest, NextApiResponse } from "next";

// Define the handler function for the API route
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check if the request method is POST
  if (req.method === 'POST') {
    // Destructure the request body to get the user details
    const { username, password, firstName, lastName, profileImage } = req.body;

    // Check if the username already exists in the database
    const existingUser = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    if (existingUser.rows.length > 0) {
      // If the username exists, return a 400 status with an error message
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    const newUser = await db.query(
      'INSERT INTO users (username, password, first_name, last_name, profile_image_url) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [username, hashedPassword, firstName, lastName, profileImage]
    );

    // Return the newly created user with a 201 status
    return res.status(201).json(newUser.rows[0]);
  }

  // If the request method is not POST, return a 405 status with an error message
  return res.status(405).json({ message: 'Method Not Allowed' });
}