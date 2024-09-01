import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { postId } = req.query;
        const { postUser } = req.query;

        if (!postId || !postUser) {
            return res.status(400).json({ error: 'Post ID and Post User are required' });
        }

        try {
            const client = await db.connect();
            const result = await client.query(
                `SELECT p.id, p.user_id, p.title, p.content, p.picture_url, p.created_at,  u.username, u.profile_image_url 
                 FROM posts p 
                 JOIN users u ON p.user_id = u.id 
                 WHERE p.id = $1 AND u.id = $2`,
                [postId, postUser]
            );
            client.release();
            res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}