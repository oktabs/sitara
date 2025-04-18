// src/pages/api/berita/[id].js
import connectDB from "@/lib/mongodb";
import Berita from "@/models/Berita";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  if (req.method === "GET") {
    try {
      const berita = await Berita.findById(id);

      if (!berita) {
        return res.status(404).json({ error: "Berita tidak ditemukan" });
      }

      return res.status(200).json(berita);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const { judul, isi, foto } = req.body;

      if (!judul || !isi) {
        return res.status(400).json({ error: "Judul dan isi harus diisi" });
      }

      const updatedBerita = await Berita.findByIdAndUpdate(
        id,
        { judul, isi, foto },
        { new: true, runValidators: true },
      );

      if (!updatedBerita) {
        return res.status(404).json({ error: "Berita tidak ditemukan" });
      }

      return res.status(200).json(updatedBerita);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const deletedBerita = await Berita.findByIdAndDelete(id);

      if (!deletedBerita) {
        return res.status(404).json({ error: "Berita tidak ditemukan" });
      }

      return res.status(200).json({ message: "Berita berhasil dihapus" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
