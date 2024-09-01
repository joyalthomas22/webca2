import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { loggedUserId } = req.query;

        if (!loggedUserId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        try {
            const client = await db.connect();

            // Fetch the list of followers with follower count
            const result = await client.query(
                `SELECT u.id, u.username, u.profile_image_url, 
                        (SELECT COUNT(*) FROM followers f WHERE f.following_id = u.id) AS follower_count 
                 FROM followers f 
                 JOIN users u ON f.follower_id = u.id 
                 WHERE f.following_id = $1`,
                [loggedUserId]
            );

            client.release();
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching followers list:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}