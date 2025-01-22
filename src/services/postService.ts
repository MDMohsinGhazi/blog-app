import { firestore } from '@/lib/firebase';
import { collection, addDoc, getDocs, doc, updateDoc, deleteDoc, getDoc, query, where } from 'firebase/firestore';

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

    // Fetch post by category
    async getPostByCategory(category: string) {
        try {
            const q = query(this.postsCollection, where('category', '==', category));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error(`No blog found with ${category} category.`);
            }

            const blogDoc = querySnapshot.docs;
            const blogData = blogDoc.map((doc) => ({ ...doc.data(), id: doc.id }));
            return blogData;
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw new Error('Failed to fetch posts');
        }
    }

    // Fetch post by id
    async getPostById(id: string) {
        try {
            const postDocRef = doc(this.postsCollection, id);
            const postDoc = await getDoc(postDocRef);

            if (!postDoc.exists()) {
                throw new Error('No post found.');
            }

            return postDoc.data();
        } catch (error) {
            console.error('Error fetching post:', error);
            throw new Error('Error fetching post');
        }
    }

    // Create a new post
    async createPost(body: {
        title: string;
        content: string;
        category: string;
        imageUrl: string;
        textContent: string;
        auther: string;
    }) {
        const { title, content, category, imageUrl, textContent, auther } = body;
        try {
            const docRef = await addDoc(this.postsCollection, {
                title,
                content,
                category,
                imageUrl,
                textContent,
                auther,
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
