import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer'
import type { BillData } from '@/lib/hooks/useBillData'
import { getStoreProfile } from '@/core/mock/store'

const styles = StyleSheet.create({
  page: { padding: 24, fontSize: 12, fontFamily: 'Helvetica' },
  header: { flexDirection: 'row', marginBottom: 16 },
  logo: { width: 48, height: 48, marginRight: 12 },
  table: { width: '100%', borderWidth: 1, borderColor: '#e5e5e5' },
  row: { flexDirection: 'row' },
  cell: { flex: 1, padding: 4, borderRightWidth: 1, borderColor: '#e5e5e5' },
  footer: { marginTop: 24, textAlign: 'center', fontSize: 10 },
  watermark: { position: 'absolute', top: '40%', left: '25%', fontSize: 60, color: '#e5e5e5', transform: 'rotate(-20deg)' },
})

export async function generateReceiptPDF(bill: BillData, options?: { mock?: boolean; qr?: string }) {
  const subtotal = bill.items.reduce((s, it) => s + it.price * it.quantity, 0)
  const total = subtotal - (bill.discount || 0) + (bill.shipping || 0)
  const company = getStoreProfile()
  const doc = (
    <Document>
      <Page size="A4" style={styles.page}>
        {options?.mock && <Text style={styles.watermark}>ตัวอย่าง</Text>}
        <View style={styles.header}>
          {company.logoUrl && <Image src={company.logoUrl} style={styles.logo} />}
          <View>
            <Text>{company.storeName}</Text>
            <Text>{company.address}</Text>
            <Text>{company.phoneNumber}</Text>
          </View>
        </View>
        <Text>บิลเลขที่ {bill.id}</Text>
        <Text>วันที่ {new Date().toLocaleDateString()}</Text>
        <Text>ลูกค้า {bill.customer.name}</Text>
        <Text>{bill.customer.address}</Text>
        <Text>โทร {bill.customer.phone}</Text>

        <View style={[styles.table, { marginTop: 12 }]}>
          <View style={[styles.row, { backgroundColor: '#f5f5f5' }]}>
            <Text style={styles.cell}>สินค้า</Text>
            <Text style={styles.cell}>จำนวน</Text>
            <Text style={styles.cell}>ราคาต่อหน่วย</Text>
            <Text style={styles.cell}>รวม</Text>
          </View>
          {bill.items.map((it, i) => (
            <View key={i} style={styles.row}>
              <Text style={styles.cell}>{it.name}</Text>
              <Text style={styles.cell}>{it.quantity}</Text>
              <Text style={styles.cell}>{it.price.toLocaleString()}</Text>
              <Text style={styles.cell}>{(it.price * it.quantity).toLocaleString()}</Text>
            </View>
          ))}
        </View>

        <View style={{ marginTop: 12 }}>
          <Text>ส่วนลด: {bill.discount ? `-฿${bill.discount.toLocaleString()}` : '-'}</Text>
          <Text>ค่าจัดส่ง: ฿{(bill.shipping || 0).toLocaleString()}</Text>
          <Text>รวมทั้งสิ้น: ฿{total.toLocaleString()}</Text>
          <Text>ภาษีมูลค่าเพิ่ม (7%): ฿{Math.round(total * 0.07).toLocaleString()}</Text>
        </View>

        {options?.qr && (
          <View style={{ position: 'absolute', bottom: 40, right: 40 }}>
            <Image src={options.qr} style={{ width: 80, height: 80 }} />
          </View>
        )}

        <Text style={styles.footer}>เอกสารออกโดยระบบ</Text>
      </Page>
    </Document>
  )

  const blob = await (await import('@react-pdf/renderer')).pdf(doc).toBlob()
  return blob
}
