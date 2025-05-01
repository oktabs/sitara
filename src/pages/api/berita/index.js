// src/pages/api/berita/index.js
import connectDB from "@/lib/mongodb";
import Berita from "@/models/Berita";
import Cors from "cors";
import initMiddleware from "@/lib/middleware";

const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  if (req.method === "POST") {
    try {
      const { judul, isi, foto } = req.body;

      if (!judul || !isi) {
        return res.status(400).json({ error: "Judul dan isi harus diisi" });
      }

      const berita = await Berita.create({ judul, isi, foto });
      return res.status(201).json(berita);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    try {
      const beritas = await Berita.find().sort({ tanggal_dibuat: -1 });
      return res.status(200).json(beritas);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else {
    return res.status(405).json({ error: "Method not allowed" });
  }
}
