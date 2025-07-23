export interface ParsedAddress {
  name: string
  phone: string | null
  address: string
}

function extractPhone(text: string): { phone: string | null; rest: string } {
  const tokens = text.split(/\s+/)
  for (let i = 0; i < tokens.length; i += 1) {
    const cleaned = tokens[i].replace(/[^\d+]/g, '')
    const digits = cleaned.replace(/\D/g, '')
    let phoneDigits = digits
    if (digits.startsWith('66') && digits.length === 11) {
      phoneDigits = `0${digits.slice(2)}`
    }
    if (phoneDigits.length === 9 || phoneDigits.length === 10) {
      tokens.splice(i, 1)
      return { phone: phoneDigits, rest: tokens.join(' ') }
    }
  }
  return { phone: null, rest: text.trim() }
}

export function parseAddress(input: string): ParsedAddress {
  let { phone, rest } = extractPhone(input)

  const parts = rest.split(/\n|,/).map((s) => s.trim()).filter(Boolean)

  let name = ''
  let address = ''

  if (parts.length > 1) {
    const first = parts[0]
    const digitIndex = first.search(/\d/)
    if (digitIndex > 0) {
      name = first.slice(0, digitIndex).trim()
      address = [first.slice(digitIndex).trim(), ...parts.slice(1)].join(' ').trim()
    } else {
      name = first
      address = parts.slice(1).join(' ').trim()
    }
  } else {
    const first = parts[0] || ''
    const digitIndex = first.search(/\d/)
    if (digitIndex > 0) {
      name = first.slice(0, digitIndex).trim()
      address = first.slice(digitIndex).trim()
    } else {
      const tokens = first.split(/\s+/)
      name = tokens.shift() || ''
      address = tokens.join(' ').trim()
    }
  }

  if (!address) address = rest.replace(name, '').trim()

  return { name, phone, address }
}
