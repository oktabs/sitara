import connectDB from "@/lib/mongodb";
import Project from "@/models/Project";
import cors from "@/middleware/cors";

export default async function handler(req, res) {
  await cors(req, res);

  await connectDB();

  if (req.method === "GET") {
    try {
      // Ambil semua proyek
      const projects = await Project.find({}, "news");

      // Gabungkan semua news jadi satu array
      const allNews = projects
        .flatMap((project) => project.news)
        .filter((news) => news && news.title) // Pastikan valid
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Urutkan terbaru

      res.status(200).json(allNews);
    } catch (error) {
      console.error("Failed to fetch news:", error);
      res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil berita" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
