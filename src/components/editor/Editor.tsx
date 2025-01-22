'use client';
import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import './Editor.css';

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
    textHandle: (content: string) => void;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, textHandle }) => {
    const editorRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const quill = new Quill(editorRef.current!, {
            theme: 'snow',
            modules: {
                toolbar: [
                    [{ header: '1' }, { header: '2' }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['link', 'image', 'clean'],
                ],
            },
        });

        quill.root.innerHTML = value;

        quill.on('text-change', () => {
            const content = quill.root.innerHTML;
            const text = quill.root.innerText;
            onChange(content);
            textHandle(text);
        });

        return () => {
            quill.disable();
            quill.enable();
        };
    }, []);

    return (
        <div className="border rounded-md shadow-md h-full">
            <div style={{ border: '0px' }} ref={editorRef} />
        </div>
    );
};

export default QuillEditor;
