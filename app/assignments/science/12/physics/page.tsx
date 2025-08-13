'use client';

import { LessonAssignmentViewer } from '@/components/lesson-assignment-viewer';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function PhysicsAssignmentsScience12() {
  const router = useRouter();
  
  // Lesson-based assignments with multiple images per lesson
  const lessons = [
    {
      id: 'Electrical-Circuit',
      title: 'Electrical Circuit',
      description: 'Complete lesson materials and assignments for Electrical Circuit Lesson 1. Includes circuit analysis, Ohm\'s law applications, and practical exercises.',
      images: [
        {
          id: 'electrical-circuit-lesson1-page1',
          src: '/assignments/science/12/physics/electrical_circuit/1.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 1',
          pageNumber: 1
        },
        {
          id: 'electrical-circuit-lesson1-page2',
          src: '/assignments/science/12/physics/electrical_circuit/2.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 2',
          pageNumber: 2
        },
        {
          id: 'electrical-circuit-lesson1-page3',
          src: '/assignments/science/12/physics/electrical_circuit/3.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 3',
          pageNumber: 3
        },
        {
          id: 'electrical-circuit-lesson1-page4',
          src: '/assignments/science/12/physics/electrical_circuit/4.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 4',
          pageNumber: 4
        },
        {
          id: 'electrical-circuit-lesson1-page5',
          src: '/assignments/science/12/physics/electrical_circuit/5.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 5',
          pageNumber: 5
        },
        {
          id: 'electrical-circuit-lesson1-page6',
          src: '/assignments/science/12/physics/electrical_circuit/6.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 6',
          pageNumber: 6
        },
        {
          id: 'electrical-circuit-lesson1-page7',
          src: '/assignments/science/12/physics/electrical_circuit/7.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 7',
          pageNumber: 7
        },
        {
          id: 'electrical-circuit-lesson1-page8',
          src: '/assignments/science/12/physics/electrical_circuit/8.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 8',
          pageNumber: 8
        },
        {
          id: 'electrical-circuit-lesson1-page9',
          src: '/assignments/science/12/physics/electrical_circuit/9.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 9',
          pageNumber: 9
        },
        {
          id: 'electrical-circuit-lesson1-page10',
          src: '/assignments/science/12/physics/electrical_circuit/10.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 10',
          pageNumber: 10
        },
        {
          id: 'electrical-circuit-lesson1-page11',
          src: '/assignments/science/12/physics/electrical_circuit/11.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 11',
          pageNumber: 11
        },
        {
          id: 'electrical-circuit-lesson1-page12',
          src: '/assignments/science/12/physics/electrical_circuit/12.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 12',
          pageNumber: 12
        },
        {
          id: 'electrical-circuit-lesson1-page13',
          src: '/assignments/science/12/physics/electrical_circuit/13.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 13',
          pageNumber: 13
        },
        {
          id: 'electrical-circuit-lesson1-page14',
          src: '/assignments/science/12/physics/electrical_circuit/14.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 14',
          pageNumber: 14
        },
        {
          id: 'electrical-circuit-lesson1-page15',
          src: '/assignments/science/12/physics/electrical_circuit/15.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 15',
          pageNumber: 15
        },
        {
          id: 'electrical-circuit-lesson1-page16',
          src: '/assignments/science/12/physics/electrical_circuit/16.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 16',
          pageNumber: 16
        },
        {
          id: 'electrical-circuit-lesson1-page17',
          src: '/assignments/science/12/physics/electrical_circuit/17.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 17',
          pageNumber: 17
        },
        {
          id: 'electrical-circuit-lesson1-page18',
          src: '/assignments/science/12/physics/electrical_circuit/18.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 18',
          pageNumber: 18
        },
        {
          id: 'electrical-circuit-lesson1-page19',
          src: '/assignments/science/12/physics/electrical_circuit/19.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 19',
          pageNumber: 19
        },
        {
          id: 'electrical-circuit-lesson1-page20',
          src: '/assignments/science/12/physics/electrical_circuit/20.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 20',
          pageNumber: 20
        },
        {
          id: 'electrical-circuit-lesson1-page21',
          src: '/assignments/science/12/physics/electrical_circuit/21.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 21',
          pageNumber: 21
        },
        {
          id: 'electrical-circuit-lesson1-page22',
          src: '/assignments/science/12/physics/electrical_circuit/22.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 22',
          pageNumber: 22
        },
        {
          id: 'electrical-circuit-lesson1-page23',
          src: '/assignments/science/12/physics/electrical_circuit/23.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 23',
          pageNumber: 23
        },
        {
          id: 'electrical-circuit-lesson1-page24',
          src: '/assignments/science/12/physics/electrical_circuit/24.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 24',
          pageNumber: 24
        },
        {
          id: 'electrical-circuit-lesson1-page25',
          src: '/assignments/science/12/physics/electrical_circuit/25.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 25',
          pageNumber: 25
        },
        {
          id: 'electrical-circuit-lesson1-page26',
          src: '/assignments/science/12/physics/electrical_circuit/26.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 26',
          pageNumber: 26
        },
        {
          id: 'electrical-circuit-lesson1-page27',
          src: '/assignments/science/12/physics/electrical_circuit/27.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 27',
          pageNumber: 27
        },
        {
          id: 'electrical-circuit-lesson1-page28',
          src: '/assignments/science/12/physics/electrical_circuit/28.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 28',
          pageNumber: 28
        },
        {
          id: 'electrical-circuit-lesson1-page29',
          src: '/assignments/science/12/physics/electrical_circuit/29.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 29',
          pageNumber: 29
        },
        {
          id: 'electrical-circuit-lesson1-page30',
          src: '/assignments/science/12/physics/electrical_circuit/30.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 30',
          pageNumber: 30
        },
        {
          id: 'electrical-circuit-lesson1-page31',
          src: '/assignments/science/12/physics/electrical_circuit/31.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 31',
          pageNumber: 31
        },
        {
          id: 'electrical-circuit-lesson1-page32',
          src: '/assignments/science/12/physics/electrical_circuit/32.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 32',
          pageNumber: 32
        },
        {
          id: 'electrical-circuit-lesson1-page33',
          src: '/assignments/science/12/physics/electrical_circuit/33.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 33',
          pageNumber: 33
        },
        {
          id: 'electrical-circuit-lesson1-page34',
          src: '/assignments/science/12/physics/electrical_circuit/34.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 34',
          pageNumber: 34
        },
        {
          id: 'electrical-circuit-lesson1-page35',
          src: '/assignments/science/12/physics/electrical_circuit/35.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 35',
          pageNumber: 35
        },
        {
          id: 'electrical-circuit-lesson1-page36',
          src: '/assignments/science/12/physics/electrical_circuit/36.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 36',
          pageNumber: 36
        },
        {
          id: 'electrical-circuit-lesson1-page37',
          src: '/assignments/science/12/physics/electrical_circuit/37.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 37',
          pageNumber: 37
        },
        {
          id: 'electrical-circuit-lesson1-page38',
          src: '/assignments/science/12/physics/electrical_circuit/38.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 38',
          pageNumber: 38
        },
        {
          id: 'electrical-circuit-lesson1-page39',
          src: '/assignments/science/12/physics/electrical_circuit/39.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 39',
          pageNumber: 39
        },
        {
          id: 'electrical-circuit-lesson1-page40',
          src: '/assignments/science/12/physics/electrical_circuit/40.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 40',
          pageNumber: 40
        },
        {
          id: 'electrical-circuit-lesson1-page41',
          src: '/assignments/science/12/physics/electrical_circuit/41.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 41',
          pageNumber: 41
        },
        {
          id: 'electrical-circuit-lesson1-page42',
          src: '/assignments/science/12/physics/electrical_circuit/42.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 42',
          pageNumber: 42
        },
        {
          id: 'electrical-circuit-lesson1-page43',
          src: '/assignments/science/12/physics/electrical_circuit/43.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 43',
          pageNumber: 43
        },
        {
          id: 'electrical-circuit-lesson1-page44',
          src: '/assignments/science/12/physics/electrical_circuit/44.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 44',
          pageNumber: 44
        },
        {
          id: 'electrical-circuit-lesson1-page45',
          src: '/assignments/science/12/physics/electrical_circuit/45.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 45',
          pageNumber: 45
        },
        {
          id: 'electrical-circuit-lesson1-page46',
          src: '/assignments/science/12/physics/electrical_circuit/46.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 46',
          pageNumber: 46
        },
        {
          id: 'electrical-circuit-lesson1-page47',
          src: '/assignments/science/12/physics/electrical_circuit/47.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 47',
          pageNumber: 47
        },
        {
          id: 'electrical-circuit-lesson1-page48',
          src: '/assignments/science/12/physics/electrical_circuit/48.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 48',
          pageNumber: 48
        },
        {
          id: 'electrical-circuit-lesson1-page49',
          src: '/assignments/science/12/physics/electrical_circuit/49.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 49',
          pageNumber: 49
        },
        {
          id: 'electrical-circuit-lesson1-page50',
          src: '/assignments/science/12/physics/electrical_circuit/50.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 50',
          pageNumber: 50
        },
        {
          id: 'electrical-circuit-lesson1-page51',
          src: '/assignments/science/12/physics/electrical_circuit/51.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 51',
          pageNumber: 51
        },
        {
          id: 'electrical-circuit-lesson1-page52',
          src: '/assignments/science/12/physics/electrical_circuit/52.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 52',
          pageNumber: 52
        },
        {
          id: 'electrical-circuit-lesson1-page53',
          src: '/assignments/science/12/physics/electrical_circuit/53.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 53',
          pageNumber: 53
        },
        {
          id: 'electrical-circuit-lesson1-page54',
          src: '/assignments/science/12/physics/electrical_circuit/54.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 54',
          pageNumber: 54
        },
        {
          id: 'electrical-circuit-lesson1-page55',
          src: '/assignments/science/12/physics/electrical_circuit/55.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 55',
          pageNumber: 55
        },
        {
          id: 'electrical-circuit-lesson1-page56',
          src: '/assignments/science/12/physics/electrical_circuit/56.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 56',
          pageNumber: 56
        },
        {
          id: 'electrical-circuit-lesson1-page57',
          src: '/assignments/science/12/physics/electrical_circuit/57.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 57',
          pageNumber: 57
        },
        {
          id: 'electrical-circuit-lesson1-page58',
          src: '/assignments/science/12/physics/electrical_circuit/58.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 58',
          pageNumber: 58
        },
        {
          id: 'electrical-circuit-lesson1-page59',
          src: '/assignments/science/12/physics/electrical_circuit/59.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 59',
          pageNumber: 59
        },
        {
          id: 'electrical-circuit-lesson1-page60',
          src: '/assignments/science/12/physics/electrical_circuit/60.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 60',
          pageNumber: 60
        },
        {
          id: 'electrical-circuit-lesson1-page61',
          src: '/assignments/science/12/physics/electrical_circuit/61.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 61',
          pageNumber: 61
        },
        {
          id: 'electrical-circuit-lesson1-page62',
          src: '/assignments/science/12/physics/electrical_circuit/62.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 62',
          pageNumber: 62
        },
        {
          id: 'electrical-circuit-lesson1-page63',
          src: '/assignments/science/12/physics/electrical_circuit/63.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 63',
          pageNumber: 63
        },
        {
          id: 'electrical-circuit-lesson1-page64',
          src: '/assignments/science/12/physics/electrical_circuit/64.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 64',
          pageNumber: 64
        },
        {
          id: 'electrical-circuit-lesson1-page65',
          src: '/assignments/science/12/physics/electrical_circuit/65.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 65',
          pageNumber: 65
        },
        {
          id: 'electrical-circuit-lesson1-page66',
          src: '/assignments/science/12/physics/electrical_circuit/66.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 66',
          pageNumber: 66
        },
        {
          id: 'electrical-circuit-lesson1-page67',
          src: '/assignments/science/12/physics/electrical_circuit/67.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 67',
          pageNumber: 67
        },
        {
          id: 'electrical-circuit-lesson1-page68',
          src: '/assignments/science/12/physics/electrical_circuit/68.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 68',
          pageNumber: 68
        },
        {
          id: 'electrical-circuit-lesson1-page69',
          src: '/assignments/science/12/physics/electrical_circuit/69.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 69',
          pageNumber: 69
        },
        {
          id: 'electrical-circuit-lesson1-page70',
          src: '/assignments/science/12/physics/electrical_circuit/70.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 70',
          pageNumber: 70
        },
        {
          id: 'electrical-circuit-lesson1-page71',
          src: '/assignments/science/12/physics/electrical_circuit/71.jpg',
          alt: 'Electrical Circuit Lesson 1 - Page 71',
          pageNumber: 71
        },
      ]
    },











    {
      id: 'Coming-Soon-Magnetism',
      title: 'Coming Soon - Magnetism',
      description: 'Magnetism lessons and assignments will be available soon. This will include magnetic fields, electromagnetic induction, and related physics concepts.',
      isComingSoon: true,
      previewText: 'Magnetism',
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
      <h1 className="notes-title text-center mb-6">Science 12 - Physics Assignments</h1>
      
      <div className="max-w-7xl mx-auto">
        {/* Introduction */}
        <div className="mb-6 text-center">
          <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
            <h2 className="text-lg font-semibold text-gray-100 mb-2">
              ⚡ Physics Assignments
            </h2>
            <p className="text-gray-300 text-sm">
              Access your Physics assignments here. Click on any lesson to view all pages. 
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