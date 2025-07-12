"use client";
import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"

const Services = () => {
  return (
    <motion.div
    initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
    id='services'className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 px-5'>
      <motion.h4
      initial={{ opacity: 0, y:-20 }}
        whileInView={{ opacity: 1 , y:0}}
        transition={{ duration: 0.3, delay:0.5 }}
       className='text-center mb-2 text-lg font-ovo'>
        What I Offer
        </motion.h4>
      <motion.h2 
      initial={{ opacity: 0, y:-20 }}
        whileInView={{ opacity: 1 , y:0}}
        transition={{ duration: 0.5, delay:0.5 }}
      className='text-center text-5xl font-ovo'>
        My Services
        </motion.h2>

      <motion.p
      initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.7, delay:0.5 }}
      className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
        I am MERN Stack Developer from Bangladesh building responsive, full-stack web apps with clean UI and scalable backend.
      </motion.p>

      <motion.div 
      initial={{ opacity: 0}}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay:0.6 }}
      className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10'>
        {serviceData.map(({icon, title, description, link}, index)=>(
            <motion.div
            whileHover={{scale:1.05}}
            key={index} className='border border-gray-400 rounded-lg px-8 py-12 cursor-pointer hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500 hover:shadow-[4px_4px_0_#000]'>
                <Image src={icon} alt='' className='w-10'/>
                <h3 className='text-lg my-4 text-gray-700'>{title}</h3>
                <p className='text-sm text-gray-600 leading-5'>{description}</p>
                <a href={link} className='flex items-center gap-2 text-sm mt-5'>read more <Image src={assets.right_arrow} alt='' className='w-4'/> </a>
            </motion.div>
        ))}
      </motion.div> 


    </motion.div>
    
  )
}

export default Services
