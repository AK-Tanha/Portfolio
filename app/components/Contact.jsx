"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { motion } from "motion/react"

const Contact = () => {
  
  const [result, setResult] = useState("")

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "4e46237e-cbe9-4bb6-90df-42af3afa70ca");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    
      <motion.div 
      initial = {{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:1}}
      id='contact'
      className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 bg-white'>
      <motion.h4
      initial={{ opacity: 0, y:-20 }}
        whileInView={{ opacity: 1 , y:0}}
        transition={{ duration: 0.3, delay:0.5 }}
       className='text-center mb-2 text-lg font-ovo'>Connect with me</motion.h4>
      <motion.h2 
      initial={{ opacity: 0, y:-20 }}
        whileInView={{ opacity: 1 , y:0}}
        transition={{ duration: 0.5, delay:0.5 }}
      className='text-center text-5xl font-ovo'>Get in touch</motion.h2>
      <motion.p 
      initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
        transition={{ duration: 0.5, delay:0.7 }}
      className='text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo'>
        I'd love to hear from you? If you have any questions, comments, or feedback, please use the form below
      </motion.p>
      
    <motion.form
      initial = {{opacity:0}}
      whileInView={{opacity:1}}
      transition={{duration:0.5, delay:0.9}}
    onSubmit={onSubmit} className='max-w-2xl mx-auto'>
    <div  className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10 mb-8">
   <motion.input
     initial = {{x:-50, opacity:0}}
      whileInView={{x:0, opacity:1}}
      transition={{duration:0.6, delay:1.1}}
    type="text"
    placeholder="Enter Your Name"
    required
    className="p-3 outline-none border-[0.5px] border-gray-700 rounded-md bg-white w-full"
    name='Name'
  />
  <motion.input
  initial = {{x:50, opacity:0}}
      whileInView={{x:0, opacity:1}}
      transition={{duration:0.6, delay:1.2}}
    type="email"
    placeholder="Enter Your Email"
    required
    className="p-3 outline-none border-[0.5px] border-gray-700 rounded-md bg-white w-full"
    name='Email'
  />
</div>

        <motion.textarea
        initial = {{y:100, opacity:0}}
      whileInView={{y:0, opacity:1}}
      transition={{duration:0.6, delay:1.3}}
        rows="6" placeholder='Enter Your Message' required
        className='w-full p-4 outline-none border-[0.5px] border-gray-700 rounded-md bg-white mb-6' name='Message'/>
        <motion.button
        whileHover={{scale:1.05}}
        transition={{duration:0.3}}
        type='submit'
        className='py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white
        rounded-full mx-auto hover:bg-black duration-500'
        >Submit now <Image src={assets.right_arrow_white} alt='' className='w-4' /> </motion.button>
        
        <p className='mt-4'>{result}</p>

      </motion.form>
    </motion.div>
    
  )
}

export default Contact
