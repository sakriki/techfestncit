'use client';

import { LessonAssignmentViewer } from '@/components/lesson-assignment-viewer';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function AssignmentsScience12Nepali() {
  const router = useRouter();
  
  // Lesson-based assignments with multiple images per lesson
  const lessons = [
    {
      id: 'Lesson-1: आमाको सपना कविता',
      title: 'Lesson-1: आमाको सपना कविता',
      description: 'Complete lesson materials and assignments for Nepali Lesson 1. Includes grammar exercises, reading comprehension, and writing practice.',
      images: [
        {
          id: 'lesson1-page1',
          src: '/assignments/science/12/nepali/lesson1/1.jpg',
          alt: 'Nepali Lesson 1 - Page 1',
          pageNumber: 1
        },
        {
          id: 'lesson1-page2',
          src: '/assignments/science/12/nepali/lesson1/2.jpg',
          alt: 'Nepali Lesson 1 - Page 2',
          pageNumber: 2
        },
        {
          id: 'lesson1-page3',
          src: '/assignments/science/12/nepali/lesson1/3.jpg',
          alt: 'Nepali Lesson 1 - Page 3',
          pageNumber: 3
        },
        {
          id: 'lesson1-page4',
          src: '/assignments/science/12/nepali/lesson1/4.jpg',
          alt: 'Nepali Lesson 1 - Page 4',
          pageNumber: 4
        },
        {
          id: 'lesson1-page5',
          src: '/assignments/science/12/nepali/lesson1/5.jpg',
          alt: 'Nepali Lesson 1 - Page 5',
          pageNumber: 5
        },
        {
          id: 'lesson1-page6',
          src: '/assignments/science/12/nepali/lesson1/6.jpg',
          alt: 'Nepali Lesson 1 - Page 6',
          pageNumber: 6
        },
        {
          id: 'lesson1-page7',
          src: '/assignments/science/12/nepali/lesson1/7.jpg',
          alt: 'Nepali Lesson 1 - Page 7',
          pageNumber: 7
        }
      ]
    },
    {
      id: 'Lesson-2: विरहिणी दमयन्ती',
      title: 'Lesson-2: विरहिणी दमयन्ती',
      description: 'Complete lesson materials and assignments for Nepali Lesson 2. Includes advanced grammar concepts, vocabulary building, and comprehensive writing exercises.',
      images: [
        {
          id: 'lesson2-page1',
          src: '/assignments/science/12/nepali/lesson2/1.jpg',
          alt: 'Nepali Lesson 2 - Page 1',
          pageNumber: 1
        },
        {
          id: 'lesson2-page2',
          src: '/assignments/science/12/nepali/lesson2/2.jpg',
          alt: 'Nepali Lesson 2 - Page 2',
          pageNumber: 2
        },
        {
          id: 'lesson2-page3',
          src: '/assignments/science/12/nepali/lesson2/3.jpg',
          alt: 'Nepali Lesson 2 - Page 3',
          pageNumber: 3
        },
        {
          id: 'lesson2-page4',
          src: '/assignments/science/12/nepali/lesson2/4.jpg',
          alt: 'Nepali Lesson 2 - Page 4',
          pageNumber: 4
        },
        {
          id: 'lesson2-page5',
          src: '/assignments/science/12/nepali/lesson2/5.jpg',
          alt: 'Nepali Lesson 2 - Page 5',
          pageNumber: 5
        },
        {
          id: 'lesson2-page6',
          src: '/assignments/science/12/nepali/lesson2/6.jpg',
          alt: 'Nepali Lesson 2 - Page 6',
          pageNumber: 6
        },
        {
          id: 'lesson2-page7',
          src: '/assignments/science/12/nepali/lesson2/7.jpg',
          alt: 'Nepali Lesson 2 - Page 7',
          pageNumber: 7
        },


      ]
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
      <h1 className="notes-title text-center mb-6">Science 12 - Nepali Assignments</h1>
      
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <div className="mb-6 text-center">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              📚 Nepali Language Lessons
            </h2>
            <p className="text-gray-300 text-sm">
              Access your Nepali lesson materials here. Click on any lesson to view all pages. 
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