// src/pages/api/proyek/index.js
import connectDB from "@/lib/mongodb";
import Proyek from "@/models/Proyek";

export default async function handler(req, res) {
  await connectDB();

  switch (req.method) {
    case "GET":
      try {
        const proyeks = await Proyek.find({}).sort({ created_at: -1 });
        res.status(200).json(proyeks);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch projects" });
      }
      break;

    case "POST":
      try {
        const newProyek = new Proyek(req.body);
        const savedProyek = await newProyek.save();
        res.status(201).json(savedProyek);
      } catch (error) {
        res.status(400).json({ error: "Failed to create project" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
