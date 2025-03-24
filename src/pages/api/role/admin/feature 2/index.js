import connectDB from "../../../../../lib/mongodb";
import Material from "../../../../../models/materialModel";

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const materials = await Material.find();
        res.status(200).json({ success: true, data: materials });
      } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil data material", error: error.message });
      }
      break;

    case "POST":
      try {
        const { nama, harga_per_ton, stok, deskripsi, gambar_url } = req.body;
        if (!nama || !harga_per_ton || stok === undefined) {
          return res.status(400).json({ success: false, message: "Nama, harga, dan stok wajib diisi" });
        }

        const newMaterial = new Material({ nama, harga_per_ton, stok, deskripsi, gambar_url });
        await newMaterial.save();

        res.status(201).json({ success: true, message: "Material berhasil ditambahkan", data: newMaterial });
      } catch (error) {
        res.status(500).json({ success: false, message: "Gagal menambahkan material", error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }
}
