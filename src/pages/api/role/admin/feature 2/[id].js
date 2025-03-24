import connectDB from "../../../../../lib/mongodb";
import Material from "../../../../../models/materialModel";
import { Types } from "mongoose";

export default async function handler(req, res) {
  await connectDB();

  const { id } = req.query;
  if (!Types.ObjectId.isValid(id)) {
    return res.status(400).json({ success: false, message: "ID tidak valid" });
  }

  switch (req.method) {
    case "GET":
      try {
        const material = await Material.findById(id);
        if (!material) {
          return res.status(404).json({ success: false, message: "Material tidak ditemukan" });
        }
        res.status(200).json({ success: true, data: material });
      } catch (error) {
        res.status(500).json({ success: false, message: "Gagal mengambil data", error: error.message });
      }
      break;

    case "PUT":
      try {
        const { nama, harga_per_ton, stok, deskripsi, gambar_url } = req.body;
        const updatedMaterial = await Material.findByIdAndUpdate(
          id,
          { nama, harga_per_ton, stok, deskripsi, gambar_url },
          { new: true, runValidators: true }
        );

        if (!updatedMaterial) {
          return res.status(404).json({ success: false, message: "Material tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Material diperbarui", data: updatedMaterial });
      } catch (error) {
        res.status(500).json({ success: false, message: "Gagal memperbarui material", error: error.message });
      }
      break;

    case "DELETE":
      try {
        const deletedMaterial = await Material.findByIdAndDelete(id);
        if (!deletedMaterial) {
          return res.status(404).json({ success: false, message: "Material tidak ditemukan" });
        }

        res.status(200).json({ success: true, message: "Material dihapus" });
      } catch (error) {
        res.status(500).json({ success: false, message: "Gagal menghapus material", error: error.message });
      }
      break;

    default:
      res.status(405).json({ success: false, message: "Metode tidak diizinkan" });
  }
}
