import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const client = await db.connect();
            const result = await client.query(
                `SELECT p.*, u.username, u.profile_image_url 
                 FROM posts p 
                 JOIN users u ON p.user_id = u.id 
                 ORDER BY p.created_at DESC`
            );
            client.release();
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching posts:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
}