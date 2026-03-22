import Image from 'next/image'
import { SectionContainer } from '@/components/ui/SectionContainer'

interface TestimonialItem {
  id: string
  authorName: string
  authorRole?: string | null
  quote: string
  rating?: number | null
  photo?: { url: string; alt: string } | null
}

interface TestimonialsProps {
  overline?: string | null
  title?: string | null
  testimonials: TestimonialItem[]
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5 mb-4" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg
          key={i}
          className={i < rating ? 'text-brand-accent' : 'text-neutral-200'}
          width="18"
          height="18"
          fill="currentColor"
          viewBox="0 0 20 20"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export function Testimonials({ overline, title, testimonials }: TestimonialsProps) {
  return (
    <SectionContainer className="bg-brand-light">
      {(overline || title) && (
        <div className="text-center mb-12">
          {overline && <p className="brand-overline mb-3">{overline}</p>}
          {title && <h2 className="section-title">{title}</h2>}
        </div>
      )}

      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <li
            key={t.id}
            className="bg-white rounded-card shadow-card p-7 flex flex-col"
          >
            {t.rating != null && t.rating > 0 && <StarRating rating={t.rating} />}

            <blockquote className="text-neutral-700 leading-relaxed italic flex-1 mb-6">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            <div className="flex items-center gap-3">
              {t.photo?.url ? (
                <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.photo.url} alt={t.photo.alt} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-brand-primary font-bold text-sm">
                    {t.authorName.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <p className="font-semibold text-neutral-900 text-sm">{t.authorName}</p>
                {t.authorRole && (
                  <p className="text-neutral-500 text-xs">{t.authorRole}</p>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </SectionContainer>
  )
}
