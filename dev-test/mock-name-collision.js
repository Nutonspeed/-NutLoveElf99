const fs = require('fs')
const path = require('path')

const red = '\x1b[31m'
const reset = '\x1b[0m'

const mockDir = path.join(__dirname, '..', 'mock')
const files = fs.readdirSync(mockDir).filter((f) => f.endsWith('.ts'))
const names = {}

for (const file of files) {
  const content = fs.readFileSync(path.join(mockDir, file), 'utf8')
  const regex = /export\s+(?:const|function|interface|type)\s+(\w+)/g
  let match
  while ((match = regex.exec(content))) {
    const name = match[1]
    if (!names[name]) names[name] = []
    names[name].push(file)
  }
}

const duplicates = Object.entries(names).filter(([, paths]) => paths.length > 1)

if (duplicates.length) {
  for (const [name, paths] of duplicates) {
    console.log(`${red}ชื่อซ้ำ: ${name} -> ${paths.join(', ')}${reset}`)
  }
} else {
  console.log('ไม่พบ key ซ้ำใน mock ตอนนี้')
}
