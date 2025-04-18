// src/pages/api/proyek/[id].js
import connectDB from "@/lib/mongodb";
import Proyek from "@/models/Proyek";

export default async function handler(req, res) {
  await connectDB();
  const { id } = req.query;

  switch (req.method) {
    case "GET":
      try {
        const proyek = await Proyek.findById(id);
        if (!proyek)
          return res.status(404).json({ error: "Project not found" });
        res.status(200).json(proyek);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch project" });
      }
      break;

    case "PUT":
      try {
        const updatedProyek = await Proyek.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!updatedProyek)
          return res.status(404).json({ error: "Project not found" });
        res.status(200).json(updatedProyek);
      } catch (error) {
        res.status(400).json({ error: "Failed to update project" });
      }
      break;

    case "DELETE":
      try {
        const deletedProyek = await Proyek.findByIdAndDelete(id);
        if (!deletedProyek)
          return res.status(404).json({ error: "Project not found" });
        res.status(200).json({ message: "Project deleted successfully" });
      } catch (error) {
        res.status(500).json({ error: "Failed to delete project" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
