"use client";
import { assets } from '@/assets/assets'
import { Asset } from 'next/font/google'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

const Navbar = () => {
 const sideMenuRef = useRef();
 const [isScroll, setIsScroll] = useState(false)
 const openMenu = ()=>{
  sideMenuRef.current.style.transform = 'translateX(-16rem)'
}
const closeMenu = ()=>{
  sideMenuRef.current.style.transform = 'translateX(16rem)'
}

useEffect(()=>{
  window.addEventListener('scroll',()=>{
    if (scrollY>50) {
       setIsScroll(true)
    }else{
      setIsScroll(false)
    }
  })
},[])

return (
    <>  
      <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]'>
        <Image src={assets.header_bg_color} alt='' className='w-full'/>
      </div>

      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center 
      justify-between z-50 ${ isScroll ?"bg-white opacity-95 backdrop-blur-3xl shadow-sm": ""}`}>
        <a href="#top">
          <Image src={assets.logo} className='w-28 cursor-pointer mr-14' alt='logo'/>
        </a>
        
        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3
        ${ isScroll ? "" : "shadow-sm bg-white opacity-50"}`}>
          <li><a className="font-ovo" href="#top">Home</a></li>
          <li><a className="font-ovo" href="#about">About Me</a></li>
          <li><a className="font-ovo" href="#services">Services</a></li>
          <li><a className="font-ovo" href="#works">My Work</a></li>
          <li><a className="font-ovo" href="#contact">Contact</a></li>
        </ul>

        <div className='flex items-center gap-3'>
          <button>
            <Image src={assets.moon_icon} alt='' className='w-6'/>
          </button>
          <a href="#contact" className='hidden lg:flex items-center gap-3 px-10 py-2.5 border
          border-grey-500 rounded-full ml-4 font-ovo'>Contact <Image src={assets.arrow_icon} className='w-3'
          alt='icon'/> </a>

          <button className='block md:hidden ml-3'>
            <Image src={assets.menu_black} alt='' className='w-6' onClick={openMenu}/>
          </button>
        </div>


       {/*---------mobile menu--------------*/}
       <ul ref={sideMenuRef} className="flex-col gap-4 py-20 px-10 fixed top-0 bottom-0 right-0 w-64 z-50 h-screen bg-rose-50 transition-transform duration-500 translate-x-64">
          <div className='absolute right-6 top-6' onClick={closeMenu}>
            <Image src={assets.close_black} alt='' className='w-5 cursor-pointer'/>
          </div>
          <li><a className="font-ovo" onClick={closeMenu} href="#top">Home</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#about">About Me</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#services">Services</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#work">My Work</a></li>
          <li><a className="font-ovo" onClick={closeMenu} href="#contact">Contact</a></li>
       </ul>


      </nav>
    </>
  )
}

export default Navbar
