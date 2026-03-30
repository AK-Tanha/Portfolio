"use client";
import { assets } from '@/assets/assets'
import { Asset } from 'next/font/google'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'

const Navbar = () => {
 const sideMenuRef = useRef();
 const [isScroll, setIsScroll] = useState(false)
 const [theme, setTheme] = useState('light')
 const isDark = theme === 'dark'

 const openMenu = ()=>{
  sideMenuRef.current.style.transform = 'translateX(-16rem)'
 }
 const closeMenu = ()=>{
  sideMenuRef.current.style.transform = 'translateX(16rem)'
 }

 const applyTheme = (nextTheme) => {
  document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  localStorage.setItem('theme', nextTheme)
 }

 useEffect(()=>{
  const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null
  const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches
  const next = storedTheme || (prefersDark ? 'dark' : 'light')
  setTheme(next)
  applyTheme(next)

  const onScroll = () => {
    setIsScroll(window.scrollY > 50)
  }
  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
 },[])

 const toggleTheme = () => {
  const next = isDark ? 'light' : 'dark'
  setTheme(next)
  applyTheme(next)
 }

const navBgClass = isDark
  ? (isScroll ? 'bg-slate-950/95 text-slate-100' : 'bg-slate-950/80 text-slate-100')
  : (isScroll ? 'bg-white/95 text-slate-800' : 'bg-transparent text-slate-900');

return (
    <>  
      <div className={`fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] ${isDark ? 'hidden' : ''}`}>
        <Image src={assets.header_bg_color} alt='' className='w-full'/>
      </div>

      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-colors duration-300 ${navBgClass} ${isScroll ? 'shadow-sm' : ''}`}>
        <a href="/#top">
          <Image src={isDark ? assets.aktanha_logo_dark : assets.aktanha_logo} className='w-36 cursor-pointer mr-14' alt='logo'/>
        </a>
        <ul className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 ${isScroll ? (isDark ? 'shadow-sm bg-slate-800/70' : 'shadow-sm bg-white/80') : (isDark ? 'shadow-sm bg-slate-900/70' : 'shadow-sm bg-white/50')}`}>
          <li><a className={`font-ovo ${isDark ? 'text-slate-100' : 'text-slate-700'} hover:text-indigo-500`} href="/#top">Home</a></li>
          <li><a className={`font-ovo ${isDark ? 'text-slate-100' : 'text-slate-700'} hover:text-indigo-500`} href="/#about">About Me</a></li>
          <li><a className={`font-ovo ${isDark ? 'text-slate-100' : 'text-slate-700'} hover:text-indigo-500`} href="/#services">Services</a></li>
          <li><a className={`font-ovo ${isDark ? 'text-slate-100' : 'text-slate-700'} hover:text-indigo-500`} href="/#works">My Work</a></li>
          <li><a className={`font-ovo ${isDark ? 'text-slate-100' : 'text-slate-700'} hover:text-indigo-500`} href="/#contact">Contact</a></li>
        </ul>

        <div className='flex items-center gap-3'>
          <button onClick={toggleTheme} aria-label='Toggle dark/light theme' className='transition-colors duration-200'>
            <Image src={isDark ? assets.sun_icon : assets.moon_icon} alt={isDark ? 'Sun icon' : 'Moon icon'} className='w-6'/>
          </button>
          <a href="/#contact" className={`hidden lg:flex items-center gap-3 px-10 py-2.5 border rounded-full ml-4 font-ovo ${isDark ? 'text-white border-slate-600' : 'text-slate-800 border-gray-500'}`}>Contact <Image src={isDark ? assets.arrow_icon_dark : assets.arrow_icon} className='w-3' alt='icon'/> </a>

          <button className='block md:hidden ml-3'>
            <Image src={isDark ? assets.menu_white : assets.menu_black} alt='' className='w-6' onClick={openMenu}/>
          </button>
        </div>


       {/*---------mobile menu--------------*/}
       <ul ref={sideMenuRef} className="flex-col gap-4 py-20 px-10 fixed top-0 bottom-0 right-0 w-64 z-50 h-screen bg-white/95 dark:bg-slate-900/90 transition-transform duration-500 translate-x-64">
          <div className='absolute right-6 top-6' onClick={closeMenu}>
            <Image src={isDark ? assets.close_white : assets.close_black} alt='' className='w-5 cursor-pointer'/>
          </div>
          <li><a className="font-ovo text-slate-800 dark:text-slate-100" onClick={closeMenu} href="/#top">Home</a></li>
          <li><a className="font-ovo text-slate-800 dark:text-slate-100" onClick={closeMenu} href="/#about">About Me</a></li>
          <li><a className="font-ovo text-slate-800 dark:text-slate-100" onClick={closeMenu} href="/#services">Services</a></li>
          <li><a className="font-ovo text-slate-800 dark:text-slate-100" onClick={closeMenu} href="/#works">My Work</a></li>
          <li><a className="font-ovo text-slate-800 dark:text-slate-100" onClick={closeMenu} href="/#contact">Contact</a></li>
       </ul>


      </nav>
    </>
  )
}

export default Navbar
