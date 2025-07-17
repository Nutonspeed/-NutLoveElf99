"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { loadChatWelcome } from "@/lib/mock-chat";
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
import {
  chatTemplates,
  loadChatTemplates,
  type ChatTemplate,
} from "@/lib/mock-chat-templates";
import { getProducts } from "@/lib/mock-products";
import type { Product } from "@/types/product";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function ChatPage() {
  const { user, guestId } = useAuth();
  const chatwootUrl =
    process.env.NEXT_PUBLIC_CHATWOOT_URL || "http://localhost:3000";
  const [showError, setShowError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [templates, setTemplates] = useState<ChatTemplate[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [productOpen, setProductOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const insertOrCopy = (text: string) => {
    try {
      const textarea = iframeRef.current?.contentDocument?.querySelector(
        "textarea"
      ) as HTMLTextAreaElement | null;
      if (textarea) {
        textarea.value = text;
        textarea.dispatchEvent(new Event("input", { bubbles: true }));
        textarea.focus();
        return;
      }
    } catch (_) {
      // ignore cross origin errors
    }
    navigator.clipboard.writeText(text);
    alert("คัดลอกข้อความแล้ว กรุณาวางในช่องแชท");
  };

  const handleTemplate = (id: string) => {
    const t = templates.find((tmp) => tmp.id === id);
    if (t) insertOrCopy(t.text);
  };

  const handleSendProduct = () => {
    const p = products.find((pr) => pr.id === selectedProduct);
    if (p) {
      insertOrCopy(`สนใจสินค้าเสริม ${p.name} ราคา ฿${p.price}`);
    }
    setProductOpen(false);
    setSelectedProduct(null);
  };

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
    loadChatActivity();
    addChatActivity(user?.id || guestId!, "open_chat");
    loadChatTemplates();
    setTemplates([...chatTemplates]);
    getProducts().then(setProducts);
  }, [chatwootUrl]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="p-4 flex gap-2 items-center">
        <Select onValueChange={handleTemplate}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="เลือกข้อความ" />
          </SelectTrigger>
          <SelectContent>
            {templates.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={() => setProductOpen(true)}>แนบสินค้าเสริม</Button>
      </div>
      <div className="flex-1">
        <iframe
          ref={iframeRef}
          src={chatwootUrl}
          className="w-full h-full border-none"
          onError={() => setShowError(true)}
        />
      </div>
      <Footer />
      <Dialog open={productOpen} onOpenChange={setProductOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>เลือกสินค้าเสริม</DialogTitle>
          </DialogHeader>
          <RadioGroup
            value={selectedProduct || undefined}
            onValueChange={setSelectedProduct}
            className="space-y-2 max-h-[60vh] overflow-y-auto"
          >
            {products.map((p) => (
              <label key={p.id} className="flex items-center space-x-2">
                <RadioGroupItem value={p.id} />
                <span>{p.name}</span>
              </label>
            ))}
          </RadioGroup>
          <DialogFooter>
            <Button onClick={handleSendProduct} disabled={!selectedProduct}>
              ส่งข้อความ
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
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
