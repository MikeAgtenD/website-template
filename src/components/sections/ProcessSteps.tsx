import { SectionContainer } from '@/components/ui/SectionContainer'

interface Step {
  title: string
  description: string
}

interface ProcessStepsProps {
  overline?: string | null
  title?: string | null
  subtitle?: string | null
  steps: Step[]
}

export function ProcessSteps({ overline, title, subtitle, steps }: ProcessStepsProps) {
  return (
    <SectionContainer className="bg-white">
      {(overline || title || subtitle) && (
        <div className="text-center mb-14">
          {overline && <p className="brand-overline mb-3">{overline}</p>}
          {title && <h2 className="section-title mb-4">{title}</h2>}
          {subtitle && <p className="section-subtitle max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <li key={index} className="flex gap-5">
            {/* Step number */}
            <div className="flex-shrink-0 w-11 h-11 rounded-full bg-brand-primary text-white flex items-center justify-center font-bold text-lg">
              {index + 1}
            </div>
            <div>
              <h3 className="text-lg font-bold text-neutral-900 mb-2">{step.title}</h3>
              <p className="text-neutral-600 leading-relaxed text-sm">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </SectionContainer>
  )
}
