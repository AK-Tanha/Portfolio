"use client";
import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"

const About = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const getInitialTheme = () => {
      if (typeof window === 'undefined') return false

      const storedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const nextTheme = storedTheme || (prefersDark ? 'dark' : 'light')

      const isDarkMode = nextTheme === 'dark'
      document.documentElement.classList.toggle('dark', isDarkMode)
      setIsDark(isDarkMode)

      return isDarkMode
    }

    getInitialTheme()

    const updateFromDocumentClass = () => {
      if (typeof document === 'undefined') return
      const currentIsDark = document.documentElement.classList.contains('dark')
      setIsDark(currentIsDark)
    }

    const handleStorageChange = (event) => {
      if (event.key === 'theme') {
        const nextIsDark = event.newValue === 'dark'
        document.documentElement.classList.toggle('dark', nextIsDark)
        setIsDark(nextIsDark)
      }
    }

    const observer = new MutationObserver(updateFromDocumentClass)
    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    }

    window.addEventListener('storage', handleStorageChange)

    return () => {
      observer.disconnect()
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.7 }}

      id='about' className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 px-5'>
      <div>
        <motion.h4
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className='text-center mb-2 text-lg font-ovo'>
          Introduction
        </motion.h4>

        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className='text-center text-5xl font-ovo'>
          About Me
        </motion.h2>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className='w-64 sm:w-80 rounded-3xl max-w-none'>
          <Image src={assets.ak_pro} alt='user' className='w-full rounded-3xl' />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className='flex-1'>
          <p className='mb-10 max-w-2xl font-ovo'>
            I'm a MERN Stack Developer skilled in building responsive web applications using MongoDB, Express.js, React.js, and Node.js. I enjoy crafting clean UIs, scalable backends, and delivering real-world solutions.
          </p>


          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <motion.li
                whileHover={{ scale: 1.05 }}
                className='border-[0.5px] border-gray-400 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-[#fcf4ff] dark:hover:bg-[#2a004a] hover:-translate-y-1 duration-500 hover:shadow-[4px_4px_0_#000] dark:hover:shadow-[4px_4px_0_#fff]' key={index}>
                <Image src={isDark ? iconDark : icon} alt={title} className='w-7 mt-3' />
                <h3 className='my-4 font-semibold text-gray-700 dark:text-gray-300'>{title}</h3>
                <p className='text-gray-600 dark:text-gray-400 text-sm'>{description}</p>
              </motion.li>
            ))}
          </motion.ul>


          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className='my-6 text-gray-700 dark:text-gray-300 font-ovo'>Tools I Use</motion.h4>
          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className='flex items-center gap-3 sm:gap-5'>
            {toolsData.map((tool, index) => (
              <motion.li
                whileHover={{ scale: 1.1 }}
                className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-gray-400 dark:border-gray-700 rounded-lg cursor-pointer hover:-translate-y-1 duration-500' key={index}>
                <Image src={tool} alt='tool' className='w-5 sm:w-7' />
              </motion.li>
            ))}
          </motion.ul>

        </motion.div>
      </motion.div>

    </motion.div>
  )
}

export default About
