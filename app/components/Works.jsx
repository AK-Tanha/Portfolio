"use client";
import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"

const Works = () => {
  const [theme, setTheme] = useState('light')
  const isDark = theme === 'dark'

  useEffect(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
    const next = storedTheme || (prefersDark ? 'dark' : 'light')
    setTheme(next)
    
    // Apply theme class to document
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next === 'dark')
    }

    // Listen for theme changes from other components
    const handleStorageChange = () => {
      const current = localStorage.getItem('theme')
      if (current) {
        setTheme(current)
        document.documentElement.classList.toggle('dark', current === 'dark')
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='works' className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 px-5'>
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center mb-2 text-lg font-ovo text-gray-800 dark:text-gray-200'>My Portfolio</motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center text-5xl font-ovo text-gray-900 dark:text-white'>My Latest Work</motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-gray-700 dark:text-gray-300'>
        Welcome to my web development portfolio! Explore a collection of projects showcasing my expertise in front-end development.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 my-10'>
        {workData.map((projects, index) => (
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className='aspect-square bg-no-repeat bg-cover bg-center rounded-lg relative cursor-pointer group'
            style={{ backgroundImage: `url(${projects.bgImage})` }}>
            <div className='bg-white dark:bg-slate-800 w-10/12 rounded-md absolute bottom-5 left-1/2 -translate-x-1/2 py-3 px-5 flex items-center justify-between duration-500 group-hover:bottom-7'>
              <div>
                <h2 className='font-semibold text-gray-700 dark:text-gray-100'>{projects.title}</h2>
                <p className='text-sm text-gray-700 dark:text-gray-300'>{projects.description}</p>
              </div>
              <div className='border rounded-full border-black dark:border-gray-400 w-9 aspect-square
                flex items-center justify-center shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#fff] group-hover:bg-lime-300 dark:group-hover:bg-lime-400 transition'>
                <Image src={assets.send_icon} alt='send icon' className='w-5 dark:invert' />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        href="" className='w-max flex items-center justify-center gap-2
      text-gray-700 dark:text-gray-300 border-[0.5px] border-gray-500 dark:border-gray-600 rounded-full px-10 mx-auto my-20 hover:bg-[#fcf4ff] dark:hover:bg-[#2a004a] duration-500 py-3'>
        show more <Image src={isDark ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='right_arrow' className='w-4' />
      </motion.a>
    </motion.div>
  )
}

export default Works
