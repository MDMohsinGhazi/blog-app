import { NextApiRequest, NextApiResponse } from 'next';
import PostService from '@/services/postService';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    if (req.method === 'PUT') {
        const { title, content } = req.body;
        const updatedPost = await PostService.updatePost(id as string, title, content);
        return res.status(200).json(updatedPost);
    } else if (req.method === 'DELETE') {
        const deletedPost = await PostService.deletePost(id as string);
        return res.status(200).json(deletedPost);
    } else {
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};

export default handler;
