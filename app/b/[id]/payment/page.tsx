export default function PaymentForm() {
  return (
    <div>
      <h1>แจ้งการโอน</h1>
      <input type="date" placeholder="วันที่โอน" />
      <input type="number" placeholder="จำนวนเงิน" />
      <input type="file" />
      <button>ยืนยัน (mock)</button>
    </div>
  )
}
