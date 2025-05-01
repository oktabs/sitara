// src/pages/api/profile/index.js
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";
import Cors from "cors";
import initMiddleware from "@/lib/middleware";

const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

const JWT_SECRET = process.env.JWT_SECRET;

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Profile Fetch Error:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
