'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const lessons = [
  {
    title: 'Project Work : Ek Chihan',
    pdf: '/notes/science/12/nepali/project1.pdf',
  },
  {
    title: 'Lesson - 1 : आमाको सपना कविता',
    pdf: '/notes/science/12/nepali/lesson1.pdf',
  },
  {
    title: 'Lesson - 2 : विरहिणी दमयन्ती',
    pdf: '/notes/science/12/nepali/lesson2.pdf',
  },
  {
    title: 'Lesson - 3 :  घनघस्याको उकालो काट्ता',
    pdf: '/notes/science/12/nepali/lesson3.pdf',
  },
 
  // Add more lessons here as needed
];

export default function Nepali12() {
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
      <h1 className="notes-title">Science 12 - Nepali Notes</h1>
      <div style={{ margin: '2rem auto', maxWidth: 600, width: '100%' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
          {lessons.map((lesson, idx) => (
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
          ))}
        </div>
      </div>
    </div>
  );
} 