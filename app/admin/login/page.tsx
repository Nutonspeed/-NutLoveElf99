"use client"

export default function AdminLogin() {
  return (
    <div className="p-4">
      <h1>เข้าสู่ระบบ (mock)</h1>
      <input placeholder="ชื่อผู้ใช้" />
      <input placeholder="รหัสผ่าน" type="password" />
      <button onClick={() => localStorage.setItem('mock_user_role', 'admin')}>
        เข้าสู่ระบบ
      </button>
    </div>
  )
}
