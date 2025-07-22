import Link from 'next/link';

export default function ScienceStream() {
  return (
    <div className="notes-choose-container">
      <h1 className="notes-title">Science Stream</h1>
      <div className="notes-card-row">
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
  );
} 