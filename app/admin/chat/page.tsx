"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { db, type User } from "@/lib/database"
import ChatSidebar, { type ChatRoom } from "@/components/admin/chat/ChatSidebar"
import ChatWindow, { type ChatMessage } from "@/components/admin/chat/ChatWindow"
import CustomerProfile from "@/components/admin/chat/CustomerProfile"

export default function AdminChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([])
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [newMessage, setNewMessage] = useState("")
  const [customers, setCustomers] = useState<User[]>([])
  const [adminUser, setAdminUser] = useState<User | null>(null)
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
      setCustomers(usersData.filter((u) => u.role === "customer"))
      setAdminUser(usersData.find((u) => u.role === "admin") || null)

      // Create chat rooms from messages
      const customersOnly = usersData.filter((u) => u.role === "customer")
      const rooms: ChatRoom[] = customersOnly.map((customer) => {
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
    if (!newMessage.trim() || !selectedRoom || !adminUser) return

    const message = {
      senderId: adminUser.id,
      senderName: adminUser.name,
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

  const getSelectedCustomer = () => {
    return customers.find((c) => c.id === selectedRoom)
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
          <Link href="/admin/dashboard">
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
          <ChatSidebar
            chatRooms={chatRooms}
            selectedRoom={selectedRoom}
            onSelectRoom={setSelectedRoom}
          />
          <ChatWindow
            roomInfo={getSelectedRoomInfo()}
            messages={getSelectedRoomMessages()}
            newMessage={newMessage}
            onNewMessageChange={setNewMessage}
            onSendMessage={sendMessage}
            messagesEndRef={messagesEndRef}
          />
          <CustomerProfile customer={getSelectedCustomer()} />
        </div>
      </div>
    </div>
  )
}
