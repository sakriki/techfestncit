import React from 'react';
import { FileText, ThumbsUp, Ban } from 'lucide-react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 relative">
      <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gafadi-gold transition-colors z-50">
        <X size={24} />
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gafadi-gold text-center animate-fade-in">Terms & Conditions</h1>
      <p className="max-w-2xl text-lg text-gray-300 text-center mb-8 animate-fade-in delay-200">
        By using GAFADI CHAT, you agree to our terms and conditions. Please use the platform responsibly and respectfully.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-12">
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-300">
          <ThumbsUp className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">User Responsibilities</h3>
          <p className="text-gray-400 text-center">Respect others, keep conversations appropriate, and follow campus guidelines.</p>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-500">
          <Ban className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">Prohibited Actions</h3>
          <p className="text-gray-400 text-center">No harassment, hate speech, spam, or illegal activities are tolerated.</p>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-700">
          <FileText className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">Summary</h3>
          <p className="text-gray-400 text-center">We reserve the right to suspend accounts that violate these terms. For questions, contact support.</p>
        </div>
      </div>
      <div className="max-w-3xl w-full bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-4 animate-fade-in delay-1000 text-center">
        <h2 className="text-2xl font-bold text-gafadi-gold mb-4">Thank you for being a responsible member of GAFADI CHAT!</h2>
        <p className="text-gray-300">If you have any questions about these terms, please <a href='/contact' className='text-gafadi-gold underline hover:text-gafadi-red'>contact us</a>.</p>
      </div>
    </div>
  );
} 