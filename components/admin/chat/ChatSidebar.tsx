"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { MessageCircle } from "lucide-react"

export interface ChatRoom {
  customerId: string
  customerName: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
}

interface ChatSidebarProps {
  chatRooms: ChatRoom[]
  selectedRoom: string | null
  onSelectRoom: (roomId: string) => void
}

export default function ChatSidebar({ chatRooms, selectedRoom, onSelectRoom }: ChatSidebarProps) {
  return (
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
                onClick={() => onSelectRoom(room.customerId)}
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
                        <span className="text-xs opacity-70">
                          {room.isOnline ? "ออนไลน์" : "ออฟไลน์"}
                        </span>
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
  )
}

