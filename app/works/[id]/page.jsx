import { workData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return workData.map((project) => ({
    id: project.id,
  }))
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params
  const project = workData.find((p) => p.id === resolvedParams.id)
  
  if (!project) {
    return {
      title: 'Project Not Found',
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function WorkPage({ params }) {
  const resolvedParams = await params
  const project = workData.find((p) => p.id === resolvedParams.id)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-24 pb-12 px-5 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        <Link 
          href="/#works" 
          className="inline-flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 mb-8 transition-colors font-medium"
        >
          &larr; Back to Portfolio
        </Link>

        <div className="bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="h-64 sm:h-80 md:h-[450px] w-full relative bg-gray-200 dark:bg-gray-700">
            <Image 
              src={project.bgImage} 
              alt={project.title}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/60 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-ovo font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-gray-200 text-lg md:text-xl font-medium max-w-3xl leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12">
            <div className="prose prose-lg md:prose-xl dark:prose-invert max-w-none">
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mb-6 font-ovo border-b border-gray-200 dark:border-gray-700 pb-4">
                Project Overview
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-10 text-lg">
                This project represents a complete implementation using modern front-end engineering principles. 
                With a focus on performance, scalability, and delivering an exceptional user experience, 
                it showcases responsive UI architecture, seamless API integration, and robust state management. 
                The interface was designed to be highly interactive, accessible, and pixel-perfect across all devices.
              </p>
              
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-12 mb-6 font-ovo border-b border-gray-200 dark:border-gray-700 pb-4">
                Key Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {[
                  "Responsive UI perfectly adapting to mobile, tablet, and desktop environments.",
                  "Optimized performance with modern tooling and next-gen rendering strategies.",
                  "Intuitive user flows and carefully crafted micro-interactions.",
                  "Clean, modular, and highly maintainable codebase architecture."
                ].map((item, index) => (
                  <div key={index} className="flex gap-4 p-5 bg-white dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-700/50 shadow-sm transition-transform hover:scale-[1.02] duration-300 cursor-default">
                    <span className="text-purple-600 dark:text-purple-400 font-bold text-xl leading-none mt-1">✦</span>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex flex-col sm:flex-row gap-6 justify-center md:justify-between items-center p-8 md:p-10 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/10 rounded-2xl border border-purple-100 dark:border-purple-800/30 overflow-hidden relative shadow-inner">
                <div className="absolute -right-16 -top-16 w-64 h-64 bg-purple-400/10 dark:bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-pink-400/10 dark:bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-purple-900 dark:text-purple-100 font-ovo relative z-10 text-center md:text-left max-w-sm leading-tight">
                  Interested in building something similar?
                </h3>
                
                <Link 
                  href="/#contact" 
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3.5 px-8 rounded-full transition-all shadow-md hover:shadow-lg transform hover:-translate-y-1 duration-300 relative z-10 shrink-0 text-lg"
                >
                  Get In Touch
                  <span className="text-xl">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
