'use client'

import { useState } from 'react'
import { SectionContainer } from '@/components/ui/SectionContainer'
import { cn } from '@/lib/utils'

interface FAQItem {
  question: string
  answer: any // Payload richText or plain string
}

interface FAQProps {
  title?: string | null
  subtitle?: string | null
  items: FAQItem[]
  className?: string
}

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  const answerId = `faq-answer-${item.question.slice(0, 20).replace(/\s+/g, '-')}`

  return (
    <div className="border border-neutral-200 rounded-card overflow-hidden">
      <button
        type="button"
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-white hover:bg-neutral-50 transition-colors"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={answerId}
      >
        <span className="font-semibold text-neutral-900">{item.question}</span>
        <svg
          className={cn('w-5 h-5 text-brand-primary flex-shrink-0 transition-transform duration-200', isOpen && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      <div
        id={answerId}
        role="region"
        className={cn(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96' : 'max-h-0',
        )}
      >
        <div className="px-6 pb-5 pt-2 text-neutral-600 leading-relaxed border-t border-neutral-100">
          {typeof item.answer === 'string'
            ? item.answer
            : 'Answer content'}
        </div>
      </div>
    </div>
  )
}

export function FAQ({ title, subtitle, items, className }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <SectionContainer className={cn('bg-neutral-50', className)}>
      {(title || subtitle) && (
        <div className="text-center mb-10">
          {title && <h2 className="section-title mb-4">{title}</h2>}
          {subtitle && <p className="section-subtitle max-w-2xl mx-auto">{subtitle}</p>}
        </div>
      )}

      <div className="max-w-3xl mx-auto space-y-3">
        {items.map((item, index) => (
          <FAQAccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </SectionContainer>
  )
}
