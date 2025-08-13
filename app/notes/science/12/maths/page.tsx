"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function Maths12() {
  const router = useRouter();
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
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
      <h1>Science 12 - Maths</h1>
      <p style={{ marginTop: '2rem', fontSize: '1.2rem' }}>This feature is under development.</p>
    </div>
  );
} 