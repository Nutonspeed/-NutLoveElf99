'use client'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/inputs/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/buttons/button'

export default function MockLongForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    company: '',
    jobTitle: '',
    age: '',
    website: '',
    about: '',
    comments: '',
    favoriteColor: '',
    favoriteFood: '',
    hobbies: '',
    education: '',
    skillOne: '',
    skillTwo: '',
    reference: '',
    notes: '',
  })

  const handleChange = (field: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('submitted')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">ชื่อ</Label>
          <Input id="firstName" value={form.firstName} onChange={handleChange('firstName')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">นามสกุล</Label>
          <Input id="lastName" value={form.lastName} onChange={handleChange('lastName')} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">อีเมล</Label>
          <Input id="email" type="email" value={form.email} onChange={handleChange('email')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">เบอร์โทร</Label>
          <Input id="phone" value={form.phone} onChange={handleChange('phone')} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="address">ที่อยู่</Label>
        <Textarea id="address" value={form.address} onChange={handleChange('address')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">เมือง</Label>
          <Input id="city" value={form.city} onChange={handleChange('city')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="postalCode">รหัสไปรษณีย์</Label>
          <Input id="postalCode" value={form.postalCode} onChange={handleChange('postalCode')} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="country">ประเทศ</Label>
        <Input id="country" value={form.country} onChange={handleChange('country')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="company">บริษัท</Label>
          <Input id="company" value={form.company} onChange={handleChange('company')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">ตำแหน่งงาน</Label>
          <Input id="jobTitle" value={form.jobTitle} onChange={handleChange('jobTitle')} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">อายุ</Label>
          <Input id="age" type="number" value={form.age} onChange={handleChange('age')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">เว็บไซต์</Label>
          <Input id="website" value={form.website} onChange={handleChange('website')} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="about">เกี่ยวกับตัวคุณ</Label>
        <Textarea id="about" value={form.about} onChange={handleChange('about')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="comments">คอมเมนต์</Label>
        <Textarea id="comments" value={form.comments} onChange={handleChange('comments')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="favoriteColor">สีที่ชอบ</Label>
          <Input id="favoriteColor" value={form.favoriteColor} onChange={handleChange('favoriteColor')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="favoriteFood">อาหารที่ชอบ</Label>
          <Input id="favoriteFood" value={form.favoriteFood} onChange={handleChange('favoriteFood')} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="hobbies">งานอดิเรก</Label>
        <Input id="hobbies" value={form.hobbies} onChange={handleChange('hobbies')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="education">การศึกษา</Label>
        <Input id="education" value={form.education} onChange={handleChange('education')} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="skillOne">ทักษะที่ 1</Label>
          <Input id="skillOne" value={form.skillOne} onChange={handleChange('skillOne')} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="skillTwo">ทักษะที่ 2</Label>
          <Input id="skillTwo" value={form.skillTwo} onChange={handleChange('skillTwo')} />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="reference">รหัสอ้างอิง</Label>
        <Input id="reference" value={form.reference} onChange={handleChange('reference')} />
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">หมายเหตุเพิ่มเติม</Label>
        <Textarea id="notes" value={form.notes} onChange={handleChange('notes')} />
      </div>
      <Button type="submit" className="w-full">ส่งข้อมูล</Button>
    </form>
  )
}
