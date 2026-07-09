"use client";
import { assets } from '@/assets/assets'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { useTheme } from '@/app/context/ThemeContext'

const Navbar = () => {
  const { isDark, toggleTheme } = useTheme()
  const sideMenuRef = useRef()
  const [isScroll, setIsScroll] = useState(false)
  const [activeSection, setActiveSection] = useState('top')

  const sections = ['top', 'about', 'services', 'works', 'contact']

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)'
  }
  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)'
  }

  useEffect(() => {
    const onScroll = () => {
      setIsScroll(window.scrollY > 4)
      if (window.scrollY < 100) {
        setActiveSection('top')
        return
      }
      const scrollPos = window.scrollY + 120
      for (let i = sections.length - 1; i > 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navClass = isScroll
    ? `${isDark ? 'bg-[#0b1220]/95' : 'bg-white/90'} shadow-sm backdrop-blur-md`
    : 'bg-transparent'

  return (
    <>
      <nav className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${navClass}`}>
        <a href="/#top">
          <Image src={isDark ? assets.aktanha_logo_dark : assets.aktanha_logo} className='w-36 cursor-pointer mr-14' alt='AK Tanha logo' priority />
        </a>

        <ul className='hidden md:flex items-center gap-1 lg:gap-2 rounded-full px-2 py-1.5 glass'>
          {sections.map((s) => (
            <li key={s}>
              <a
                href={`/#${s}`}
                className={`font-ovo px-4 py-2 rounded-full text-sm transition-all duration-300 ${
                  activeSection === s
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-secondary hover:text-body hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {s === 'top' ? 'Home' : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-3'>
          <button onClick={toggleTheme} aria-label='Toggle theme' className='p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors duration-200'>
            <Image src={isDark ? assets.sun_icon : assets.moon_icon} alt='' className='w-5' />
          </button>

          <a
            href="/#contact"
            className='hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-ovo bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300'
          >
            Let's Talk
            <Image src={assets.right_arrow_white} className='w-3' alt='' />
          </a>

          <button className='block md:hidden ml-2 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors'>
            <Image src={isDark ? assets.menu_white : assets.menu_black} alt='' className='w-5' onClick={openMenu} />
          </button>
        </div>

        <ul ref={sideMenuRef} className="flex-col gap-6 py-20 px-10 fixed top-0 bottom-0 right-0 w-64 z-50 h-screen bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-transform duration-500 translate-x-64 shadow-2xl">
          <div className='absolute right-6 top-6 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 cursor-pointer transition-colors' onClick={closeMenu}>
            <Image src={isDark ? assets.close_white : assets.close_black} alt='' className='w-5' />
          </div>
          {sections.map((s) => (
            <li key={s}>
              <a
                className={`font-ovo text-lg transition-colors duration-200 text-secondary hover:text-accent`}
                onClick={closeMenu}
                href={`/#${s}`}
              >
                {s === 'top' ? 'Home' : s.charAt(0).toUpperCase() + s.slice(1)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  )
}

export default Navbar
