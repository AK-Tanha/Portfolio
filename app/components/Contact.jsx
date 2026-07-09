"use client"
import { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { motion } from "motion/react"
import { useTheme } from '@/app/context/ThemeContext'

const Contact = () => {
  const { isDark } = useTheme()
  const [result, setResult] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault()
    setResult("Sending....")
    const formData = new FormData(event.target)
    formData.append("access_key", "4e46237e-cbe9-4bb6-90df-42af3afa70ca")

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    })

    const data = await response.json()

    if (data.success) {
      setResult("Form Submitted Successfully")
      event.target.reset()
    } else {
      setResult(data.message)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id='contact'
      className='w-full max-w-6xl mx-auto py-20 scroll-mt-20 px-5 relative'
    >
      <div className='absolute inset-0 bg-grid pointer-events-none opacity-30' />

      <motion.h4
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className='text-center mb-2 text-lg font-ovo text-accent'
      >
        Connect with me
      </motion.h4>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className='text-center text-5xl font-ovo gradient-text'
      >
        Get in Touch
      </motion.h2>
      <div className='section-divider' />
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo text-secondary'
      >
        I'd love to hear from you. If you have any questions, comments, or feedback, please use the form below.
      </motion.p>

      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onSubmit={onSubmit}
        className='max-w-2xl mx-auto glass rounded-3xl p-8 md:p-10'
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          <input
            type="text"
            placeholder="Your Name"
            required
            className='p-3.5 outline-none border border-default rounded-xl w-full bg-body/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-body placeholder:text-muted'
            name='Name'
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className='p-3.5 outline-none border border-default rounded-xl w-full bg-body/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-body placeholder:text-muted'
            name='Email'
          />
        </div>

        <textarea
          rows="6"
          placeholder='Your Message'
          required
          className='w-full p-4 outline-none border border-default rounded-xl mb-6 bg-body/50 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-200 text-body placeholder:text-muted resize-none'
          name='Message'
        />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type='submit'
          className='py-3.5 px-10 w-max flex items-center justify-between gap-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full mx-auto hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 font-ovo'
        >
          Submit Now
          <Image src={assets.right_arrow_white} alt='' className='w-4' />
        </motion.button>

        {result && (
          <p className='mt-6 text-center text-sm font-medium text-secondary'>{result}</p>
        )}
      </motion.form>
    </motion.div>
  )
}

export default Contact
