import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { loggedUserId } = req.query;

        if (!loggedUserId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        try {
            const client = await db.connect();

            // Fetch the list of followed user IDs
            const followedUsersResult = await client.query(
                'SELECT following_id FROM followers WHERE follower_id = $1',
                [loggedUserId]
            );

            const followedUserIds = followedUsersResult.rows.map(row => row.following_id);

            if (followedUserIds.length === 0) {
                client.release();
                return res.status(200).json([]);
            }

            // Fetch posts from followed users along with user details
            const result = await client.query(
                `SELECT p.*, u.username, u.profile_image_url 
                 FROM posts p 
                 JOIN users u ON p.user_id = u.id 
                 WHERE p.user_id = ANY($1::int[]) 
                 ORDER BY p.created_at DESC`,
                [followedUserIds]
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