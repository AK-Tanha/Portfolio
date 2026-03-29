"use client";
import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { motion } from "motion/react"

const Services = () => {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkElement = typeof document !== 'undefined' && document.documentElement.classList.contains('dark')
      setIsDark(isDarkElement)
    }

    checkDarkMode()

    // Listen for dark class changes on html element
    const observer = new MutationObserver(checkDarkMode)
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
        border rounded-lg px-6 py-10 cursor-pointer 
        transition-all duration-300 ease-in-out
        hover:-translate-y-1
        border-gray-300 dark:border-gray-700
        bg-white dark:bg-gray-900
        hover:bg-[#fcf4ff] dark:hover:bg-[#2a004a]
        hover:shadow-[4px_4px_0_#000] dark:hover:shadow-[4px_4px_0_#9f7aea]
        hover:border-gray-400 dark:hover:border-purple-500
      `}
    >
      <div className='flex flex-col h-full'>
        <Image 
          src={safeIcon} 
          alt={`${safeTitle} icon`}
          width={40}
          height={40}
          className='w-10 h-10'
          loading={index < 3 ? 'eager' : 'lazy'} // Prioritize above-the-fold images
        />
        
        <h3 className='text-lg my-4 font-semibold text-gray-800 dark:text-gray-100'>
          {safeTitle}
        </h3>
        
        <p className='text-sm leading-6 flex-grow text-gray-600 dark:text-gray-400'>
          {safeDescription}
        </p>
        
        <a 
          href={safeLink} 
          className='flex items-center gap-2 text-sm mt-6 font-medium transition-colors duration-200
            text-purple-600 dark:text-purple-400 
            hover:text-purple-800 dark:hover:text-purple-300'
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
        </a>
      </div>
    </motion.div>
  )
}

export default Services
