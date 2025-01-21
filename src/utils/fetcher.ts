import { toast } from 'react-hot-toast';

export const fetcher = async <T = any>(...args: Parameters<typeof fetch>): Promise<T> => {
    try {
        const response = await fetch(...args);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'An error occurred');
        }

        return response.json() as T;
    } catch (error) {
        toast.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        throw error;
    }
};
