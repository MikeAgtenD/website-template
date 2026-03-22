import { SectionContainer } from '@/components/ui/SectionContainer'
import { cn } from '@/lib/utils'

interface RichTextContentProps {
  content: any
  className?: string
  narrow?: boolean
}

export function RichTextContent({ content, className, narrow = true }: RichTextContentProps) {
  // Payload Lexical content is a JSON object.
  // For full rendering, install @payloadcms/richtext-lexical and use its React renderer.
  // This component provides a safe fallback and wrapper.
  const text =
    typeof content === 'string'
      ? content
      : content?.root?.children
          ?.map((node: any) =>
            node.children?.map((child: any) => child.text ?? '').join('') ?? '',
          )
          .join('\n') ?? ''

  return (
    <SectionContainer className={cn('bg-white', className)}>
      <div className={cn(narrow && 'max-w-3xl mx-auto')}>
        <div className="rich-text">
          {text ? (
            <p>{text}</p>
          ) : (
            <p className="text-neutral-400 italic">No content.</p>
          )}
        </div>
      </div>
    </SectionContainer>
  )
}
