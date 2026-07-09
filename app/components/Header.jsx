"use client";
import { assets } from '@/assets/assets';
import Image from 'next/image';
import { motion } from "motion/react"

const Header = () => {
  return (
    <div className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 bg-grid pointer-events-none' />
      <div className='absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none' />
      <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none' />

      <div className='w-11/12 max-w-3xl text-center mx-auto py-24 sm:py-32 flex flex-col items-center relative z-10'>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
          className='relative mb-6'
        >
          <div className='absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 blur-xl opacity-50 animate-pulse' />
          <Image src={assets.ak_pro} alt='AK Tanha' className='rounded-full w-32 h-32 object-cover relative ring-2 ring-purple-500/30' />
        </motion.div>

        <motion.h3
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className='flex items-center justify-center gap-2 text-xl md:text-2xl mb-3 font-ovo'
        >
          Hi, I'm AK Tanha <Image src={assets.hand_icon} alt='' className='w-6 inline' />
        </motion.h3>

        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className='text-4xl sm:text-6xl md:text-[72px] font-ovo leading-tight'
        >
          <span className='gradient-text'>MERN Stack</span> Developer<br />based in Bangladesh
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className='max-w-2xl mx-auto font-ovo text-lg text-secondary'
        >
          Building responsive, full-stack web apps with clean UI and scalable backend.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className='flex flex-col sm:flex-row items-center gap-4 mt-8'
        >
          <a
            href="/#contact"
            className='group px-8 py-3 rounded-full flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-ovo'
          >
            Contact Me
            <Image src={assets.right_arrow_white} alt='' className='w-4 group-hover:translate-x-1 transition-transform' />
          </a>

          <a
            href="/Resume of AK Tanha.pdf"
            download
            className='group px-8 py-3 rounded-full flex items-center gap-2 border border-strong hover:border-purple-400 dark:hover:border-purple-500 transition-all duration-300 font-ovo text-secondary'
          >
            My Resume
            <Image src={assets.download_icon} alt='' className='w-4 dark:invert group-hover:-translate-y-0.5 transition-transform' />
          </a>
        </motion.div>
      </div>
    </div>
  )
}

export default Header
