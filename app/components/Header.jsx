"use client";
import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react'

const Header = () => {
  return (

    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center'>
      <div>
        <Image src={assets.ak_pro} alt='' className='rounded-full w-32 h-32' />
      </div>
            <h3 className='flex items-end gap-2 text xl md:text 2xl mb-3 font-ovo'>Hi! I'm AK Tanha <Image src={assets.hand_icon} alt='' className='w-6' /></h3>
            <h1 className='text-3xl sm:text-6xl md:text-[66px] font-ovo'>A MERN stack developer based in Bangladesh</h1>
            <p className='max-w-2xl mx-auto font-ovo'>I am a frontend developer from California, USA with 10 years of experience in multiple companies like Microsoft, Tesla and Apple.</p>

            <div className='flex flex-col sm:flex-row items-center gap-4 mt-4'>
                <a href="#contact" className='px-10 py-3 border bg-black text-white rounded-full border-white flex items-center gap-2 '>Contact Me <Image src={assets.right_arrow_white} alt='' className='w-4' /></a>
                <a href="/sample-resume.pdf" download className='px-10 py-3 border rounded-full border-grey-500 flex items-center gap-2 '>My Resume <Image src={assets.download_icon} alt='' className='w-4' /></a>
            </div> 
    </div>
  )
}

export default Header
