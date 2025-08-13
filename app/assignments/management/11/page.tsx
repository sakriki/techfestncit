import Link from 'next/link';

export default function ManagementClass11Assignments() {
  return (
    <div className="notes-choose-container">
      <h1 className="notes-title">Management - Class 11</h1>
      <div className="notes-card-row">
        {['english','nepali','maths','accounting','economics','business','computer'].map(subject => (
          <Link key={subject} href={`/assignments/management/11/${subject}`} className="notes-card-link">
            <div className="notes-card subject">
              <span className="notes-card-title" style={{ textTransform: 'capitalize' }}>{subject}</span>
              <span className="notes-card-desc">Assignments for {subject.charAt(0).toUpperCase() + subject.slice(1)}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 