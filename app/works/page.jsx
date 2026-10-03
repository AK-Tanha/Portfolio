import { workData } from '@/assets/assets'
import Image from 'next/image'
import Link from 'next/link'

export async function generateMetadata() {
  return {
    title: 'Works | Portfolio',
    description: 'Explore a collection of projects showcasing my expertise in front-end development.',
  }
}

const groupedWork = workData.reduce((groups, project) => {
  const category = project.category || 'Other'
  if (!groups[category]) groups[category] = []
  groups[category].push(project)
  return groups
}, {})

const WorkPage = () => {
  return (
    <div className="min-h-screen bg-body pt-24 pb-12 px-5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className='relative flex items-center justify-between'>
            <Link 
              href="/#works" 
              className="inline-flex items-center gap-2 text-accent hover:text-accent mb-8 transition-colors font-medium"
            >
              &larr; Back to Portfolio
            </Link>
            <h2 className="absolute left-1/2 -translate-x-1/2 text-center text-5xl font-ovo gradient-text">My Latest Work</h2>
          </div>
          <div className="section-divider" />
          <p className="text-center max-w-2xl mx-auto mt-5 font-ovo text-secondary">
            Explore a collection of projects showcasing my expertise in front-end development.
          </p>
        </div>


        <div className="flex flex-col gap-16">
          {Object.entries(groupedWork).map(([category, projects]) => (
            <section key={category}>
              <div className="flex items-center gap-4 mb-8">
                <h3 className="relative inline-block font-ovo text-3xl md:text-4xl font-extrabold tracking-tight whitespace-nowrap">
                  <span className="gradient-text">{category}</span>
                  <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-[#7c3aed] via-[#a855f7] to-[#db2777] opacity-80" />
                  <span className="absolute -bottom-1 left-0 h-[3px] w-1/3 rounded-full bg-white/70 blur-[2px] dark:bg-white/40" />
                </h3>
                <span className="shrink-0 px-3 py-1 rounded-full text-xs font-semibold bg-accent/10 text-accent border border-accent/20">
                  {projects.length} {projects.length === 1 ? 'project' : 'projects'}
                </span>
                <div className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {projects.map((project) => (
                  <Link href={`/works/${project.id}`} key={project.id} className="block group">
                    <div className="rounded-2xl overflow-hidden glass card-hover">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                          <Image
                            src={project.bgImage}
                            alt={project.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                          />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="inline-flex items-center gap-2 bg-black/60 text-white text-sm font-medium backdrop-blur-sm rounded-full px-4 py-2">
                            View Project
                            <span>&rarr;</span>
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <span className="inline-block mb-2 px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent border border-accent/20">
                          {project.category || 'Other'}
                        </span>
                        <h2 className="font-semibold text-body text-lg mb-1">{project.title}</h2>
                        <p className="text-sm text-secondary">{project.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage