import Link from 'next/link';

export default function ManagementStream() {
  return (
    <div className="notes-choose-container">
      <h1 className="notes-title management">Management Stream</h1>
      <div className="notes-card-row">
        <Link href="/notes/management/11" className="notes-card-link">
          <div className="notes-card management">
            <span className="notes-card-title">Class 11</span>
            <span className="notes-card-desc">Notes for Management Class 11</span>
          </div>
        </Link>
        <Link href="/notes/management/12" className="notes-card-link">
          <div className="notes-card management">
            <span className="notes-card-title">Class 12</span>
            <span className="notes-card-desc">Notes for Management Class 12</span>
          </div>
        </Link>
      </div>
    </div>
  );
} 