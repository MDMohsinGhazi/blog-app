declare global {
    interface User {
        id: string;
        name: string;
        email: string;
    }

    interface Post {
        id: string;
        title: string;
        content: string;
        authorId: string;
        imageUrl?: string;
        textContent?: string;
    }
    interface SelectOption {
        label: string;
        value: string;
    }
}

export {};
