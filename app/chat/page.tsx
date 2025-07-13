"use client"

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { chatWelcome, loadChatWelcome } from "@/lib/mock-chat";
import {
  addChatActivity,
  loadChatActivity,
} from "@/lib/mock-chat-activity";
import { useAuth } from "@/contexts/auth-context";

export default function ChatPage() {
  const { user, guestId } = useAuth();
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000";
  const [message, setMessage] = useState(chatWelcome);

  useEffect(() => {
    loadChatWelcome();
    setMessage(chatWelcome);
    window.open(chatwootUrl, "_blank");
    loadChatActivity();
    addChatActivity(user?.id || guestId!, "open_chat");
  }, [chatwootUrl]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center">
        <p>{message}</p>
      </div>
      <Footer />
    </div>
  );
}
