"use client";
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from "motion/react";

export default function WorkImageLightbox({ src, title }) {
  const [isOpen, setIsOpen] = useState(false);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        className="h-64 sm:h-80 md:h-[450px] w-full relative bg-card cursor-pointer group overflow-hidden"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col"
            onClick={close}
          >
            <div className="flex items-center justify-between px-6 py-4 shrink-0">
              <h3 className="text-white font-ovo font-semibold text-lg">{title}</h3>
              <button
                onClick={close}
                className="text-white/70 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                Close
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 pb-6 flex justify-center" onClick={(e) => e.stopPropagation()}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={title}
                className="max-w-full h-auto rounded-lg shadow-2xl my-auto"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
