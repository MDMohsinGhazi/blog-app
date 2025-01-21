'use client';

import { useState } from 'react';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import toast from 'react-hot-toast';

export const useEmail = () => {
    const [data, setData] = useState<EmailJSResponseStatus | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<unknown>(null);

    const sendEmail = async (templateParams: Record<string, unknown>) => {
        const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string;
        const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string;
        const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string;

        console.log({ serviceID, templateID, publicKey });

        setLoading(true);
        try {
            const res = await emailjs.send(serviceID, templateID, templateParams, {
                publicKey: publicKey,
                limitRate: {
                    throttle: 10000,
                },
            });

            if (res.status === 200) {
                toast.success('I received your message and will get back to you soon');
            }
            setData(res);
        } catch (error) {
            setError(error);
            toast.error('Failed to send your message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return { data, loading, error, sendEmail };
};
