"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
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
import {
  loadConversations,
  setConversationNote,
  addCallLog,
  addTag,
  getConversation,
} from "@/lib/mock-conversations";
import { useAuth } from "@/contexts/auth-context";
import { useParams, useRouter } from "next/navigation";

export default function ChatPage() {
  const { user, guestId } = useAuth();
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000";
  const [message, setMessage] = useState(chatWelcome);
  const [showError, setShowError] = useState(false);
  const [noteModal, setNoteModal] = useState(false);
  const [noteInput, setNoteInput] = useState("");
  const [aiSuggest, setAiSuggest] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const router = useRouter();
  const convoId = user?.id || guestId!;

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
    loadConversations();
  }, [chatwootUrl]);

  const conversation = getConversation(convoId);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 relative">
        <iframe
          ref={iframeRef}
          src={chatwootUrl}
          className="w-full h-full border-none"
          onError={() => setShowError(true)}
        />
        <div className="absolute top-2 left-2 space-x-2">
          {conversation && (
            <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
              {conversation.isNew ? 'ลูกค้าใหม่' : 'ลูกค้าซ้ำ'}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setNoteModal(true)}
          >
            บันทึกโน้ตลูกค้า
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAiSuggest('แนะนำบิลตัวอย่าง')}
          >
            แนะนำบิลที่ควรส่ง
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/chat/history/${convoId}`)}
          >
            ย้อนดูบิลทั้งหมด
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              addCallLog(convoId)
              alert('บันทึกการโทรกลับแล้ว')
            }}
          >
            โทรกลับลูกค้า
          </Button>
        </div>
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
      <Dialog open={noteModal} onOpenChange={setNoteModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>บันทึกโน้ตลูกค้า</DialogTitle>
          </DialogHeader>
          <textarea
            className="w-full border p-2 rounded"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
          />
          <DialogFooter>
            <Button
              onClick={() => {
                setConversationNote(convoId, noteInput)
                setNoteModal(false)
                setNoteInput('')
              }}
            >
              บันทึก
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={!!aiSuggest} onOpenChange={() => setAiSuggest(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>AI Suggestion</DialogTitle>
          </DialogHeader>
          <p>{aiSuggest}</p>
          <DialogFooter>
            <Button onClick={() => setAiSuggest(null)}>ปิด</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
