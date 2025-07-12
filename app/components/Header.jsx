"use client";
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react'
import { motion } from "motion/react"

const Header = () => {
  return (

    <div className='w-11/12 max-w-3xl text-center mx-auto py-16 sm:py-24 flex flex-col items-center'>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      >
        <Image src={assets.ak_pro} alt='' className='rounded-full w-32 h-32' />
      </motion.div>

      <motion.h3
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-ovo'>
        Hi! I'm AK Tanha <Image src={assets.hand_icon} alt='' className='w-6' />
      </motion.h3>

      <motion.h1

        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}

        className='text-3xl sm:text-6xl md:text-[66px] font-ovo'>
        A MERN stack developer based in Bangladesh
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className='max-w-2xl mx-auto font-ovo'>
        I am a MERN Stack Developer from Bangladesh building responsive, full-stack web apps with clean UI and scalable backend.
      </motion.p>

      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>

        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          href="#contact" className='px-10 py-3 border bg-black text-white rounded-full border-white flex items-center gap-2 '>
          Contact Me
          <Image src={assets.right_arrow_white} alt='' className='w-4' />
        </motion.a>

        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          href="/sample-resume.pdf" download className='px-10 py-3 border rounded-full border-grey-500 flex items-center gap-2 '>
          My Resume
          <Image src={assets.download_icon} alt='' className='w-4' />
        </motion.a>

      </div>
    </div>
  )
}

export default Header
