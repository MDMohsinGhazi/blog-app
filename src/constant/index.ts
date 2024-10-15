import { Google, Github, Home, Catagery, Message } from '@/app/assets';

export const navItem = [
    { title: 'Home', path: '/', img: Home },
    { title: 'Blog', path: '/blog', img: Catagery },
    { title: 'Contact us', path: '/contact', img: Message },
];

export const loginWith = [
    { entity: 'google', src: Google },
    { entity: 'github', src: Github },
];

export const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'health', label: 'Health' },
    { value: 'travel', label: 'Travel' },
    { value: 'food', label: 'Food' },
    { value: 'lifestyle', label: 'Lifestyle' },
];
