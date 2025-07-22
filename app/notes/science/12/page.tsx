import Link from 'next/link';

export default function ScienceClass12() {
  return (
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
  );
} 