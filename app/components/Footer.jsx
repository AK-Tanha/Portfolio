"use client"
import React from 'react'
import Image from 'next/image'
import { assets } from '@/assets/assets'

const Footer = () => {
  return (
    <div className='mt-20'>
      <div className='text-center'>
        <Image src={assets.logo} alt='' className='w-36 mx-auto mb-2'/>
      </div>
      <div className='w-max flex items-center gap-2 mx-auto'> 
        <Image src={assets.mail_icon} alt='' className='w-6'/>
        aktanha75@gmail.com
      </div>

      <div className='text-center sm:flex items-center justify-between border-t
      border-gray-400 mx-[10%] mt-12 py-6 '>
        <p>© 2025 William Mark. All rights reserved.</p>
        <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
            <li><a target='_blank'
            href="https://www.facebook.com/ak.tanha.9">Github</a></li>
            <li><a target='_blank'
            href="https://www.facebook.com/ak.tanha.9">Linkdin</a></li>
            <li><a target='_blank'
            href="https://www.facebook.com/ak.tanha.9">Facebook</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Footer
