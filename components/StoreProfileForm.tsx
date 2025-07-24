"use client"
import { useEffect, useState } from 'react'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/buttons/button'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/cards/card'
import type { StoreProfile } from '@/lib/config'
import { getStoreProfile, saveStoreProfile } from '@/lib/config'

const empty: StoreProfile = {
  storeName: '',
  phoneNumber: '',
  address: '',
  logoUrl: '',
  promptPayId: '',
  bankName: '',
  accountName: '',
  accountNumber: '',
}

export default function StoreProfileForm() {
  const [profile, setProfile] = useState<StoreProfile>(empty)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    getStoreProfile().then((p) => {
      setProfile(p)
      setLoaded(true)
    })
  }, [])

  const handleChange = (field: keyof StoreProfile) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setProfile({ ...profile, [field]: e.target.value })
    }

  const save = async () => {
    await saveStoreProfile(profile)
    alert('saved')
  }

  if (!loaded) return <p>Loading...</p>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Store Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {profile.logoUrl && (
          <img src={profile.logoUrl} alt="logo" className="w-24 h-24 object-contain" />
        )}
        <div className="space-y-2">
          <Label htmlFor="name">ชื่อร้าน</Label>
          <Input id="name" value={profile.storeName} onChange={handleChange('storeName')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">เบอร์โทร</Label>
          <Input id="phone" value={profile.phoneNumber} onChange={handleChange('phoneNumber')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="addr">ที่อยู่</Label>
          <Textarea id="addr" value={profile.address} onChange={handleChange('address')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="logo">โลโก้ร้าน URL</Label>
          <Input id="logo" value={profile.logoUrl} onChange={handleChange('logoUrl')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pp">PromptPay ID</Label>
          <Input id="pp" value={profile.promptPayId} onChange={handleChange('promptPayId')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bank">Bank Name</Label>
          <Input id="bank" value={profile.bankName} onChange={handleChange('bankName')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accname">Account Name</Label>
          <Input id="accname" value={profile.accountName} onChange={handleChange('accountName')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="accnum">Account Number</Label>
          <Input id="accnum" value={profile.accountNumber} onChange={handleChange('accountNumber')} />
        </div>
        <Button onClick={save}>Save</Button>
      </CardContent>
    </Card>
  )
}
