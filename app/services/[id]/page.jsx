import { serviceData, assets } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return serviceData.map((service) => ({
    id: service.id,
  }))
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const service = serviceData.find((s) => s.id === resolvedParams.id)
  
  if (!service) {
    return {
      title: 'Service Not Found',
    }
  }

  return {
    title: `${service.title} | Services`,
    description: service.description,
  }
}

export default async function ServicePage({ params }) {
  const resolvedParams = await params
  const service = serviceData.find((s) => s.id === resolvedParams.id)

  if (!service) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12 px-5 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <Link 
          href="/#services" 
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-8 transition-colors font-medium"
        >
          &larr; Back to Services
        </Link>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8 mb-10 pb-10 border-b border-gray-200 dark:border-gray-700">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-gray-700 rounded-2xl flex items-center justify-center shadow-md p-4 shrink-0 transition-transform hover:scale-105 duration-300">
              <Image 
                src={service.icon || assets.web_icon} 
                alt={`${service.title} icon`}
                width={48}
                height={48}
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-5xl font-ovo font-bold text-gray-900 dark:text-white mb-4">
                {service.title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl font-medium">
                Professional solutions tailored to your specific needs
              </p>
            </div>
          </div>

          <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 font-ovo">
              Service Overview
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10 text-lg">
              {service.description}
            </p>
            
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-12 mb-6 font-ovo">
              What You Can Expect
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                "High-quality, scalable solutions tailored to your unique specific goals.",
                "Clean, maintainable code following modern industry best practices.",
                "Focus on exceptional design principles and engaging user experience.",
                "Continuous communication and proactive support throughout the project."
              ].map((item, index) => (
                <div key={index} className="flex gap-4 p-5 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm">
                  <span className="text-purple-600 dark:text-purple-400 font-bold text-xl leading-none mt-1">✓</span>
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-16 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10 rounded-2xl p-8 md:p-10 border border-purple-100 dark:border-purple-800/30 text-center shadow-inner relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-2xl md:text-3xl font-bold text-purple-900 dark:text-purple-100 mb-4 font-ovo relative z-10">
                Ready to accelerate your project?
              </h3>
              <p className="text-purple-800 dark:text-purple-200 mb-8 max-w-2xl mx-auto text-lg relative z-10">
                Let's collaborate to bring your vision to life with modern technology and elegant design.
              </p>
              <Link 
                href="/#contact" 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 relative z-10"
              >
                Start a Conversation
                <span className="text-xl">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
