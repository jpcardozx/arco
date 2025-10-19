/**
 * TeamSectionWithImage Component
 * Seção de team com imagem profissional
 */

import Image from 'next/image'

interface TeamMember {
  id: string
  name: string
  role: string
  image?: string
}

interface TeamSectionWithImageProps {
  heroImage: string
  heroImageAlt?: string
  title: string
  description?: string
  members?: TeamMember[]
}

export function TeamSectionWithImage({
  heroImage,
  heroImageAlt = 'Team Image',
  title,
  description,
  members = [],
}: TeamSectionWithImageProps) {
  return (
    <section className="py-16 md:py-24 lg:py-32 px-4 md:px-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>

        {/* Hero Image */}
        <div className="mb-12 md:mb-16 rounded-xl overflow-hidden shadow-xl h-80 md:h-96 lg:h-[400px]">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
        </div>

        {/* Team Members Grid (if provided) */}
        {members.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {members.map((member) => (
              <div
                key={member.id}
                className="text-center p-6 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-105"
                style={{
                  background: 'rgba(212, 175, 55, 0.05)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              >
                {member.image && (
                  <div className="mb-4 rounded-full overflow-hidden h-32 w-32 mx-auto">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <h3 className="font-semibold text-lg text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-400 mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
