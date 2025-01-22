import React from 'react';
import Image from 'next/image';
import { Email } from '../assets';
import { ContactForm } from '@/components';

const ContactHome = () => {
    return (
        <div className="flex flex-col gap-10 pt-6 pb-0 px-8 shadow-md custom-min-hight">
            <h1 className="text-3xl text-primary font-bold">Have some questions?</h1>
            <div className="grid grid-cols-2 ">
                <div className="flex flex-col  items-center mt-5">
                    <Image src={Email} width={240} height={240} alt="message" />
                </div>
                <ContactForm />
            </div>
        </div>
    );
};

export default ContactHome;
