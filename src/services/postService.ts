import { firestore } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';

class PostService {
    private postsCollection;

    constructor() {
        this.postsCollection = collection(firestore, 'posts');
    }

    // Fetch all posts
    async getPosts() {
        try {
            const snapshot = await getDocs(this.postsCollection);
            const posts = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            return posts;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Failed to fetch posts');
        }
    }

    // Create a new post
    async createPost(body: {
        title: string;
        content: string;
        category: string;
        imageUrl: string;
        textContent: string;
    }) {
        const { title, content, category, imageUrl, textContent } = body;
        try {
            const docRef = await addDoc(this.postsCollection, {
                title,
                content,
                category,
                imageUrl,
                textContent,
                createdAt: new Date(),
            });
            return { id: docRef.id, title: title };
        } catch (error) {
            console.error('Error creating post:', error);
            throw new Error('Failed to create post');
        }
    }

    // Update a post
    async updatePost(id: string, title: string, content: string) {
        const docRef = doc(firestore, 'posts', id);
        try {
            await updateDoc(docRef, {
                title,
                content,
                updatedAt: new Date(),
            });
            return { id };
        } catch (error) {
            console.error('Error updating post:', error);
            throw new Error('Failed to update post');
        }
    }

    // Delete a post
    async deletePost(id: string) {
        const docRef = doc(firestore, 'posts', id);
        try {
            await deleteDoc(docRef);
            return { id };
        } catch (error) {
            console.error('Error deleting post:', error);
            throw new Error('Failed to delete post');
        }
    }
}

export default new PostService();
