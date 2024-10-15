'use client';

import React, { useState, useEffect, useRef } from 'react';

interface SelectProps {
    options: SelectOption[];
    selectedOption: SelectOption | null;
    onChange: (selectedOption: SelectOption) => void;
    placeholder?: string;
    isDisabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
    options,
    onChange,
    selectedOption,
    placeholder = 'Select...',
    isDisabled = false,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSelect = (option: SelectOption) => {
        onChange(option);
        setIsOpen(false);
    };

    const toggleDropdown = () => {
        if (!isDisabled) setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div ref={dropdownRef} className={`relative w-64 ${isDisabled ? 'cursor-not-allowed opacity-50 z-10' : ''}`}>
            <div
                className="border border-gray-300 bg-white p-2 rounded-md shadow-sm cursor-pointer hover:bg-gray-50 text-pretty placeholder:bg-gray-500"
                onClick={toggleDropdown}
            >
                {selectedOption ? selectedOption.label : placeholder}
            </div>
            {isOpen && !isDisabled && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
                    <div>
                        {options.length > 0 ? (
                            options.map((option) => (
                                <div
                                    key={option.value}
                                    className=" px-3 py-2 cursor-pointer hover:bg-gray-100"
                                    onClick={() => handleSelect(option)}
                                >
                                    {option.label}
                                </div>
                            ))
                        ) : (
                            <div className="p-2 text-sm text-gray-500">No options found</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Select;
