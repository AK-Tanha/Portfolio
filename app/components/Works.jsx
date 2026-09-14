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
          <Link href={`/works/${project.id}`} key={index} className="block group">
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3 }}
              className='rounded-2xl overflow-hidden glass card-hover'
            >
              <div className='relative aspect-[4/3] overflow-hidden'>
                <div className='absolute inset-0 transition-transform duration-500 group-hover:scale-105'>
                  <Image
                    src={project.bgImage}
                    alt={project.title}
                    fill
                    priority={index === 0}
                    className='object-cover object-top'
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                  <span className='inline-flex items-center gap-2 bg-black/60 text-white text-sm font-medium backdrop-blur-sm rounded-full px-4 py-2'>
                    View Project
                    <span>&rarr;</span>
                  </span>
                </div>
              </div>
              <div className='p-5'>
                <h2 className='font-semibold text-body text-lg mb-1'>{project.title}</h2>
                <p className='text-sm text-secondary'>{project.description}</p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        href="/works"
        className='w-max flex items-center justify-center gap-2 text-secondary glass rounded-full px-8 mx-auto my-16 py-3 card-hover'
      >
        Show More
        <Image src={isDark ? assets.right_arrow_bold_dark : assets.right_arrow_bold} alt='' className='w-4 h-auto' />
      </motion.a>
    </motion.div>
  )
}

export default Works
