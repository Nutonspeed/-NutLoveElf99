let counter = 1

export function genBillId() {
  const id = `BILL-${String(counter).padStart(4, '0')}`
  counter += 1
  return id
}

export function resetBillId() {
  if (process.env.NODE_ENV === 'development') {
    counter = 1
  }
}
