import { assets, infoList, toolsData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const About = () => {
  return (
    <div id='about' className='w-full max-w-6xl mx-auto py-10 scroll-mt-20 px-5'>
      <div>
        <h4 className='text-center mb-2 text-lg font-ovo'>Introduction</h4>
        <h2 className='text-center text-5xl font-ovo'>About Me</h2>
      </div>
    
    <div className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
        
        <div className='w-64 sm:w-80 rounded-3xl max-w-none'>
            <Image src={assets.ak_pro} alt='user' className='w-full rounded-3xl'/>
        </div>
        
        <div className='flex-1'>
            <p className='mb-10 max-w-2xl font-ovo'>I'm a MERN Stack Developer skilled in building responsive web applications using MongoDB, Express.js, React.js, and Node.js. I enjoy crafting clean UIs, scalable backends, and delivering real-world solutions.</p>
            
            
            <ul className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
              {infoList.map(({icon, iconDark, title, description},index)=>(
                <li className='border-[0.5px] border-grey-400 rounded-xl p-6 cursor-pointer hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500 hover:shadow-[4px_4px_0_#000]' key={index}>
                  <Image src={icon} alt={title} className='w-7 mt-3'/>
                  <h3 className='my-4 font-semibold text-grey-700'>{title}</h3>
                  <p className='text-grey-600 text-sm'>{description}</p>
                </li>
              ))}
            </ul>


            <h4 className='my-6 text-grey-700 font-ovo'>Tools I Use</h4>
            <ul className='flex items-center gap-3 sm:gap-5'>
              {toolsData.map((tool, index)=>(
                <li
                className='flex items-center justify-center w-12 sm:w-14 aspect-square border border-grey-400 rounded-lg cursor-pointer hover:-translate-y-1 duration-500' key={index}>
                  <Image src={tool} alt='tool' className='w-5 sm:w-7'/>
                </li>
              ))}
            </ul>

        </div>
    </div>
    
    </div>
  )
}

export default About
