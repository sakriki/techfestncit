import Link from 'next/link';

export default function NotesHome() {
  return (
    <div className="notes-choose-container">
      <h1 className="notes-title">Choose Stream</h1>
      <div className="notes-card-row">
        <Link href="/notes/science" className="notes-card-link">
          <div className="notes-card science">
            <span className="notes-card-title">Science</span>
            <span className="notes-card-desc">For Science stream students</span>
          </div>
        </Link>
        <Link href="/notes/management" className="notes-card-link">
          <div className="notes-card management">
            <span className="notes-card-title">Management</span>
            <span className="notes-card-desc">For Management stream students</span>
          </div>
        </Link>
      </div>
    </div>
  );
} 