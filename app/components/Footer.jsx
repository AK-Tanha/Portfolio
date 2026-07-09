"use client"
import Image from 'next/image'
import { assets } from '@/assets/assets'
import { useTheme } from '@/app/context/ThemeContext'

const Footer = () => {
  const { isDark } = useTheme()

  return (
    <footer className='relative mt-20'>
      <div className='h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mx-[10%]' />

      <div className='max-w-6xl mx-auto px-5 py-12'>
        <div className='text-center mb-6'>
          <Image src={isDark ? assets.aktanha_logo_dark : assets.aktanha_logo} alt='AK Tanha' className='w-36 mx-auto mb-2' />
        </div>

        <div className='flex items-center justify-center gap-2 text-secondary mb-8'>
          <Image src={assets.mail_icon} alt='' className='w-5' />
          <a href="mailto:aktanha75@gmail.com" className='hover:text-accent transition-colors'>aktanha75@gmail.com</a>
        </div>

        <div className='flex flex-col sm:flex-row items-center justify-between border-t border-default pt-8 gap-4'>
          <p className='text-sm text-muted'>© 2025 AK Tanha. All rights reserved.</p>
          <ul className='flex items-center gap-8'>
            <li>
              <a target='_blank' href="https://github.com/AK-Tanha"
                className='text-sm text-secondary hover:text-accent transition-colors'>
                GitHub
              </a>
            </li>
            <li>
              <a target='_blank' href="https://linkedin.com/in/ak-tanha-09b325212"
                className='text-sm text-secondary hover:text-accent transition-colors'>
                LinkedIn
              </a>
            </li>
            <li>
              <a target='_blank' href="https://www.facebook.com/ak.tanha.9"
                className='text-sm text-secondary hover:text-accent transition-colors'>
                Facebook
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}

export default Footer
