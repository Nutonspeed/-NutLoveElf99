import React from 'react'

export function EmojiPicker({ onSelect }: { onSelect: (emoji: string) => void }) {
  const emojis = ['😀', '😂', '😍', '👍', '🙏', '🎉']

  if (emojis.length === 0) {
    return <div className="text-sm text-gray-500">ไม่สามารถแสดง emoji ได้</div>
  }

  return (
    <div className="flex flex-wrap gap-1 p-2 border rounded">
      {emojis.map((e) => (
        <button
          key={e}
          type="button"
          onClick={() => onSelect(e)}
          className="text-xl hover:opacity-75"
        >
          {e}
        </button>
      ))}
    </div>
  )
}
