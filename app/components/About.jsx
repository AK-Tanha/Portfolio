"use client";
import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import { useTheme } from '@/app/context/ThemeContext'
import { motion } from "motion/react"

const About = () => {
  const { isDark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      id='about' className='w-full max-w-6xl mx-auto py-20 scroll-mt-20 px-5'
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className='text-center mb-16'
      >
        <h4 className='text-lg font-ovo text-accent mb-2'>Introduction</h4>
        <h2 className='text-5xl font-ovo gradient-text'>About Me</h2>
        <div className='section-divider' />
      </motion.div>

      <div className='flex w-full flex-col lg:flex-row items-center gap-16'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className='w-64 sm:w-80 shrink-0'
        >
          <div className='relative'>
            <div className='absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl' />
            <Image src={assets.ak_pro} alt='user' className='w-full rounded-3xl relative ring-2 ring-purple-500/20' />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className='flex-1'
        >
          <p className='mb-10 max-w-2xl font-ovo text-lg text-secondary leading-relaxed'>
            I'm a MERN Stack Developer skilled in building responsive web applications using MongoDB, Express.js, React.js, and Node.js. I enjoy crafting clean UIs, scalable backends, and delivering real-world solutions.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'
          >
            {infoList.map(({ icon, iconDark, title, description }, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className='glass rounded-2xl p-6 card-hover cursor-pointer'
              >
                <Image src={isDark ? iconDark : icon} alt={title} className='w-7 mt-3' />
                <h3 className='my-4 font-semibold text-body'>{title}</h3>
                <p className='text-secondary text-sm'>{description}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className='mt-12'
          >
            <h4 className='mb-6 font-ovo text-lg text-body'>Tools I Use</h4>
            <div className='flex items-center gap-4 flex-wrap'>
              {toolsData.map((tool, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className='flex items-center justify-center w-14 aspect-square glass rounded-xl cursor-pointer transition-all duration-300'
                >
                  <Image src={tool} alt='tool' className='w-6' />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default About
