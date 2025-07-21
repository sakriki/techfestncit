'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { X } from 'lucide-react';

export default function CreatorPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-12 relative">
      {/* Close Button */}
      <Link href="/" className="absolute top-4 right-4 text-gray-400 hover:text-gafadi-gold transition-colors z-50">
        <X size={24} />
      </Link>

      {/* Banner Section */}
      <div
        className="w-full max-w-4xl mx-auto relative flex justify-center items-center"
        style={{ height: '180px' }}
      >
        <div
          className="absolute inset-0 rounded-t-xl overflow-hidden"
          style={{ zIndex: 1 }}
        >
          <Image
            src="/images/sakshambanner.webp"
            alt="Saksham Jaiswal Banner"
            layout="fill"
            objectFit="cover"
            priority
            className="object-cover w-full h-full"
          />
          {/* Banner dim overlay */}
          <div className="absolute inset-0 bg-black/40" style={{ zIndex: 2 }} />
        </div>
      </div>
      {/* Centered Profile Image Overlapping Banner */}
      <div className="w-full flex justify-center relative z-20" style={{ marginTop: '-70px', marginBottom: '24px' }}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="w-52 h-52 sm:w-60 sm:h-60 rounded-full overflow-hidden creator-image-glow border-4 border-gafadi-gold/50 shadow-lg bg-black"
        >
          <Image
            src="/images/saksham-jaiswal.webp"
            alt="Saksham Jaiswal - Creator of GAFADI CHAT"
            width={240} // 60 * 4 = 240px
            height={240}
            className="rounded-full w-full h-full object-cover"
            priority
          />
        </motion.div>
      </div>
      <div style={{ height: '70px' }} /> {/* Spacer for overlap */}

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-4xl w-full bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-8 text-center"
      >
        <h1 className="text-4xl font-bold mb-6 text-gafadi-gold text-center">
          About the Creators
        </h1>

        {/* Content */}
        <div className="text-gray-300 text-lg space-y-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Hello! I'm <span className="text-gafadi-gold font-semibold">Saksham Jaiswal</span>, the creator behind GAFADI CHAT.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            I'm currently a student at <span className="text-gafadi-gold font-semibold">Trinity International College</span>.
            My journey in education began at <span className="text-gafadi-gold font-semibold">Holy Vision Secondary School</span>, where I completed my SEE exam.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            GAFADI CHAT was born out of a passion for creating secure and engaging communication platforms for students.
            I envisioned a space where college students could connect freely and anonymously, fostering community and open discussion.
          </motion.p>
           <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            It's been an incredible journey building this platform, and I'm excited to continue improving it based on user feedback.
             Thanks for visiting and being a part of the GAFADI CHAT community!
          </motion.p>
           {/* Portfolio Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="mt-8"
          >
            <a
              href="https://sakshamjaiswal.com.np"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white transition-all shadow-lg hover:shadow-gafadi-gold/20 hover:opacity-90"
            >
              Visit my Portfolio
            </a>
          </motion.div>
          {/* YouTube Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="mt-4"
          >
            <a
              href="https://youtube.com/@techrikiyt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-red-600 to-yellow-400 text-white transition-all shadow-lg hover:shadow-gafadi-gold/20 hover:opacity-90"
            >
              Visit my YouTube Channel
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Skills & Technologies Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 2.6 }}
        className="max-w-4xl w-full bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-8 text-gafadi-gold text-center">
          Skills & Technologies Used
        </h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {/* Example Technologies - Add/remove/change as needed */}
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 relative">
               {/* Placeholder for Next.js Icon or Logo */}
               <span className="text-4xl text-white">△</span>
            </div>
            <span className="text-gray-300 text-sm">Next.js</span>
          </div>
           <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 relative">
               {/* Placeholder for React Icon or Logo */}
                <span className="text-4xl text-white">⚛️</span>
            </div>
            <span className="text-gray-300 text-sm">React</span>
          </div>
           <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 relative">
               {/* Placeholder for Tailwind CSS Icon or Logo */}
               <span className="text-4xl text-blue-400">💨</span>
            </div>
            <span className="text-gray-300 text-sm">Tailwind CSS</span>
          </div>
           <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 relative">
               {/* Placeholder for Framer Motion Icon or Logo */}
                <span className="text-4xl text-pink-400">✨</span>
            </div>
            <span className="text-gray-300 text-sm">Framer Motion</span>
          </div>
           <div className="flex flex-col items-center">
            <div className="w-12 h-12 mb-2 relative">
               {/* Placeholder for Node.js Icon or Logo - Replace with actual icon/image */}
                {/* <span className="text-4xl text-green-500">एन</span> */}
                <span className="text-green-500 text-2xl font-bold">JS</span> {/* Simple JS text placeholder */}
            </div>
            <span className="text-gray-300 text-sm">Node.js</span>
          </div>
        </div>
      </motion.div>

      {/* Join Us Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 1.6 }}
        className="max-w-4xl w-full bg-black/70 border border-gafadi-gold/10 rounded-xl p-8 mt-12 text-center"
      >
         <h2 className="text-3xl font-bold mb-6 text-gafadi-gold text-center">
          Wanna Join the Team?
        </h2>
         {/* Join Us Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.8 }}
          className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto mb-6 rounded-full overflow-hidden creator-image-glow border-4 border-gafadi-gold/50"
        >
          <Image
            src="/images/who.webp"
            alt="Join the GAFADI CHAT team"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
        </motion.div>
         <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.0 }}
            className="text-gray-300 text-lg mb-6"
          >
            We're always looking for passionate individuals to help us make GAFADI CHAT even better.
          </motion.p>
           <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.2 }}
             className="text-gray-300 text-lg mb-8"
          >
            Have skills in development, design, marketing, or something else you think could help?
            Tell us how you can contribute!
          </motion.p>
           {/* Contact Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.4 }}
          >
            <a
              href="/contact"
              className="inline-block px-8 py-3 text-lg font-medium rounded-full bg-gradient-to-r from-gafadi-gold to-gafadi-red text-white transition-all shadow-lg hover:shadow-gafadi-gold/20 hover:opacity-90"
            >
              Contact Us
            </a>
          </motion.div>
      </motion.div>
    </div>
  );
} 