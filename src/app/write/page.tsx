'use client';

import React, { useState } from 'react';
import { categories } from '@/constant';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const Editor = dynamic(() => import('../../components/editor/Editor'), { ssr: false });
const Select = dynamic(() => import('../../components/dropdown/Select'), { ssr: false });
const ImageUpload = dynamic(() => import('../../components/fileUpload/ImageUpload'), { ssr: false });

const Write = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [textContent, setTextContent] = useState<string>('');
    const [category, setCategory] = useState<SelectOption | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const publishHandle = async () => {
        try {
            const newPost = {
                title,
                category: category?.value,
                content,
                imageUrl: image,
                textContent,
                author: session?.user,
            };

            const result = await fetch('/api/blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newPost),
            });

            if (!result.ok) {
                const error = await result.json();
                throw new Error(error.message);
            }

            const data = await result.json();
            toast.success(`${data.title} posted successfully!`);
            router.push('/');
        } catch (error: any) {
            toast.error(error.message || 'Failed to post the blog.');
        }
    };

    const isPublishDisabled = !title || !category?.value || !content || !image;

    return (
        <div className="flex flex-col gap-6 pt-6 pb-0 px-8 shadow-md custom-min-height">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <div className="text-3xl text-primary font-bold">Start blogging</div>
                    <h1 className="text-secondary text-xl">Because Talking to Yourself Isn’t Enough</h1>
                </div>
                <button
                    className="bg-green-700 px-4 py-1 text-white font-semibold text-sm rounded-full hover:shadow-md disabled:opacity-50"
                    onClick={publishHandle}
                    disabled={isPublishDisabled}
                >
                    Publish
                </button>
            </div>
            <div className="flex gap-4 justify-between">
                <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex flex-col gap-1">
                        <label className="text-secondary font-semibold" htmlFor="title">
                            Title
                        </label>
                        <textarea
                            className="p-2 border border-gray-400 outline-none text-secondary rounded-md resize-none"
                            rows={2}
                            maxLength={100}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-secondary font-semibold" htmlFor="category">
                            Category
                        </label>
                        <Select options={categories} selectedOption={category} onChange={setCategory} />
                    </div>
                </div>
                <ImageUpload image={image} setImage={setImage} />
            </div>
            <div>
                <Editor value={content} onChange={setContent} textHandle={setTextContent} />
            </div>
        </div>
    );
};

export default Write;
