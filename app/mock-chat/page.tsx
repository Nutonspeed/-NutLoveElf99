"use client"

import { useEffect, useRef, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { chatWelcome, loadChatWelcome } from "@/lib/mock-chat";
import {
  addChatMessage,
  listChatMessages,
  searchChatMessages,
  type ChatMessageEntry,
} from "@/lib/mock-chat-messages";

export default function MockChatPage() {
  const [messages, setMessages] = useState<ChatMessageEntry[]>([]);
  const [search, setSearch] = useState("");
  const refs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    loadChatWelcome();
    // seed sample messages
    addChatMessage("demo", "bill_created");
    addChatMessage("demo", "status_paid");
    setMessages([
      {
        id: "welcome",
        conversationId: "demo",
        templateId: "welcome",
        text: chatWelcome,
        createdAt: new Date().toISOString(),
      },
      ...listChatMessages("demo"),
    ]);
  }, []);

  const results = search
    ? searchChatMessages("demo", search)
    : [];

  const scrollToMessage = (id: string) => {
    const el = refs.current[id];
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 max-w-xl mx-auto w-full p-4 space-y-4">
        <input
          className="border rounded px-3 py-2 w-full"
          placeholder="ค้นหาในแชท"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <div className="bg-white border rounded p-2 space-y-1">
            {results.length ? (
              results.map((r) => (
                <button
                  key={r.id}
                  onClick={() => scrollToMessage(r.id)}
                  className="text-left w-full hover:bg-gray-100 p-1 rounded"
                >
                  {r.text}
                </button>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                ไม่พบข้อความที่ตรงกับคำค้น
              </p>
            )}
          </div>
        )}
        <div className="space-y-2">
          {messages.map((m) => (
            <div
              key={m.id}
              ref={(el) => (refs.current[m.id] = el)}
              className="border p-2 rounded"
            >
              {m.text}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
