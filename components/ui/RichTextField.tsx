import React, { useRef, useCallback } from 'react';

// SVG Icons for the toolbar
const BoldIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M4.25 5.5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm0 4a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Zm0 4a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5h-5.5Z" clipRule="evenodd" /></svg>
);
const ItalicIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path d="M7.75 5.5a.75.75 0 0 0 0 1.5h1.22l-2.43 6.5H5a.75.75 0 0 0 0 1.5h5.5a.75.75 0 0 0 0-1.5H9.28l2.43-6.5H13a.75.75 0 0 0 0-1.5H7.75Z" /></svg>
);
const ListIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 9.75A.75.75 0 0 1 2.75 9h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 9.75Zm0 5A.75.75 0 0 1 2.75 14h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 14.75Z" clipRule="evenodd" /></svg>
);

interface RichTextFieldProps {
  htmlContent: string;
  onHtmlChange: (html: string) => void;
}

const RichTextField: React.FC<RichTextFieldProps> = ({ htmlContent, onHtmlChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  // To prevent cursor jumping on every keystroke, we compare content
  const lastContent = useRef(htmlContent);

  const handleContentChange = useCallback(() => {
    if (editorRef.current) {
      const newHtml = editorRef.current.innerHTML;
      if (newHtml !== lastContent.current) {
        lastContent.current = newHtml;
        onHtmlChange(newHtml);
      }
    }
  }, [onHtmlChange]);

  const execCmd = (command: string) => {
    // Note: execCommand is deprecated but is the simplest way for this requirement.
    // For a production app, a library like Tiptap/Lexical would be better.
    document.execCommand(command, false, undefined);
    if (editorRef.current) {
        editorRef.current.focus();
        handleContentChange();
    }
  };

  // Sync external changes to the editor without losing cursor position
  if (editorRef.current && htmlContent !== editorRef.current.innerHTML) {
    editorRef.current.innerHTML = htmlContent;
  }

  return (
    <div className="border border-slate-300 rounded-md focus-within:ring-1 focus-within:ring-indigo-500 focus-within:border-indigo-500">
      <div className="toolbar flex items-center p-1 bg-slate-50 border-b border-slate-300 rounded-t-md">
        <button type="button" onClick={() => execCmd('bold')} className="p-1 rounded hover:bg-slate-200" aria-label="Bold"><BoldIcon /></button>
        <button type="button" onClick={() => execCmd('italic')} className="p-1 rounded hover:bg-slate-200" aria-label="Italic"><ItalicIcon /></button>
        <button type="button" onClick={() => execCmd('insertUnorderedList')} className="p-1 rounded hover:bg-slate-200" aria-label="Bulleted List"><ListIcon /></button>
      </div>
      <div
        ref={editorRef}
        contentEditable
        onInput={handleContentChange}
        dangerouslySetInnerHTML={{ __html: htmlContent }}
        className="prose prose-sm max-w-none p-2 min-h-[100px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextField;
