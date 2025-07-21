import React from 'react';
import Link from 'next/link';
import { Lock, Shield, EyeOff, HelpCircle, X } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 relative">
      <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gafadi-gold transition-colors z-50">
        <X size={24} />
      </Link>

      <h1 className="text-4xl font-bold mb-4 text-gafadi-gold text-center animate-fade-in">Privacy Policy</h1>
      <div className="max-w-3xl text-gray-300 text-lg space-y-6 mt-8">
        <p>Your privacy is important to us. This policy outlines how we handle information.</p>
        <p>Information we collect may include...</p>
        <p>How we use your information...</p>
        <p>How we protect your information...</p>
        <p>Your rights regarding your information...</p>
        <p>Changes to this privacy policy...</p>
        <p>Contact us about this policy...</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full mb-12">
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-300">
          <Lock className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">Data Protection</h3>
          <p className="text-gray-400 text-center">We use advanced security measures to keep your data safe and secure at all times.</p>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-500">
          <Shield className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">End-to-End Encryption</h3>
          <p className="text-gray-400 text-center">All messages are encrypted from sender to receiver. No one else can read them.</p>
        </div>
        <div className="bg-black/60 border border-gafadi-gold/20 rounded-xl p-6 flex flex-col items-center animate-fade-in delay-700">
          <EyeOff className="w-10 h-10 text-gafadi-gold mb-2" />
          <h3 className="text-xl font-semibold mb-2">Your Rights</h3>
          <p className="text-gray-400 text-center">You control your data. You can request deletion or export of your information at any time.</p>
        </div>
      </div>
      <div className="max-w-3xl w-full bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-4 animate-fade-in delay-1000">
        <h2 className="text-2xl font-bold text-gafadi-gold mb-4 text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="flex items-start animate-fade-in delay-1100">
            <HelpCircle className="w-6 h-6 text-gafadi-gold mr-3 mt-1" />
            <div>
              <p className="font-semibold text-gray-200">Do you sell my data?</p>
              <p className="text-gray-400">No. We never sell or share your data with third parties.</p>
            </div>
          </div>
          <div className="flex items-start animate-fade-in delay-1200">
            <HelpCircle className="w-6 h-6 text-gafadi-gold mr-3 mt-1" />
            <div>
              <p className="font-semibold text-gray-200">Can I delete my account?</p>
              <p className="text-gray-400">Yes. You can request account deletion at any time from your profile settings.</p>
            </div>
          </div>
          <div className="flex items-start animate-fade-in delay-1300">
            <HelpCircle className="w-6 h-6 text-gafadi-gold mr-3 mt-1" />
            <div>
              <p className="font-semibold text-gray-200">Is my chat history private?</p>
              <p className="text-gray-400">Absolutely. Only you and your chat partners can see your messages.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 