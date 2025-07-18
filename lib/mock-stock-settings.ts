export interface StockAlertSetting {
  enabled: boolean
  threshold: number
}

let stockAlert: StockAlertSetting = { enabled: true, threshold: 5 }

function save() {
  if (typeof window !== 'undefined') {
    localStorage.setItem('stockAlert', JSON.stringify(stockAlert))
  }
}

export function loadStockAlert() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('stockAlert')
    if (stored) stockAlert = JSON.parse(stored)
  }
}

export function getStockAlert() {
  return stockAlert
}

export function setStockAlert(setting: StockAlertSetting) {
  stockAlert = setting
  save()
}
