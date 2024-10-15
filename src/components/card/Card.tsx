import React from 'react';

interface CardProps {
    title: string;
    content?: string;
    imageUrl?: string;
    textContent?: string;
}
const Card: React.FC<CardProps> = ({ title, imageUrl, textContent }) => {
    return (
        <div className="w-80 self-stretch p-4 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 ease-in-out">
            <img className="w-full h-40 object-cover rounded-t-lg" alt="Card Image" src={imageUrl} />
            <div className="pt-4 pb-2">
                <h2 className="text-md font-semibold line-clamp-1">{title}</h2>
                <p className="text-gray-600 line-clamp-3">{textContent}</p>
                <div className="flex justify-between items-center mt-4">
                    <button className="bg-primary hover:bg-primary/90 text-white px-4 py-1 rounded-full focus:outline-none">
                        Read more
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Card;
