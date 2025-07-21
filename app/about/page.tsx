import React from 'react';
import { Users, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 relative">
      <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gafadi-gold transition-colors z-50">
        <X size={24} />
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gafadi-gold text-center animate-fade-in">About GAFADI CHAT</h1>
      <p className="max-w-2xl text-lg text-gray-300 text-center mb-8 animate-fade-in delay-200">
        GAFADI CHAT is the next generation of college communication. Our mission is to connect students securely and anonymously, making campus life more vibrant and inclusive.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full mb-12">
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-300">
          <Shield className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
          <p className="text-gray-400 text-center">To provide a safe, private, and fun space for students to connect, share, and grow together.</p>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-500">
          <Zap className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
          <p className="text-gray-400 text-center">To become the leading platform for campus communication, empowering students worldwide.</p>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-700">
          <Users className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">Our Values</h3>
          <p className="text-gray-400 text-center">Privacy, inclusivity, speed, and support. We believe every student deserves a voice.</p>
        </div>
      </div>
      <div className="max-w-3xl w-full bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-4 animate-fade-in delay-1000">
        <h2 className="text-2xl font-bold text-gafadi-gold mb-4 text-center">Our Story</h2>
        <p className="text-gray-300 text-center mb-2">GAFADI CHAT was born out of a need for a private, fun, and secure way for students to connect on campus. What started as a small project quickly grew into a vibrant community, thanks to the passion and feedback of students like you.</p>
        <p className="text-gray-400 text-center">We are constantly evolving, adding new features, and listening to our users. Join us on this journey and help shape the future of campus communication!</p>
      </div>
    </div>
  );
} 