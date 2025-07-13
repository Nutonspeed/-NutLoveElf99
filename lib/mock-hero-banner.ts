export interface HeroBanner {
  title: string
  subtitle: string
  image: string
}

export let heroBanner: HeroBanner = {
  title: "ผ้าคลุมโซฟา\nคุณภาพพรีเมียม",
  subtitle: "ปกป้องและเพิ่มความสวยงามให้โซฟาของคุณ ด้วยผ้าคลุมคุณภาพสูงจากเรา",
  image: "/placeholder.svg",
}

export function loadHeroBanner() {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('heroBanner')
    if (stored) heroBanner = JSON.parse(stored)
  }
}

export function setHeroBanner(data: HeroBanner) {
  heroBanner = data
  if (typeof window !== 'undefined') {
    localStorage.setItem('heroBanner', JSON.stringify(data))
  }
}
