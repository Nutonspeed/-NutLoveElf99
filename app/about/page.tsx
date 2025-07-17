import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/cards/card"
import { Badge } from "@/components/ui/badge"
import { Star, Users, Award, Heart, Shield, Truck } from "lucide-react"
import Image from "next/image"
import AboutClient from "@/components/AboutClient"

export default function AboutPage() {
  const stats = [
    { label: "ลูกค้าที่พึงพอใจ", value: "50,000+", icon: Users },
    { label: "ปีของประสบการณ์", value: "10+", icon: Award },
    { label: "คะแนนรีวิวเฉลี่ย", value: "4.8", icon: Star },
    { label: "สินค้าคุณภาพ", value: "1,000+", icon: Heart },
  ]

  const values = [
    {
      icon: Shield,
      title: "คุณภาพเป็นเลิศ",
      description: "เราใช้วัสดุคุณภาพสูงและผ่านการตรวจสอบคุณภาพอย่างเข้มงวด",
    },
    {
      icon: Heart,
      title: "ใส่ใจลูกค้า",
      description: "ความพึงพอใจของลูกค้าคือสิ่งสำคัญที่สุดสำหรับเรา",
    },
    {
      icon: Truck,
      title: "บริการรวดเร็ว",
      description: "จัดส่งรวดเร็วทั่วประเทศ พร้อมบริการหลังการขายที่ดีเยี่ยม",
    },
  ]

  const team = [
    {
      name: "คุณสมชาย ใจดี",
      position: "ผู้ก่อตั้งและซีอีโอ",
      image: "/placeholder.svg?height=300&width=300",
      description: "ผู้นำด้านการออกแบบและพัฒนาผลิตภัณฑ์ผ้าคลุมโซฟา",
    },
    {
      name: "คุณมาลี สวยงาม",
      position: "หัวหน้าฝ่ายออกแบบ",
      image: "/placeholder.svg?height=300&width=300",
      description: "ผู้เชี่ยวชาญด้านการออกแบบและเทรนด์แฟชั่นบ้าน",
    },
    {
      name: "คุณสมศักดิ์ มั่นคง",
      position: "หัวหน้าฝ่ายผลิต",
      image: "/placeholder.svg?height=300&width=300",
      description: "ผู้เชี่ยวชาญด้านการผลิตและควบคุมคุณภาพ",
    },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="p-4">
        <AboutClient />
      </div>

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">เกี่ยวกับเรา</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            เราคือผู้นำด้านผ้าคลุมโซฟาคุณภาพสูง ด้วยประสบการณ์กว่า 10 ปี ในการสร้างสรรค์ผลิตภัณฑ์ที่ตอบโจทย์ความต้องการของลูกค้า
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4">เรื่องราวของเรา</Badge>
              <h2 className="text-3xl font-bold mb-6">จากความฝันสู่ความเป็นจริง</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  SofaCover Pro เริ่มต้นจากความฝันของผู้ก่อตั้งที่ต้องการสร้างผลิตภัณฑ์ผ้าคลุมโซฟา ที่มีคุณภาพสูงและราคาที่เหมาะสม
                  เพื่อให้ทุกครอบครัวสามารถปกป้องและเพิ่มความสวยงาม ให้กับเฟอร์นิเจอร์ที่พวกเขารักได้
                </p>
                <p>
                  ด้วยการวิจัยและพัฒนาอย่างต่อเนื่อง เราได้สร้างสรรค์ผลิตภัณฑ์ที่ตอบโจทย์ ความต้องการที่หลากหลายของลูกค้า ตั้งแต่ผ้าคลุมโซฟากันน้ำ
                  ไปจนถึงผ้าคลุมโซฟา ลุคหรูหราสำหรับบ้านสมัยใหม่
                </p>
                <p>
                  วันนี้ เราภูมิใจที่ได้เป็นส่วนหนึ่งในการสร้างความสุขและความสะดวกสบาย ให้กับบ้านของลูกค้ามากกว่า 50,000 ครอบครัวทั่วประเทศไทย
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/placeholder.svg?height=500&width=600"
                alt="เรื่องราวของเรา"
                width={600}
                height={500}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ค่านิยมของเรา</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">ค่านิยมที่เป็นแกนหลักในการดำเนินธุรกิจและสร้างสรรค์ผลิตภัณฑ์ของเรา</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">ทีมงานของเรา</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">ทีมผู้เชี่ยวชาญที่มีประสบการณ์และความเชี่ยวชาญในแต่ละด้าน</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="relative w-32 h-32 mx-auto mb-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={128}
                      height={128}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                  <p className="text-gray-600 text-sm">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">พันธกิจของเรา</h2>
          <p className="text-xl text-white/90 max-w-4xl mx-auto leading-relaxed">
            "เราตั้งใจที่จะสร้างสรรค์ผลิตภัณฑ์ผ้าคลุมโซฟาคุณภาพสูงที่ตอบโจทย์ความต้องการ ของลูกค้าในทุกไลฟ์สไตล์ พร้อมมอบประสบการณ์การช้อปปิ้งที่ดีที่สุด
            และบริการหลังการขายที่เป็นเลิศ เพื่อให้ทุกบ้านมีความสุขและความสวยงาม ที่ยั่งยืน"
          </p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
