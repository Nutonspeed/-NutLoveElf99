export interface Fabric {
  id: string
  slug: string
  name: string
  description?: string
  size?: string
  collection_id?: string
  image_url?: string
  image_urls?: string[]
  price_min?: number
  price_max?: number
}

export const mockFabrics: Fabric[] = [
  {
    id: '35',
    slug: 'fabric-35',
    name: 'ลายผ้า 35',
    description: 'ตัวอย่างลายผ้า 35',
    image_url: '/images/035.jpg',
    image_urls: ['/images/035.jpg'],
    price_min: 100,
    price_max: 200,
  },
  {
    id: '36',
    slug: 'fabric-36',
    name: 'ลายผ้า 36',
    description: 'ตัวอย่างลายผ้า 36',
    image_url: '/images/036.jpg',
    image_urls: ['/images/036.jpg'],
    price_min: 110,
    price_max: 210,
  },
  {
    id: '37',
    slug: 'fabric-37',
    name: 'ลายผ้า 37',
    description: 'ตัวอย่างลายผ้า 37',
    image_url: '/images/037.jpg',
    image_urls: ['/images/037.jpg'],
    price_min: 120,
    price_max: 220,
  },
  {
    id: '38',
    slug: 'fabric-38',
    name: 'ลายผ้า 38',
    description: 'ตัวอย่างลายผ้า 38',
    image_url: '/images/038.jpg',
    image_urls: ['/images/038.jpg'],
    price_min: 130,
    price_max: 230,
  },
  {
    id: '39',
    slug: 'fabric-39',
    name: 'ลายผ้า 39',
    description: 'ตัวอย่างลายผ้า 39',
    image_url: '/images/039.jpg',
    image_urls: ['/images/039.jpg'],
    price_min: 140,
    price_max: 240,
  },
  {
    id: '40',
    slug: 'fabric-40',
    name: 'ลายผ้า 40',
    description: 'ตัวอย่างลายผ้า 40',
    image_url: '/images/040.jpg',
    image_urls: ['/images/040.jpg'],
    price_min: 150,
    price_max: 250,
  },
  {
    id: '41',
    slug: 'fabric-41',
    name: 'ลายผ้า 41',
    description: 'ตัวอย่างลายผ้า 41',
    image_url: '/images/041.jpg',
    image_urls: ['/images/041.jpg'],
    price_min: 160,
    price_max: 260,
  },
  {
    id: '42',
    slug: 'fabric-42',
    name: 'ลายผ้า 42',
    description: 'ตัวอย่างลายผ้า 42',
    image_url: '/images/042.jpg',
    image_urls: ['/images/042.jpg'],
    price_min: 170,
    price_max: 270,
  },
  {
    id: '43',
    slug: 'fabric-43',
    name: 'ลายผ้า 43',
    description: 'ตัวอย่างลายผ้า 43',
    image_url: '/images/043.jpg',
    image_urls: ['/images/043.jpg'],
    price_min: 180,
    price_max: 280,
  },
  {
    id: '44',
    slug: 'fabric-44',
    name: 'ลายผ้า 44',
    description: 'ตัวอย่างลายผ้า 44',
    image_url: '/images/044.jpg',
    image_urls: ['/images/044.jpg'],
    price_min: 190,
    price_max: 290,
  },
  {
    id: '45',
    slug: 'fabric-45',
    name: 'ลายผ้า 45',
    description: 'ตัวอย่างลายผ้า 45',
    image_url: '/images/045.jpg',
    image_urls: ['/images/045.jpg'],
    price_min: 200,
    price_max: 300,
  },
  {
    id: '46',
    slug: 'fabric-46',
    name: 'ลายผ้า 46',
    description: 'ตัวอย่างลายผ้า 46',
    image_url: '/images/046.jpg',
    image_urls: ['/images/046.jpg'],
    price_min: 210,
    price_max: 310,
  },
  {
    id: '47',
    slug: 'fabric-47',
    name: 'ลายผ้า 47',
    description: 'ตัวอย่างลายผ้า 47',
    image_url: '/images/047.jpg',
    image_urls: ['/images/047.jpg'],
    price_min: 220,
    price_max: 320,
  },
];

export async function getFabrics(): Promise<Fabric[]> {
  return Promise.resolve([...mockFabrics]);
}

export async function getFabricBySlug(slug: string): Promise<Fabric | undefined> {
  return Promise.resolve(mockFabrics.find((f) => f.slug === slug));
}
