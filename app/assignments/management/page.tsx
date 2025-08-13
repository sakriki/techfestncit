"use client";
import Link from 'next/link';
import LineWavesParallax from '@/components/line-waves-parallax';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function ManagementAssignmentsStream() {
  const router = useRouter();
  return (
    <div style={{ position: 'relative', minHeight: '100vh', width: '100vw', overflow: 'hidden' }}>
      <LineWavesParallax />
      <div className="notes-choose-container" style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
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
        <h1 className="notes-title">Management Stream</h1>
        <div className="notes-card-row">
          <Link href="/assignments/management/11" className="notes-card-link">
            <div className="notes-card management">
              <span className="notes-card-title">Class 11</span>
              <span className="notes-card-desc">Assignments for Management Class 11</span>
            </div>
          </Link>
          <Link href="/assignments/management/12" className="notes-card-link">
            <div className="notes-card management">
              <span className="notes-card-title">Class 12</span>
              <span className="notes-card-desc">Assignments for Management Class 12</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
} 