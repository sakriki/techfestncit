"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const AboutAnonymousPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-900 to-indigo-900 text-white p-8">
      <div className="absolute top-4 left-4">
        <Button onClick={handleBackClick} className="flex items-center space-x-2 text-lg text-white hover:text-gray-300">
          <ArrowLeft className="w-6 h-6" />
          <span>Back to Chat</span>
        </Button>
      </div>
      <h1 className="text-5xl font-bold mb-6 text-yellow-400">About Anonymous Chat</h1>
      <p className="text-xl mb-4 text-center max-w-2xl">
        Welcome to the Anonymous Chat feature of Gafadi Chat. This space is designed for secure,
        private conversations where your identity remains hidden.
      </p>
      <p className="text-lg mb-4 text-center max-w-2xl">
        Here, you can freely express yourself, share thoughts, and connect with other users
        without any personal identifiers. We prioritize your privacy and ensure a safe environment
        for open discussions.
      </p>
      <p className="text-lg text-center max-w-2xl">
        Remember to always adhere to our community guidelines and respect other users.
        Enjoy connecting anonymously!
      </p>
      <div className="mt-8 text-sm text-gray-300">
        <p>&copy; 2024 Gafadi Chat. All rights reserved.</p>
      </div>
    </div>
  );
};

export default AboutAnonymousPage; 