export interface CompanyInfo {
  name: string
  address: string
  taxId: string
}

const KEY = 'companyInfo'

export let companyInfo: CompanyInfo = { name: 'My Company', address: '', taxId: '' }

export function loadCompanyInfo() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem(KEY)
    if (stored) companyInfo = JSON.parse(stored)
  }
}

export function setCompanyInfo(info: CompanyInfo) {
  companyInfo = info
  if (typeof window !== 'undefined') {
    localStorage.setItem(KEY, JSON.stringify(info))
  }
}
