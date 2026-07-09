"use client";
import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from "motion/react"
import { useTheme } from '@/app/context/ThemeContext'

const Works = () => {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='works' className='w-full max-w-6xl mx-auto py-20 scroll-mt-20 px-5'
    >
      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center mb-2 text-lg font-ovo text-accent'
      >
        My Portfolio
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center text-5xl font-ovo gradient-text'
      >
        My Latest Work
      </motion.h2>
      <div className='section-divider' />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-secondary'
      >
        Explore a collection of projects showcasing my expertise in front-end development.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 my-10'
      >
        {workData.map((project, index) => (
          <Link href={project.link || '#'} key={index} className="block group">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className='relative rounded-2xl overflow-hidden aspect-[4/3] glass card-hover'
            >
              <div
                className='absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110'
                style={{ backgroundImage: `url(${project.bgImage})` }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300' />

              <div className='absolute bottom-0 left-0 right-0 p-5'>
                <h2 className='font-semibold text-white text-lg mb-1'>{project.title}</h2>
                <p className='text-sm text-slate-300'>{project.description}</p>
              </div>

              <div className='absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4'>
                <Image src={assets.send_icon} alt='' className='w-4 invert' />
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        href="#"
        className='w-max flex items-center justify-center gap-2 text-secondary glass rounded-full px-8 mx-auto my-16 py-3 card-hover'
      >
        Show More
        <Image src={isDark ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='' className='w-4' />
      </motion.a>
    </motion.div>
  )
}

export default Works
