'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import type { ContactFormData, ContactFormResponse } from '@/types'

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string
  id: string
  error?: string
  as?: 'input' | 'textarea'
}

function Field({ label, id, error, as: Tag = 'input', ...props }: FieldProps) {
  const classes =
    'w-full px-4 py-3 border rounded-sm text-neutral-900 placeholder-neutral-400 ' +
    'focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent ' +
    'transition-colors ' +
    (error ? 'border-red-400 bg-red-50' : 'border-neutral-300 bg-white')

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-neutral-700 mb-1.5">
        {label}
        {props.required && <span className="text-brand-primary ml-0.5" aria-hidden="true">*</span>}
      </label>
      {Tag === 'textarea' ? (
        <textarea
          id={id}
          className={`${classes} resize-y min-h-[120px]`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input id={id} className={classes} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} />
      )}
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export function ContactForm() {
  const [data, setData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    website: '', // honeypot
  })
  const [errors, setErrors] = useState<Partial<ContactFormData>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [serverMessage, setServerMessage] = useState('')

  function validate(): boolean {
    const e: Partial<ContactFormData> = {}
    if (!data.name.trim()) e.name = 'Vul uw naam in.'
    if (!data.email.trim()) e.email = 'Vul uw e-mailadres in.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Ongeldig e-mailadres.'
    if (!data.message.trim()) e.message = 'Vul een bericht in.'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const result: ContactFormResponse = await res.json()

      if (result.success) {
        setStatus('success')
        setServerMessage(result.message)
        setData({ name: '', email: '', phone: '', message: '', website: '' })
      } else {
        setStatus('error')
        setServerMessage(result.message)
      }
    } catch {
      setStatus('error')
      setServerMessage('Er ging iets mis. Probeer het opnieuw of neem telefonisch contact op.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-card p-8 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg font-bold text-green-800 mb-2">Bericht verzonden!</h3>
        <p className="text-green-700">{serverMessage}</p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-6 text-sm text-green-700 underline hover:text-green-900"
        >
          Nieuw bericht sturen
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contactformulier">
      {/* Honeypot field — hidden from real users, catches bots */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website (leave blank)</label>
        <input
          id="website"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
        />
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field
            label="Naam"
            id="name"
            type="text"
            placeholder="Jan Janssen"
            required
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: (e.target as HTMLInputElement).value }))}
            error={errors.name}
            autoComplete="name"
          />
          <Field
            label="E-mailadres"
            id="email"
            type="email"
            placeholder="jan@voorbeeld.be"
            required
            value={data.email}
            onChange={(e) => setData((d) => ({ ...d, email: (e.target as HTMLInputElement).value }))}
            error={errors.email}
            autoComplete="email"
          />
        </div>

        <Field
          label="Telefoonnummer"
          id="phone"
          type="tel"
          placeholder="+32 475 00 00 00"
          value={data.phone}
          onChange={(e) => setData((d) => ({ ...d, phone: (e.target as HTMLInputElement).value }))}
          autoComplete="tel"
        />

        <Field
          as="textarea"
          label="Bericht"
          id="message"
          placeholder="Hoe kunnen wij u helpen?"
          required
          value={data.message}
          onChange={(e) => setData((d) => ({ ...d, message: (e.target as HTMLTextAreaElement).value }))}
          error={errors.message}
        />
      </div>

      {status === 'error' && (
        <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-3" role="alert">
          {serverMessage}
        </p>
      )}

      <div className="mt-6">
        <Button type="submit" loading={status === 'loading'} size="lg" className="w-full sm:w-auto">
          Bericht versturen
        </Button>
        <p className="mt-3 text-xs text-neutral-500">
          Velden gemarkeerd met <span className="text-brand-primary">*</span> zijn verplicht.
        </p>
      </div>
    </form>
  )
}
