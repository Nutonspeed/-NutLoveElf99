"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/inputs/input";
import { Button } from "@/components/ui/buttons/button";
import {
  loadGeneralSettings,
  generalSettings,
  setGeneralSettings,
} from "@/lib/mock-general-settings";

export default function GeneralSettingsPage() {
  const [name, setName] = useState(generalSettings.storeName);
  const [logo, setLogo] = useState(generalSettings.logoUrl);
  const [lang, setLang] = useState(generalSettings.language);

  useEffect(() => {
    loadGeneralSettings();
    setName(generalSettings.storeName);
    setLogo(generalSettings.logoUrl);
    setLang(generalSettings.language);
  }, []);

  const handleSave = () => {
    try {
      setGeneralSettings({ storeName: name, logoUrl: logo, language: lang });
      alert("บันทึกแล้ว");
    } catch (err) {
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="container mx-auto space-y-4 py-8">
      <h1 className="text-2xl font-bold">ตั้งค่าทั่วไป</h1>
      <Input
        placeholder="ชื่อร้าน"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="โลโก้ URL"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
      />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="w-full rounded border p-2"
      >
        <option value="th">ไทย</option>
        <option value="en">English</option>
      </select>
      <Button onClick={handleSave}>บันทึก</Button>
    </div>
  );
}
