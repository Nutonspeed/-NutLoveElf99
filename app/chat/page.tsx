"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SmartReply } from "@/components/SmartReply";
import { chatWelcome, loadChatWelcome } from "@/lib/mock-chat";
import { Button } from "@/components/ui/buttons/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/modals/dialog";
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
  const [showError, setShowError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const handleReload = () => {
    if (iframeRef.current) {
      iframeRef.current.src = chatwootUrl;
    } else {
      window.location.reload();
    }
    setShowError(false);
  };

  useEffect(() => {
    loadChatWelcome();
    setMessage(chatWelcome);
    loadChatActivity();
    addChatActivity(user?.id || guestId!, "open_chat");
  }, [chatwootUrl]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          src={chatwootUrl}
          className="w-full h-full border-none"
          onError={() => setShowError(true)}
        />
      </div>
      <div className="container mx-auto px-4 py-8">
        <SmartReply />
      </div>
      <Footer />
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>เกิดข้อผิดพลาดในการโหลดแชท</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleReload}>reload</Button>
            <Button asChild variant="secondary">
              <Link
                href="https://facebook.com/example"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook page
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
