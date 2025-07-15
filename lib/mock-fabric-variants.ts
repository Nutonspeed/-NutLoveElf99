export interface FabricToneVariant {
  label: string
  image: string
}

export const mockFabricToneVariants: Record<string, FabricToneVariant[]> = {
  'soft-linen': [
    { label: 'ครีม', image: '/images/039.jpg' },
    { label: 'เบจ', image: '/images/040.jpg' },
  ],
  'cozy-cotton': [
    { label: 'เทาเข้ม', image: '/images/041.jpg' },
    { label: 'เทาอ่อน', image: '/images/042.jpg' },
  ],
  'velvet-dream': [
    { label: 'น้ำเงิน', image: '/images/043.jpg' },
    { label: 'ฟ้าเข้ม', image: '/images/044.jpg' },
  ],
  'classic-stripe': [
    { label: 'กรม', image: '/images/045.jpg' },
    { label: 'ดำเทา', image: '/images/046.jpg' },
  ],
  'floral-muse': [
    { label: 'ชมพู', image: '/images/047.jpg' },
    { label: 'แดง', image: '/images/035.jpg' },
  ],
}
