"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, Smile, Phone, Video } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { mockChatMessages, type ChatMessage } from "@/lib/mock-data"

export default function ChatPage() {
  const { user, isAuthenticated } = useAuth()
  const [messages, setMessages] = useState<ChatMessage[]>(mockChatMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = () => {
    if (!newMessage.trim() || !user) return

    const message: ChatMessage = {
      id: Date.now().toString(),
      senderId: user.id,
      senderName: user.name,
      message: newMessage,
      timestamp: new Date().toISOString(),
      type: "text",
      isAdmin: user.role === "admin",
    }

    setMessages([...messages, message])
    setNewMessage("")

    // Simulate admin response
    if (user.role !== "admin") {
      setIsTyping(true)
      setTimeout(() => {
        const adminResponse: ChatMessage = {
          id: (Date.now() + 1).toString(),
          senderId: "1",
          senderName: "Admin",
          message: "ขอบคุณสำหรับข้อความค่ะ ทีมงานจะตอบกลับในไม่ช้า",
          timestamp: new Date().toISOString(),
          type: "text",
          isAdmin: true,
        }
        setMessages((prev) => [...prev, adminResponse])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">กรุณาเข้าสู่ระบบ</h1>
          <p className="text-gray-600 mb-8">คุณต้องเข้าสู่ระบบก่อนใช้งานระบบแชท</p>
          <Button>เข้าสู่ระบบ</Button>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col">
            {/* Chat Header */}
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="/placeholder.svg?height=40&width=40" />
                    <AvatarFallback>CS</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">ฝ่ายบริการลูกค้า</CardTitle>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">ออนไลน์</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === user?.id ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${
                      message.senderId === user?.id ? "flex-row-reverse space-x-reverse" : ""
                    }`}
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src={`/placeholder.svg?height=32&width=32&query=${message.isAdmin ? "admin" : "user"}`}
                      />
                      <AvatarFallback>{message.isAdmin ? "A" : "U"}</AvatarFallback>
                    </Avatar>

                    <div
                      className={`rounded-lg p-3 ${
                        message.senderId === user?.id ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      <p className="text-sm">{message.message}</p>
                      <p
                        className={`text-xs mt-1 ${message.senderId === user?.id ? "text-blue-100" : "text-gray-500"}`}
                      >
                        {new Date(message.timestamp).toLocaleTimeString("th-TH", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs lg:max-w-md">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" />
                      <AvatarFallback>A</AvatarFallback>
                    </Avatar>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Message Input */}
            <div className="border-t p-4">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>

                <div className="flex-1 relative">
                  <Input
                    placeholder="พิมพ์ข้อความ..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="pr-12"
                  />
                  <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 transform -translate-y-1/2">
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>

                <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold mb-2">คำถามที่พบบ่อย</h3>
                <p className="text-sm text-gray-600">ดูคำตอบสำหรับคำถามยอดนิยม</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold mb-2">คู่มือการใช้งาน</h3>
                <p className="text-sm text-gray-600">เรียนรู้วิธีใช้งานระบบ</p>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-4 text-center">
                <h3 className="font-semibold mb-2">ติดต่อโทรศัพท์</h3>
                <p className="text-sm text-gray-600">02-123-4567</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
