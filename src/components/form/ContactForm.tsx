'use client';

import React, { useState } from 'react';
import { useEmail } from '@/hooks/index';

interface FormValues {
    name: string;
    email: string;
    message: string;
}

const initValue: FormValues = {
    name: '',
    email: '',
    message: '',
};

const ContactForm = () => {
    const [form, setForm] = useState(initValue);
    const { data, loading, sendEmail } = useEmail();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const templateParams = {
            from_name: form.name,
            from_email: form.email,
            message: form.message,
        };
        await sendEmail(templateParams);
        if (data?.status === 200) {
            setForm(initValue);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="name">Name</label>
                        <input
                            className="p-2 border border-gray-400 outline-none text-secondary rounded-md"
                            type="text"
                            placeholder="Name"
                            name="name"
                            required
                            autoComplete="name"
                            onChange={handleChange}
                            value={form.name}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="email">Email</label>
                        <input
                            className="p-2 border border-gray-400 outline-none text-secondary rounded-md"
                            type="email"
                            placeholder="Johndoe@email.com"
                            name="email"
                            required
                            autoComplete="email"
                            onChange={handleChange}
                            value={form.email}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message">Your message</label>
                        <textarea
                            className="p-2 border border-gray-400 outline-none text-secondary rounded-md resize-none"
                            rows={6}
                            placeholder="Leave a comment..."
                            name="message"
                            required
                            onChange={handleChange}
                            value={form.message}
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="flex bg-primary p-2 text-lightGray rounded-md justify-center disabled:opacity-40"
                >
                    {loading ? 'Sending...' : 'Send message'}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
