"use client";
import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"

const Services = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      if (typeof window === 'undefined') return false

      const storedTheme = localStorage.getItem('theme')
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      const preferredIsDark = storedTheme === 'dark' || (!storedTheme && prefersDark)

      const hasDarkClass = document.documentElement.classList.contains('dark')
      const isDarkMode = hasDarkClass || preferredIsDark

      document.documentElement.classList.toggle('dark', isDarkMode)
      setIsDark(isDarkMode)

      return isDarkMode
    }

    checkDarkMode()

    // Listen for dark class changes on html element
    const observer = new MutationObserver(() => {
      const isDarkMode = document.documentElement.classList.contains('dark')
      setIsDark(isDarkMode)
    })

    if (typeof document !== 'undefined') {
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })
    }

    return () => observer.disconnect()
  }, [])

  // Validate serviceData to prevent runtime errors
  if (!Array.isArray(serviceData) || serviceData.length === 0) {
    return (
      <div id='services' className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 px-5'>
        <p className='text-center text-red-500 dark:text-red-400'>No services available at the moment.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='services' 
      className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 px-5'
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className='text-center mb-2 text-lg font-ovo'
      >
        What I Offer
      </motion.h4>
      
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center text-5xl font-ovo'
      >
        My Services
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className= 'text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'
      >
        I am MERN Stack Developer from Bangladesh building responsive, full-stack web apps with clean UI and scalable backend.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10'
      >
        {serviceData.map((service, index) => (
          <ServiceCard 
            key={service.id || `service-${index}`} 
            service={service} 
            index={index}
            isDark={isDark}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

// Separate component for better maintainability and reusability
const ServiceCard = ({ service, index, isDark }) => {
  const { icon, title, description, link } = service
  
  // Provide default values for missing data
  const safeTitle = title || 'Untitled Service'
  const safeDescription = description || 'No description available.'
  const safeLink = link || '#'
  const safeIcon = icon || assets.web_icon // fallback icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className={`
        border-[0.5px] border-gray-400 dark:border-gray-700 rounded-xl p-6 cursor-pointer
        hover:bg-[#fcf4ff] dark:hover:bg-[#2a004a]
        hover:-translate-y-1 duration-500
        hover:shadow-[4px_4px_0_#000] dark:hover:shadow-[4px_4px_0_#fff]
      `}
    >
      <div className='flex flex-col h-full'>
        <Image 
          src={safeIcon} 
          alt={`${safeTitle} icon`}
          width={40}
          height={40}
          className='w-7 mt-3'
          loading={index < 3 ? 'eager' : 'lazy'} // Prioritize above-the-fold images
        />
        
        <h3 className='my-4 font-semibold text-gray-700 dark:text-gray-300'>{safeTitle}</h3>
        <p className='text-gray-600 dark:text-gray-400 text-sm'>{safeDescription}</p>
        
        <Link 
          href={safeLink} 
          className='flex items-center gap-2 text-sm mt-6 font-medium transition-colors duration-200 text-purple-600 dark:text-purple-300 hover:text-purple-800 dark:hover:text-purple-100'
          aria-label={`Read more about ${safeTitle}`}
          onClick={(e) => {
            if (safeLink === '#') {
              e.preventDefault()
              console.warn('Service link not configured:', safeTitle)
            }
          }}
        >
          Read more 
          <Image 
            src={isDark ? assets.right_arrow_white : assets.right_arrow} 
            alt='Right arrow' 
            width={16}
            height={16}
            className='w-4 h-4 transition-transform duration-200 group-hover:translate-x-1'
          />
        </Link>
      </div>
    </motion.div>
  )
}

export default Services
