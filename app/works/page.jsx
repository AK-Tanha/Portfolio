import { assets, workData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata() {
  return {
    title: 'Works | Portfolio',
    description: 'Explore a collection of projects showcasing my expertise in front-end development.',
  }
}

const WorkPage = () => {
  return (
    <div className="min-h-screen bg-body pt-24 pb-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-center text-5xl font-ovo gradient-text">My Latest Work</h2>
          <div className="section-divider" />
          <p className="text-center max-w-2xl mx-auto mt-5 font-ovo text-secondary">
            Explore a collection of projects showcasing my expertise in front-end development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {workData.map((project, index) => (
            <Link href={project.link || '#'} key={index} className="block group">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] glass card-hover">
                <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                <Image
                  src={project.bgImage}
                  alt={project.title}
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-300" />

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h2 className="font-semibold text-white text-lg mb-1">{project.title}</h2>
                  <p className="text-sm text-slate-300">{project.description}</p>
                </div>

                <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-4">
                  <Image src={assets.send_icon} alt="" className="w-4 invert" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage