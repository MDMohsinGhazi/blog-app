import React from 'react';

interface ButtonProps {
    label: string;
    onCkick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: React.FC<ButtonProps> = ({ label, onCkick }) => {
    return (
        <button className="flex bg-primary p-2 text-lightGray rounded-md justify-center" onClick={onCkick}>
            <div>{label}</div>
        </button>
    );
};

export default Button;
