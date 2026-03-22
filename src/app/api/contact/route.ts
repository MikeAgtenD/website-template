import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import type { ContactFormData, ContactFormResponse } from '@/types'

export async function POST(req: NextRequest) {
  let body: ContactFormData

  try {
    body = await req.json()
  } catch {
    return NextResponse.json<ContactFormResponse>(
      { success: false, message: 'Ongeldig verzoek.' },
      { status: 400 },
    )
  }

  // Honeypot check — bots fill the hidden 'website' field
  if (body.website) {
    return NextResponse.json<ContactFormResponse>(
      { success: true, message: 'Bedankt voor uw bericht!' },
      { status: 200 },
    )
  }

  // Basic server-side validation
  const errors: string[] = []
  if (!body.name?.trim()) errors.push('Naam is verplicht.')
  if (!body.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Geldig e-mailadres is verplicht.')
  if (!body.message?.trim()) errors.push('Bericht is verplicht.')

  if (errors.length > 0) {
    return NextResponse.json<ContactFormResponse>(
      { success: false, message: errors.join(' ') },
      { status: 422 },
    )
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

  const mailTo = process.env.MAIL_TO || 'digitalhorizonservice@gmail.com'
  const mailFrom = process.env.MAIL_FROM || process.env.SMTP_USER || 'noreply@example.com'

  try {
    await transporter.sendMail({
      from: `"${body.name}" <${mailFrom}>`,
      to: mailTo,
      replyTo: body.email,
      subject: `Nieuw contactbericht van ${body.name}`,
      text: [
        `Naam: ${body.name}`,
        `E-mail: ${body.email}`,
        body.phone ? `Telefoon: ${body.phone}` : '',
        '',
        `Bericht:\n${body.message}`,
      ]
        .filter(Boolean)
        .join('\n'),
      html: `
        <table style="font-family:Arial,sans-serif;max-width:600px;border-collapse:collapse">
          <tr><td style="padding:8px 0"><strong>Naam:</strong> ${body.name}</td></tr>
          <tr><td style="padding:8px 0"><strong>E-mail:</strong> <a href="mailto:${body.email}">${body.email}</a></td></tr>
          ${body.phone ? `<tr><td style="padding:8px 0"><strong>Telefoon:</strong> ${body.phone}</td></tr>` : ''}
          <tr><td style="padding:16px 0;border-top:1px solid #eee"><strong>Bericht:</strong><br/><br/>${body.message.replace(/\n/g, '<br/>')}</td></tr>
        </table>
      `,
    })

    return NextResponse.json<ContactFormResponse>({
      success: true,
      message: 'Bedankt voor uw bericht! Wij nemen zo snel mogelijk contact met u op.',
    })
  } catch (err) {
    console.error('[Contact API] Failed to send email:', err)
    return NextResponse.json<ContactFormResponse>(
      {
        success: false,
        message: 'Het bericht kon niet worden verzonden. Probeer het later opnieuw.',
      },
      { status: 500 },
    )
  }
}
