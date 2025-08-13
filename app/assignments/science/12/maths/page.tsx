'use client';

import { LessonAssignmentViewer } from '@/components/lesson-assignment-viewer';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function MathsAssignmentsScience12() {
  const router = useRouter();
  
  // Lesson-based assignments with multiple images per lesson
  const lessons = [
    {
      id: 'Coming-Soon-Lesson-1',
      title: 'Coming Soon - Lesson 1',
      description: 'Mathematics Lesson 1 materials will be available soon. This will include calculus, algebra, and mathematical analysis.',
      isComingSoon: true,
      previewText: 'Lesson 1',
      images: []
    },
    {
      id: 'Coming-Soon-Lesson-2',
      title: 'Coming Soon - Lesson 2',
      description: 'Mathematics Lesson 2 materials will be available soon. This will include statistics, probability, and advanced mathematical concepts.',
      isComingSoon: true,
      previewText: 'Lesson 2',
      images: []
    }
  ];

  return (
    <div style={{ padding: '1rem', minHeight: '80vh' }}>
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
      <h1 className="notes-title text-center mb-6">Science 12 - Mathematics Assignments</h1>
      
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <div className="mb-6 text-center">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              🧮 Mathematics Lessons
            </h2>
            <p className="text-gray-300 text-sm">
              Access your Mathematics lesson materials here. Click on any lesson to view all pages. 
              Use the navigation arrows or keyboard arrows to browse through multiple pages.
            </p>
          </div>
        </div>

        {/* Lesson Viewer */}
        <LessonAssignmentViewer lessons={lessons} />
        
        {/* Additional Information */}
        <div className="mt-8 bg-gray-800 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-100 mb-3">📋 Lesson Guidelines</h3>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div>
              <h4 className="font-medium text-gray-200 mb-2">Navigation Tips:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Click on any lesson to open the viewer</li>
                <li>Use arrow buttons or keyboard arrows to navigate</li>
                <li>Click thumbnails to jump to specific pages</li>
                <li>Use fullscreen mode for better reading</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-200 mb-2">Study Tips:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Read through all pages of each lesson</li>
                <li>Take notes while studying the materials</li>
                <li>Complete all exercises and assignments</li>
                <li>Review lessons regularly for better retention</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      {/* Copyright Footer */}
      <footer className="mt-12 py-6 bg-gray-900 border-t border-gray-700">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2025 GAFADI CHAT - Saksham Jaiswal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 