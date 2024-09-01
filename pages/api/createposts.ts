import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const {userId, title, content, pictureUrl } = req.body;

        if (!title || !content || !pictureUrl) {
            return res.status(400).json({ error: 'Title, content, and picture URL are required' });
        }

        try {
            const client = await db.connect();
            const result = await client.query(
                'INSERT INTO posts (user_id, title, content, picture_url) VALUES ($1, $2, $3, $4) RETURNING *',
                [userId ,title, content, pictureUrl]
            );
            client.release();
            res.status(201).json(result.rows[0]);
            
        } catch (error) {
            console.error('Error creating post:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
}