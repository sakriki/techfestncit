'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ScienceClass12() {
  const router = useRouter();
  
  return (
    <div>
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
          margin: '2rem 0 1.5rem 2rem',
        }}
      >
        <ArrowLeft size={22} /> Back
      </button>
      <div className="notes-choose-container">
        <h1 className="notes-title">Science - Class 12</h1>
        <div className="notes-card-row">
          {['english','nepali','maths','physics','chemistry','biology','computer'].map(subject => (
            <Link key={subject} href={`/notes/science/12/${subject}`} className="notes-card-link">
              <div className="notes-card subject">
                <span className="notes-card-title" style={{ textTransform: 'capitalize' }}>{subject}</span>
                <span className="notes-card-desc">Notes for {subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
} 