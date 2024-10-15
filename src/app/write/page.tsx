'use client';

import React, { useState } from 'react';
import { categories } from '@/constant';
import { toast } from 'react-hot-toast';
import dynamic from 'next/dynamic';
import { ImageUpload } from '@/components';
import { useRouter } from 'next/navigation';

const Editor = dynamic(() => import('../../components/editor/Editor'), { ssr: false });
const Select = dynamic(() => import('../../components/dropdown/Select'), { ssr: false });

const Write = () => {
    const router = useRouter();
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [textContent, setTextContent] = useState('');
    const [category, setCategory] = useState<SelectOption | null>(null);
    const [image, setImage] = useState<string | null>(null);

    const publishHandle = () => {
        const newPost = {
            title: title,
            category: category?.value,
            content: content,
            imageUrl: image,
            textContent: textContent,
        };

        const postData = async () => {
            const result = await fetch('/api/blog', {
                method: 'POST',
                body: JSON.stringify(newPost),
            });

            if (!result.ok) {
                const error = await result.json();
                throw new Error(error.message);
            }
            return await result.json();
        };

        const resopnse = new Promise((resolve, reject) => {
            postData()
                .then((data) => resolve(data))
                .then(() => router.push('/'))
                .catch((error) => reject(error));
        });

        toast.promise(resopnse, {
            loading: 'Posting blog...',
            success: (data: any) => `${data?.title} posted successfully!`,
            error: (error) => `${error}`,
        });
    };

    const isPublishDisable = !title.length || !category?.value || !content.length || !image;

    return (
        <div className="flex flex-col gap-6 pt-6 pb-0 px-8 shadow-md custom-min-hight">
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-2">
                    <div className="text-3xl text-primary font-bold">Start blogging</div>
                    <h1 className="text-secondary text-xl">Because Talking to Yourself Isn’t Enough</h1>
                </div>
                <button
                    className="bg-green-700 px-4 py-1 text-white font-semibold text-sm rounded-full hover:shadow-md disabled:opacity-50"
                    onClick={publishHandle}
                    disabled={isPublishDisable}
                >
                    Publish
                </button>
            </div>
            <div className="flex gap-4 justify-between ">
                <div className="flex flex-col gap-2 w-1/2">
                    <div className="flex flex-col gap-1">
                        <label className="text-secondary font-semibold" htmlFor="title">
                            Title
                        </label>
                        <textarea
                            className="p-2 border border-gray-400  outline-none text-secondary rounded-md resize-none"
                            rows={2}
                            maxLength={100}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-secondary font-semibold" htmlFor="">
                            Catagery
                        </label>
                        <Select options={categories} selectedOption={category} onChange={(e) => setCategory(e)} />
                    </div>
                </div>
                <ImageUpload image={image} setImage={setImage} />
            </div>
            <div>
                <Editor value={content} onChange={(e) => setContent(e)} textHandle={setTextContent} />
            </div>
        </div>
    );
};

export default Write;
