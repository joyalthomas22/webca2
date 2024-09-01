import { db } from "@vercel/postgres";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await db.connect();

    try {
        switch (req.method) {
            case 'POST':
                await handleFollow(req, res, client);
                break;
            case 'DELETE':
                await handleUnfollow(req, res, client);
                break;
            case 'GET':
                if (req.query.check) {
                    await handleCheckFollow(req, res, client);
                } else {
                    res.setHeader('Allow', ['POST', 'DELETE']);
                    res.status(405).json({ error: `Method ${req.method} not allowed` });
                }
                break;
            default:
                res.setHeader('Allow', ['POST', 'DELETE']);
                res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

async function handleFollow(req: NextApiRequest, res: NextApiResponse, client: any) {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
        return res.status(400).json({ error: 'Follower ID and Following ID are required' });
    }

    try {
        await client.query(
            'INSERT INTO followers (follower_id, following_id) VALUES ($1, $2)',
            [followerId, followingId]
        );
        res.status(201).json({ message: 'Followed successfully' });
    } catch (error) {
        console.error('Error following user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleUnfollow(req: NextApiRequest, res: NextApiResponse, client: any) {
    const { followerId, followingId } = req.body;

    if (!followerId || !followingId) {
        return res.status(400).json({ error: 'Follower ID and Following ID are required' });
    }

    try {
        await client.query(
            'DELETE FROM followers WHERE follower_id = $1 AND following_id = $2',
            [followerId, followingId]
        );
        res.status(200).json({ message: 'Unfollowed successfully' });
    } catch (error) {
        console.error('Error unfollowing user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleCheckFollow(req: NextApiRequest, res: NextApiResponse, client: any) {
    const { followerId, followingId } = req.query;

    if (!followerId || !followingId) {
        return res.status(400).json({ error: 'Follower ID and Following ID are required' });
    }

    try {
        const result = await client.query(
            'SELECT * FROM followers WHERE follower_id = $1 AND following_id = $2',
            [followerId, followingId]
        );

        if (result.rowCount > 0) {
            res.status(200).json({ following: true });
        } else {
            res.status(200).json({ following: false });
        }
    } catch (error) {
        console.error('Error checking follow status:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

