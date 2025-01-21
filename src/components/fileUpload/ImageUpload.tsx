'use client';

import Image from 'next/image';
import React, { useState, ChangeEvent } from 'react';
import { toast } from 'react-hot-toast';

interface PropsInterface {
    image: string | null;
    setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUploader: React.FC<PropsInterface> = ({ image, setImage }) => {
    const [isUploading, setIsUploading] = useState(false);

    const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file && file.size < 2 * 1024 * 1024) {
            try {
                setIsUploading(true);
                const formData = new FormData();
                formData.append('file', file);

                const response = await fetch('/api/storage', {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) {
                    throw new Error('Failed to upload image');
                }

                const data = await response.json();
                setImage(data.imageUrl);
                setIsUploading(false);
            } catch (error) {
                toast.error('Failed to upload image. Please try again.');
                console.error(error);
                setIsUploading(false);
            }
        } else {
            toast.error('File size must be less than 2MB');
        }
    };

    const deleteHandle = async () => {
        try {
            const response = await fetch(`/api/storage?imageURL=${image}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete image');
            }

            setImage(null);
            toast.success('Image deleted successfully');
        } catch (error) {
            console.error('Error deleting image:', error);
            toast.error('Failed to delete image');
        }
    };

    if (isUploading) {
        return (
            <div className="flex items-center justify-center w-96 border-2 border-dashed h-40 border-gray-300 rounded-md bg-gray-50">
                <div className="w-10 h-10 border-4 border-t-primary border-gray-300 rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="w-96 mx-auto">
            <>
                {!image ? (
                    <div className="p-6 border-2 border-dashed h-40 border-gray-300 rounded-md text-center bg-gray-50">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="upload-input"
                        />
                        <label htmlFor="upload-input" className="flex flex-col items-center">
                            <Image src={'/icons/Upload.svg'} width={36} height={36} alt="upload" />
                            <p className="text-m">
                                <strong>Upload picture</strong>
                                <br />
                                Choose a photo less than <strong>2MB</strong> in JPG or PNG format.
                            </p>
                        </label>
                    </div>
                ) : (
                    <div className="relative border-2 border-solid h-40 border-gray-300 rounded-md group ">
                        <img src={image} alt="Uploaded" className="w-full h-full object-cover rounded-sm peer" />
                        <div className="absolute flex justify-center items-center h-full w-full top-0  bg-black/10 rounded-md invisible group-hover:visible">
                            <Image
                                src={'/icons/Delete.svg'}
                                width={40}
                                height={40}
                                alt="upload"
                                className=""
                                onClick={deleteHandle}
                            />
                        </div>
                    </div>
                )}
            </>
        </div>
    );
};

export default ImageUploader;
