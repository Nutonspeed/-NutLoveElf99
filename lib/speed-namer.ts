export const adjectives = [
  "Brilliant",
  "Cozy",
  "Dreamy",
  "Elegant",
  "Fancy",
  "Gentle",
  "Happy",
  "Icy",
  "Jolly",
  "Kind",
  "Lush",
  "Mellow",
  "Noble",
  "Oasis",
  "Peaceful",
  "Quiet",
  "Radiant",
  "Sunny",
  "Tranquil",
  "Vibrant",
  "Whimsical",
  "Youthful",
  "Zesty",
  "Amber",
  "Blissful",
  "Charming",
  "Delightful",
  "Enchanted",
  "Floral",
  "Golden",
  "Humble",
  "Ivory",
  "Jade",
  "Lavish",
  "Magical",
  "Nostalgic",
  "Opulent",
  "Playful",
  "Quirky",
  "Rustic",
  "Serene",
  "Timeless",
  "Unique",
  "Velvet",
  "Warm",
  "Xtraordinary",
  "Yearning",
  "Zealous",
  "Artful",
  "Bold",
]

export const themes = [
  "Aurora",
  "Breeze",
  "Cascade",
  "Dawn",
  "Eclipse",
  "Forest",
  "Glow",
  "Harbor",
  "Island",
  "Jungle",
  "Kingdom",
  "Lagoon",
  "Meadow",
  "Nirvana",
  "Oasis",
  "Prairie",
  "Quest",
  "Ridge",
  "Sanctuary",
  "Terrace",
  "Utopia",
  "Valley",
  "Wonder",
  "Xanadu",
  "Yard",
  "Zen",
  "Alpine",
  "Bay",
  "Canyon",
  "Desert",
  "Estate",
  "Fjord",
  "Grove",
  "Harbor",
  "Inlet",
  "Junction",
  "Knoll",
  "Lair",
  "Mesa",
  "Nook",
  "Orbit",
  "Peak",
  "Quarry",
  "Refuge",
  "Springs",
  "Trail",
  "Union",
  "Vista",
  "Wilds",
  "Xylophone",
  "Yonder",
  "Zephyr",
]

export const presetNames = adjectives.flatMap((a) =>
  themes.map((t) => `${a} ${t}`),
)

function slugify(str: string) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "")
}

export function randomCollectionName() {
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const theme = themes[Math.floor(Math.random() * themes.length)]
  return `${adj} ${theme}`
}

export function uniqueCollectionName(existingSlugs: string[]) {
  const tried = new Set<string>()
  while (tried.size < presetNames.length) {
    const name = presetNames[Math.floor(Math.random() * presetNames.length)]
    if (tried.has(name)) continue
    tried.add(name)
    const slug = slugify(name)
    if (!existingSlugs.includes(slug)) return name
  }
  return `Collection-${Date.now()}`
}
