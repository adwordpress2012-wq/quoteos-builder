import type { MicahActionId } from './types'

export type MicahSuggestionInput = {
  text: string
  contactName?: string
  projectTitle?: string
  businessName?: string
}

export type MicahSuggestionResult = {
  text: string
  note: string
}

/**
 * Placeholder Micah Writing Assistant — swap for OpenAI/API later.
 */
export function generateMicahSuggestion(
  action: MicahActionId,
  input: MicahSuggestionInput,
): MicahSuggestionResult {
  const base = input.text.trim() || 'Your quote is ready for review.'
  const name = input.contactName?.trim() || 'there'
  const project = input.projectTitle?.trim() || 'your project'
  const business = input.businessName?.trim() || 'our team'

  switch (action) {
    case 'fix-grammar':
      return {
        text: base
          .replace(/\bi\b/g, 'I')
          .replace(/\s+/g, ' ')
          .replace(/\.{2,}/g, '.')
          .trim(),
        note: 'MVP: basic grammar cleanup applied locally.',
      }
    case 'make-professional':
      return {
        text: `Thank you for the opportunity to quote on ${project}. ${base} We look forward to discussing the scope and next steps at your convenience.`,
        note: 'MVP: professional tone template.',
      }
    case 'make-casual-au':
      return {
        text: `G'day ${name} — thanks for reaching out about ${project}. ${base} Give us a shout if you've got any questions. Cheers, ${business}`,
        note: 'MVP: casual Australian tone template.',
      }
    case 'improve-cta':
      return {
        text: `${base}\n\nTo accept this quote, reply to this email or call us to confirm. We'll get you booked in straight away.`,
        note: 'MVP: CTA enhancement appended.',
      }
    case 'create-quote-email':
      return {
        text: `Hi ${name},\n\nThanks for your enquiry about ${project}. Please find your quote attached as a PDF.\n\n${base}\n\nIf you're happy to proceed, reply to confirm and we'll send through deposit details.\n\nKind regards,\n${business}\nQuoteOS — Powered by DOS`,
        note: 'MVP: full quote email draft generated locally.',
      }
    case 'create-follow-up':
      return {
        text: `Hi ${name},\n\nJust checking in on the quote we sent through for ${project}. No rush — happy to answer any questions or adjust scope if needed.\n\nCheers,\n${business}`,
        note: 'MVP: soft follow-up template.',
      }
    case 'create-payment-reminder':
      return {
        text: `Hi ${name},\n\nFriendly reminder regarding the deposit for ${project}. Once received, we'll lock in your start date.\n\nLet us know if you need the payment details resent.\n\nThanks,\n${business}`,
        note: 'MVP: payment reminder template.',
      }
    case 'create-shorter':
      return {
        text: base.length > 120 ? `${base.slice(0, 117).trim()}…` : base,
        note: 'MVP: shortened to ~120 characters.',
      }
    default:
      return { text: base, note: 'MVP: no transformation applied.' }
  }
}
