import { getDocs, query, where, collection, addDoc } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';

class UserService {
    // Method to fetch user by email
    private usersCollection;

    constructor() {
        this.usersCollection = collection(firestore, 'users');
    }
    async getUser(email: string, password: string) {
        try {
            const q = query(this.usersCollection, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                throw new Error('No user found with that email.');
            }

            if (querySnapshot.docs[0].data().password !== password) {
                throw new Error('Incorret password.');
            }
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            return userData;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw new Error('Error fetching user');
        }
    }

    // Method to register a new user
    async register(name: string, email: string, password: string) {
        try {
            const q = query(this.usersCollection, where('email', '==', email));
            const querySnapshot = await getDocs(q);

            if (!querySnapshot.empty) {
                throw new Error('user already exist.');
            }

            const docRef = await addDoc(this.usersCollection, {
                name,
                email,
                password,
                createdAt: new Date(),
            });
            return { id: docRef.id };
        } catch (error) {
            console.error('Error registring user:', error);
            throw new Error('Failed to create user');
        }
    }
}

export default new UserService();
