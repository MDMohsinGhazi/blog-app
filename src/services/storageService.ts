import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import { storage } from '@/lib/firebase';

class StorageService {
    private storageRef;

    constructor() {
        this.storageRef = storage;
    }

    async uploadImage(file: File): Promise<string> {
        try {
            const imageRef = ref(this.storageRef, `images/${file.name}_${Date.now()}`);
            const uploadTask = uploadBytesResumable(imageRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    'state_changed',
                    null,
                    (error) => {
                        console.error('Error uploading image:', error.message);
                        reject(new Error('Failed to upload image'));
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                        resolve(downloadURL);
                    }
                );
            });
        } catch (error) {
            console.error('Error uploading image:', (error as any).message);
            throw new Error('Error uploading image');
        }
    }

    async deleteImage(imageUrl: string): Promise<void> {
        try {
            const imagePath = imageUrl.split('?')[0].split('/o/')[1].split('?')[0];
            const imageRef = ref(this.storageRef, imagePath);

            await deleteObject(imageRef);
            console.log('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', (error as any).message);
            throw new Error('Error deleting image');
        }
    }
}

export default new StorageService();
