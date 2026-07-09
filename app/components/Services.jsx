"use client";
import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "motion/react"
import { useTheme } from '@/app/context/ThemeContext'

const Services = () => {
  const { isDark } = useTheme()

  if (!Array.isArray(serviceData) || serviceData.length === 0) {
    return (
      <div id='services' className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 px-5'>
        <p className='text-center text-red-500'>No services available at the moment.</p>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='services'
      className='w-full max-w-6xl mx-auto py-20 scroll-mt-20 px-5 relative'
    >
      <div className='absolute inset-0 bg-grid pointer-events-none opacity-50' />

      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className='text-center mb-2 text-lg font-ovo text-accent'
      >
        What I Offer
      </motion.h4>

      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center text-5xl font-ovo gradient-text'
      >
        My Services
      </motion.h2>

      <div className='section-divider' />

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-secondary'
      >
        I am a MERN Stack Developer from Bangladesh building responsive, full-stack web apps with clean UI and scalable backend.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10'
      >
        {serviceData.map((service, index) => (
          <ServiceCard key={service.id || `service-${index}`} service={service} index={index} isDark={isDark} />
        ))}
      </motion.div>
    </motion.div>
  )
}

const ServiceCard = ({ service, index, isDark }) => {
  const { icon, title, description, link } = service
  const safeLink = link || '#'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6 }}
      className='glass rounded-2xl p-6 card-hover cursor-pointer group relative overflow-hidden'
    >
      <div className='absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300' />

      <div className='flex flex-col h-full'>
        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 flex items-center justify-center mb-4'>
          <Image src={icon || assets.web_icon} alt={title} width={24} height={24} className='w-6' />
        </div>

        <h3 className='my-3 font-semibold text-body text-lg'>{title}</h3>
        <p className='text-secondary text-sm flex-1'>{description}</p>

        <Link
          href={safeLink}
          className='flex items-center gap-2 text-sm mt-6 font-medium transition-all duration-200 text-accent group-hover:gap-3'
          aria-label={`Read more about ${title}`}
        >
          Read more
          <Image src={isDark ? assets.right_arrow_white : assets.right_arrow} alt='' width={16} height={16} className='w-4' />
        </Link>
      </div>
    </motion.div>
  )
}

export default Services
