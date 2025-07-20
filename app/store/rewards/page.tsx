"use client"
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/buttons/button'
import { addRedeem, updateCustomerPoints } from '@/core/mock/store'
import { useAuth } from '@/contexts/auth-context'
import { fetchCustomerById } from '@/lib/mock-customers'

const rewards = [
  { id: 'r1', name: 'ส่วนลด 50 บาท', cost: 500 },
  { id: 'r2', name: 'แก้วน้ำพรีเมี่ยม', cost: 800 },
]

export default function RewardsPage() {
  const { user } = useAuth()
  const [points, setPoints] = useState(0)

  useEffect(() => {
    if (user) {
      fetchCustomerById(user.id).then(c => setPoints(c?.points ?? 0))
    }
  }, [user])

  const handleRedeem = (reward: {id:string,name:string,cost:number}) => {
    if (!user) return
    if (points < reward.cost) return
    updateCustomerPoints(user.id, -reward.cost, 'redeem')
    addRedeem({ id: Date.now().toString(), customerId: user.id, reward: reward.name, points: reward.cost, createdAt: new Date().toISOString() })
    setPoints(points - reward.cost)
  }

  return (
    <div className="container mx-auto py-8 space-y-4">
      <h1 className="text-2xl font-bold">แลกของรางวัล</h1>
      <p>แต้มคงเหลือ {points}</p>
      <div className="space-y-2">
        {rewards.map(r => (
          <div key={r.id} className="flex justify-between border p-2">
            <span>{r.name} ({r.cost} แต้ม)</span>
            <Button onClick={() => handleRedeem(r)}>แลกของ</Button>
          </div>
        ))}
      </div>
    </div>
  )
}
