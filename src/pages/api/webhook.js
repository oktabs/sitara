import connectDB from "../../lib/mongodb";
import Order from "../../models/ordersMaterial";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
    await connectDB();

    const { order_id, transaction_status } = req.body;

    if (!order_id || !transaction_status) {
      return res.status(400).json({ success: false, message: "Invalid payload" });
    }

    // Cek apakah status transaksi adalah "settlement" (dibayar)
    if (transaction_status === "settlement") {
      const order = await Order.findOne({ _id: order_id });

      if (!order) {
        return res.status(404).json({ success: false, message: "Order not found" });
      }

      order.status = "dibayar";
      await order.save();

      return res.status(200).json({ success: true, message: "Order updated successfully" });
    }

    return res.status(200).json({ success: true, message: "Webhook received, no action taken" });
  } catch (error) {
    console.error("Webhook Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
