'use client';

import { useState } from 'react';
import { useIsMobile } from '../../../../../hooks/use-mobile';
import { useRouter } from 'next/navigation';

export default function English12() {
  const [iframeError, setIframeError] = useState(false);
  const isMobile = useIsMobile();
  const router = useRouter();

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
        ← Back
      </button>
      <h1 className="notes-title">Class 12 English Notes & Exercises</h1>
      <div style={{ margin: '2rem auto', maxWidth: 1200, width: '100%', height: '80vh', borderRadius: '1rem', overflow: 'hidden', boxShadow: '0 4px 24px 0 rgba(62,203,255,0.15)' }}>
        {isMobile ? (
          <div style={{ padding: '2rem', color: '#ff607a', background: 'rgba(0,0,0,0.7)', borderRadius: '1rem' }}>
            <h2>Please view this page from a computer or laptop.</h2>
            <p>
              For mobile or tablet users, <br />
              <a href="https://www.dhamiprakash.com.np/search/label/Grade%2012" target="_blank" rel="noopener noreferrer" style={{ color: '#3ecbff', textDecoration: 'underline' }}>
                click here to open the notes in a new tab
              </a>
            </p>
          </div>
        ) : !iframeError ? (
          <iframe
            src="https://www.dhamiprakash.com.np/search/label/Grade%2012"
            title="Class 12 English Notes"
            width="100%"
            height="100%"
            style={{ border: 'none', minHeight: '80vh', width: '100%' }}
            allowFullScreen
            onError={() => setIframeError(true)}
          />
        ) : (
          <div style={{ padding: '2rem', color: '#ff607a', background: 'rgba(0,0,0,0.7)', borderRadius: '1rem' }}>
            <h2>Sorry, this content cannot be displayed here.</h2>
            <p>The source website does not allow embedding. <br />
            <a href="https://www.dhamiprakash.com.np/search/label/Grade%2012" target="_blank" rel="noopener noreferrer" style={{ color: '#3ecbff', textDecoration: 'underline' }}>
              Click here to open the notes in a new tab
            </a>
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 