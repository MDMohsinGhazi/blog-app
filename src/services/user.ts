import { getDocs, query, where, collection } from 'firebase/firestore';
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
    async register(email: string, password: string) {
        try {
            if (!email || !password) {
                return { message: 'Email and password are required' };
            }
            const user = { name: 'mohsin', password: 'kjhh', id: 'kijj' };

            return { message: 'User registered successfully', id: user.id };
        } catch (error) {
            console.error('Error signing up:', error);
            return { message: 'Error registering user', error: error };
        }
    }
}

export default new UserService();
