'use client';
import { useEffect, useRef } from 'react';
import Quill from 'quill';

interface QuillEditorProps {
    value: string;
}

const ContentDisplay: React.FC<QuillEditorProps> = ({ value }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const quill = new Quill(editorRef.current!, {
            theme: 'snow',
            modules: {
                toolbar: false,
            },
        });

        quill.root.innerHTML = value;

        return () => {
            quill.disable();
            quill.enable();
        };
    }, [value]);

    return <div ref={editorRef} style={{ border: '0px' }} className="h-full border-0 outline-none" />;
};

export default ContentDisplay;
