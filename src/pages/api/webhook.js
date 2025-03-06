import connectDB from "../../lib/mongodb";
import Invoice from "../../models/invoiceModel";
import Order from "../../models/ordersMaterial"; // ✅ Import model Order untuk mencari id_pengguna

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await connectDB();
    const data = req.body;

    // 🔥 Ambil ID pengguna dari Order berdasarkan order_id
    const order = await Order.findOne({ order_id: data.order_id });

    if (!order) {
      return res.status(404).json({ success: false, message: "Order tidak ditemukan" });
    }

    const id_pengguna = order.id_pengguna; // ✅ Ambil id_pengguna dari Order

    // 🔍 Cek apakah invoice sudah ada
    let invoice = await Invoice.findOne({ order_id: data.order_id });

    if (invoice) {
      // ✅ Jika invoice sudah ada, update statusnya
      invoice.transaction_status = data.transaction_status;
      invoice.settlement_time = data.settlement_time ? new Date(data.settlement_time) : invoice.settlement_time;
      invoice.fraud_status = data.fraud_status;

      await invoice.save();
      console.log("Invoice diperbarui:", invoice);

      return res.status(200).json({ success: true, message: "Status pembayaran diperbarui" });
    }

    // ✅ Jika invoice belum ada, buat baru
    invoice = new Invoice({
      id_pengguna, // ✅ Simpan ID Pengguna
      order_id: data.order_id,
      transaction_id: data.transaction_id,
      transaction_status: data.transaction_status,
      transaction_time: new Date(data.transaction_time),
      settlement_time: data.settlement_time ? new Date(data.settlement_time) : null,
      payment_type: data.payment_type,
      va_number: data.va_numbers?.[0]?.va_number || null,
      bank: data.va_numbers?.[0]?.bank || null,
      gross_amount: parseFloat(data.gross_amount),
      currency: data.currency,
      fraud_status: data.fraud_status,
      expiry_time: new Date(data.expiry_time),
    });

    await invoice.save();
    console.log("Invoice berhasil disimpan!", invoice);

    return res.status(200).json({ success: true, message: "Webhook diterima dan invoice disimpan" });
  } catch (error) {
    console.error("Error di webhook:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
}
