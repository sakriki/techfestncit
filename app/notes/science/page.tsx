"use client";
import Link from 'next/link';
import LineWavesParallax from '@/components/line-waves-parallax';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ScienceStream() {
  const router = useRouter();
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <LineWavesParallax />
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
          position: 'relative',
          zIndex: 2
        }}
      >
        <ArrowLeft size={22} /> Back
      </button>
      <div className="notes-choose-container" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1
      }}>
        <h1 className="notes-title">Science Stream</h1>
        <div className="notes-card-row" style={{ justifyContent: 'center' }}>
          <Link href="/notes/science/11" className="notes-card-link">
            <div className="notes-card science">
              <span className="notes-card-title">Class 11</span>
              <span className="notes-card-desc">Notes for Science Class 11</span>
            </div>
          </Link>
          <Link href="/notes/science/12" className="notes-card-link">
            <div className="notes-card science">
              <span className="notes-card-title">Class 12</span>
              <span className="notes-card-desc">Notes for Science Class 12</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 