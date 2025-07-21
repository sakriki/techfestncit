import React from 'react';
import { Shield, Zap, Headphones, Lock, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { X } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-8 h-8 text-gafadi-gold mb-2" />, title: 'End-to-End Encryption', desc: 'All your messages are protected with industry-leading encryption.'
  },
  {
    icon: <MessageCircle className="w-8 h-8 text-gafadi-gold mb-2" />, title: 'Anonymous Chat Rooms', desc: 'Join or create chat rooms without revealing your identity.'
  },
  {
    icon: <Zap className="w-8 h-8 text-gafadi-gold mb-2" />, title: 'Real-Time Messaging', desc: 'Experience instant messaging with zero lag and typing indicators.'
  },
  {
    icon: <Headphones className="w-8 h-8 text-gafadi-gold mb-2" />, title: '24/7 Support', desc: 'Our team is always here to help you, day or night.'
  },
  {
    icon: <Lock className="w-8 h-8 text-gafadi-gold mb-2" />, title: 'Privacy First', desc: 'No tracking, no ads, no selling your data. Ever.'
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 relative">
      <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gafadi-gold transition-colors z-50">
        <X size={24} />
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gafadi-gold text-center animate-fade-in">Features</h1>
      <p className="max-w-2xl text-lg text-gray-300 text-center mb-8 animate-fade-in delay-200">
        Discover what makes GAFADI CHAT the best way to connect on campus.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl mb-12">
        {features.map((f, i) => (
          <div key={f.title} className={`bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-${300 + i * 100}`}>
            {f.icon}
            <h3 className="text-xl font-semibold mb-2 text-gafadi-gold text-center">{f.title}</h3>
            <p className="text-gray-400 text-center">{f.desc}</p>
          </div>
        ))}
      </div>
      <div className="max-w-xl w-full bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-4 animate-fade-in delay-1000 text-center">
        <h2 className="text-2xl font-bold text-gafadi-gold mb-4">Ready to try these features?</h2>
        <p className="text-gray-300 mb-4">Sign up now and join the next generation of campus chat.</p>
        <a href="/" className="inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white font-medium hover:from-gafadi-yellow hover:to-gafadi-burgundy transition-all shadow-lg hover:shadow-gafadi-gold/20 animate-fade-in delay-1200">Start Chatting</a>
      </div>
    </div>
  );
} 