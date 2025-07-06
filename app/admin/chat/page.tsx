"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, Send, MessageCircle, Clock } from "lucide-react"
import Link from "next/link"
import { db } from "@/lib/database"

interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  type: "text" | "image" | "file"
  isAdmin: boolean
}

interface ChatRoom {
  customerId: string
  customerName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
}

export default function AdminChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    loadChatData()
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const loadChatData = async () => {
    try {
      const [messagesData, usersData] = await Promise.all([db.getChatMessages(), db.getUsers()])

      setMessages(messagesData)

      // Create chat rooms from messages
      const customers = usersData.filter((u) => u.role === "customer")
      const rooms: ChatRoom[] = customers.map((customer) => {
        const customerMessages = messagesData.filter((m) => m.senderId === customer.id)
        const lastMessage = customerMessages[customerMessages.length - 1]
        const unreadMessages = customerMessages.filter((m) => !m.isAdmin && !m.read)

        return {
          customerId: customer.id,
          customerName: customer.name,
          lastMessage: lastMessage?.message || "ยังไม่มีข้อความ",
          lastMessageTime: lastMessage?.timestamp || "",
          unreadCount: unreadMessages.length,
          isOnline: Math.random() > 0.5, // Mock online status
        }
      })

      setChatRooms(rooms)
    } catch (error) {
      console.error("Error loading chat data:", error)
    } finally {
      setLoading(false)
    }
  }

  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedRoom || !user) return

    const message = {
      senderId: user.id,
      senderName: user.name,
      message: newMessage,
      type: "text" as const,
      isAdmin: true,
    }

    try {
      const savedMessage = await db.createChatMessage(message)
      setMessages((prev) => [...prev, savedMessage])
      setNewMessage("")

      // Update chat room
      setChatRooms((prev) =>
        prev.map((room) =>
          room.customerId === selectedRoom
            ? { ...room, lastMessage: newMessage, lastMessageTime: savedMessage.timestamp }
            : room,
        ),
      )
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  const getSelectedRoomMessages = () => {
    if (!selectedRoom) return []
    return messages
      .filter((m) => m.senderId === selectedRoom || (m.isAdmin && selectedRoom))
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
  }

  const getSelectedRoomInfo = () => {
    return chatRooms.find((room) => room.customerId === selectedRoom)
  }


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>กำลังโหลดข้อความ...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <Link href="/admin">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">ระบบแชท</h1>
            <p className="text-gray-600">ตอบกลับข้อความจากลูกค้า</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Chat Rooms List */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageCircle className="h-5 w-5" />
                <span>ห้องแชท ({chatRooms.length})</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[500px]">
                <div className="space-y-2 p-4">
                  {chatRooms.map((room) => (
                    <div
                      key={room.customerId}
                      onClick={() => setSelectedRoom(room.customerId)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedRoom === room.customerId
                          ? "bg-primary text-primary-foreground"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {room.customerName.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-sm">{room.customerName}</p>
                            <div className="flex items-center space-x-1">
                              <div
                                className={`w-2 h-2 rounded-full ${room.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                              />
                              <span className="text-xs opacity-70">{room.isOnline ? "ออนไลน์" : "ออฟไลน์"}</span>
                            </div>
                          </div>
                        </div>
                        {room.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {room.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs opacity-70 line-clamp-2">{room.lastMessage}</p>
                      {room.lastMessageTime && (
                        <p className="text-xs opacity-50 mt-1">
                          {new Date(room.lastMessageTime).toLocaleString("th-TH")}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <Card className="lg:col-span-3">
            {selectedRoom ? (
              <>
                <CardHeader className="border-b">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{getSelectedRoomInfo()?.customerName.charAt(0).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{getSelectedRoomInfo()?.customerName}</CardTitle>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div
                          className={`w-2 h-2 rounded-full ${getSelectedRoomInfo()?.isOnline ? "bg-green-500" : "bg-gray-400"}`}
                        />
                        <span>{getSelectedRoomInfo()?.isOnline ? "ออนไลน์" : "ออฟไลน์"}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[400px] p-4">
                    <div className="space-y-4">
                      {getSelectedRoomMessages().map((message) => (
                        <div key={message.id} className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}>
                          <div className={`max-w-[70%] ${message.isAdmin ? "order-2" : "order-1"}`}>
                            <div
                              className={`p-3 rounded-lg ${
                                message.isAdmin ? "bg-primary text-primary-foreground" : "bg-gray-100 text-gray-900"
                              }`}
                            >
                              <p className="text-sm">{message.message}</p>
                            </div>
                            <div
                              className={`flex items-center space-x-2 mt-1 text-xs text-gray-500 ${
                                message.isAdmin ? "justify-end" : "justify-start"
                              }`}
                            >
                              <span>{message.senderName}</span>
                              <Clock className="h-3 w-3" />
                              <span>{new Date(message.timestamp).toLocaleString("th-TH")}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  <div className="border-t p-4">
                    <div className="flex space-x-2">
                      <Input
                        placeholder="พิมพ์ข้อความ..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                        className="flex-1"
                      />
                      <Button onClick={sendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center text-gray-500">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>เลือกห้องแชทเพื่อเริ่มการสนทนา</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </div>
  )
}
