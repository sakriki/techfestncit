"use client";
import React, { useState } from 'react';
import { Mail, MapPin, MessageCircle, Instagram } from 'lucide-react';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 relative">
      <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gafadi-gold transition-colors z-50">
        <X size={24} />
      </Link>
      <h1 className="text-4xl font-bold mb-4 text-gafadi-gold text-center animate-fade-in">Contact Us</h1>
      <p className="max-w-2xl text-lg text-gray-300 text-center mb-8 animate-fade-in delay-200">
        Have a question, suggestion, or need help? Reach out to us!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-300">
          <Mail className="w-8 h-8 text-gafadi-gold mb-2" />
          <a href="mailto:cgafadi@gmail.com" className="text-gafadi-gold font-semibold hover:text-gafadi-red transition-colors">cgafadi@gmail.com</a>
          <span className="text-gray-400 text-xs mt-1">Email us</span>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-500">
          <MessageCircle className="w-8 h-8 text-gafadi-gold mb-2" />
          <a href="https://www.facebook.com/profile.php?id=61577880167661" target="_blank" rel="noopener noreferrer" className="text-gafadi-gold font-semibold hover:text-gafadi-red transition-colors">Messenger</a>
          <span className="text-gray-400 text-xs mt-1">Chat with us on Messenger</span>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-700">
          <Instagram className="w-8 h-8 text-gafadi-gold mb-2" />
          <a href="https://www.instagram.com/gafadichat/" target="_blank" rel="noopener noreferrer" className="text-gafadi-gold font-semibold hover:text-gafadi-red transition-colors">Instagram</a>
          <span className="text-gray-400 text-xs mt-1">DM us on Instagram</span>
        </div>
      </div>
      <div className="w-full max-w-2xl bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-4 animate-fade-in delay-1000">
        <h2 className="text-2xl font-bold text-gafadi-gold mb-4 text-center">Send us a message</h2>
        {!submitted ? (
          <form className="flex flex-col space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
            <input type="text" placeholder="Your Name" className="px-4 py-2 rounded bg-black border border-gafadi-gold/20 text-gray-200 focus:outline-none focus:border-gafadi-gold" required />
            <input type="email" placeholder="Your Email" className="px-4 py-2 rounded bg-black border border-gafadi-gold/20 text-gray-200 focus:outline-none focus:border-gafadi-gold" required />
            <textarea placeholder="Your Message" rows={4} className="px-4 py-2 rounded bg-black border border-gafadi-gold/20 text-gray-200 focus:outline-none focus:border-gafadi-gold" required />
            <button type="submit" className="px-4 py-2 rounded bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white font-medium hover:from-gafadi-yellow hover:to-gafadi-burgundy transition-all">Send Message</button>
          </form>
        ) : (
          <div className="text-center text-gafadi-gold text-lg font-semibold py-8 animate-fade-in">Thank you for reaching out! We'll get back to you soon.</div>
        )}
      </div>
    </div>
  );
} 