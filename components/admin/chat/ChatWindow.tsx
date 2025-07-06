"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Send, Clock } from "lucide-react"
import type { RefObject } from "react"
import type { ChatRoom } from "./ChatSidebar"

export interface ChatMessage {
  id: string
  senderId: string
  senderName: string
  message: string
  timestamp: string
  type: "text" | "image" | "file"
  isAdmin: boolean
}

interface ChatWindowProps {
  roomInfo?: ChatRoom
  messages: ChatMessage[]
  newMessage: string
  onNewMessageChange: (value: string) => void
  onSendMessage: () => void
  messagesEndRef: RefObject<HTMLDivElement>
}

export default function ChatWindow({
  roomInfo,
  messages,
  newMessage,
  onNewMessageChange,
  onSendMessage,
  messagesEndRef,
}: ChatWindowProps) {
  if (!roomInfo) {
    return (
      <Card className="lg:col-span-2 flex items-center justify-center">
        <CardContent className="text-center text-gray-500">
          <Send className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p>เลือกห้องแชทเพื่อเริ่มการสนทนา</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="lg:col-span-2 flex flex-col">
      <CardHeader className="border-b">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarFallback>
              {roomInfo.customerName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{roomInfo.customerName}</CardTitle>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <div
                className={`w-2 h-2 rounded-full ${roomInfo.isOnline ? "bg-green-500" : "bg-gray-400"}`}
              />
              <span>{roomInfo.isOnline ? "ออนไลน์" : "ออฟไลน์"}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col">
        <ScrollArea className="h-[400px] p-4 flex-1">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isAdmin ? "justify-end" : "justify-start"}`}
              >
                <div className={`max-w-[70%] ${message.isAdmin ? "order-2" : "order-1"}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.isAdmin
                        ? "bg-primary text-primary-foreground"
                        : "bg-gray-100 text-gray-900"
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
              onChange={(e) => onNewMessageChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && onSendMessage()}
              className="flex-1"
            />
            <Button onClick={onSendMessage} disabled={!newMessage.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

