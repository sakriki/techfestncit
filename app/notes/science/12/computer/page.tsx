"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const lessons: { title: string; pdf: string }[] = [
  {
    title: 'LAB WORKS - 12',
    pdf: '/notes/science/12/computer/labworks12.pdf',
  },
  {
    title: 'Functions, Recursion, Structures, Pointers, File Handling',
    pdf: '/notes/science/12/computer/FunctionPointerRecursionFilehandling.pdf',
  },
  {
    title: 'Database Management System',
    pdf: '/notes/science/12/computer/database12.pdf',
  },
];

export default function Computer12() {
  const router = useRouter();
  const handleDownload = (pdf: string) => {
    const link = document.createElement('a');
    link.href = pdf;
    link.download = pdf.split('/').pop() || 'lesson.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: '80vh' }}>
      <button
        onClick={() => router.back()}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: 'none',
          border: 'none',
          color: '#3ecbff',
          fontWeight: 600,
          fontSize: '1.1rem',
          cursor: 'pointer',
          marginBottom: '1.5rem',
        }}
      >
        <ArrowLeft size={22} /> Back
      </button>
      <h1 className="notes-title">Science 12 - Computer Notes</h1>
      <div style={{ margin: '2rem auto', maxWidth: 600, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {lessons.length === 0 ? (
            <span style={{ color: '#888', fontSize: '1.1rem' }}>
              Computer notes will be posted here soon!
            </span>
          ) : (
            lessons.map((lesson, idx) => (
              <button
                key={idx}
                onClick={() => handleDownload(lesson.pdf)}
                style={{
                  padding: '0.75rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: '1px solid #3ecbff',
                  background: '#181818',
                  color: '#3ecbff',
                  fontWeight: 500,
                  cursor: 'pointer',
                  width: '100%',
                  maxWidth: 400,
                  transition: 'all 0.2s',
                  fontSize: '1rem',
                }}
              >
                {lesson.title}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 