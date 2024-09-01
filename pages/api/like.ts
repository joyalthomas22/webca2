import { db } from "@vercel/postgres";
import { log } from "console";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const client = await db.connect();

    try {
        switch (req.method) {
            case 'POST':
                await handleCreateLike(req, res, client);
                break;
            case 'GET':
                if (req.query.check) {
                    await handleCheckLike(req, res, client);
                } else if (req.query.count) {
                    await handleGetLikeCount(req, res, client);
                } else {
                    await handleGetLikes(req, res, client);
                }
                break;
            case 'DELETE':
                await handleDeleteLike(req, res, client);
                break;
            default:
                res.setHeader('Allow', ['POST', 'GET', 'DELETE']);
                res.status(405).json({ error: `Method ${req.method} not allowed` });
        }
    } catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        client.release();
    }
}

async function handleGetLikeCount(req: NextApiRequest, res: NextApiResponse, client: any) {
    const { postId } = req.query;

    if (!postId) {
        return res.status(400).json({ error: 'Post ID is required' });
    }

    try {
        const result = await client.query(
            'SELECT COUNT(*) FROM likes WHERE post_id = $1',
            [postId]
        );

        res.status(200).json({ count: result.rows[0].count });
    } catch (error) {
        console.error('Error fetching like count:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
async function handleCheckLike(req: NextApiRequest, res: NextApiResponse, client: any) {
    const { postId, loggedUserId } = req.query;

    if (!postId || !loggedUserId) {
        return res.status(400).json({ error: 'Post ID and User ID are required' });
    }

    try {
        const result = await client.query(
            'SELECT * FROM likes WHERE post_id = $1 AND user_id = $2',
            [postId, loggedUserId]
        );

        if (result.rowCount > 0) {
            res.status(200).json({ liked: true });
        } else {
            res.status(200).json({ liked: false });
        }
    } catch (error) {
        console.error('Error checking like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleCreateLike(req: NextApiRequest, res: NextApiResponse, client: any) {
    const { postId, loggedUserId } = req.body;

    if (!postId || !loggedUserId) {
        return res.status(400).json({ error: 'Post ID and User ID are required' });
    }

    try {
        await client.query(
            'INSERT INTO likes (post_id, user_id) VALUES ($1, $2)',
            [postId, loggedUserId]
        );

        const result = await client.query(
            'SELECT COUNT(*) FROM likes WHERE post_id = $1',
            [postId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleGetLikes(req: NextApiRequest, res: NextApiResponse, client: any) {
    try {
        const result = await client.query('SELECT * FROM likes');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error fetching likes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function handleDeleteLike(req: NextApiRequest, res: NextApiResponse, client: any) {
    const { postId, loggedUserId } = req.body;

    if (!postId || !loggedUserId) {
        return res.status(400).json({ error: 'Post ID and User ID are required' });
    }

    try {
        await client.query(
            'DELETE FROM likes WHERE post_id = $1 AND user_id = $2',
            [postId, loggedUserId]
        );

        const result = await client.query(
            'SELECT COUNT(*) FROM likes WHERE post_id = $1',
            [postId]
        );

        res.status(200).json({ count: result.rows[0].count });
    } catch (error) {
        console.error('Error deleting like:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
