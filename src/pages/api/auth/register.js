// src/pages/api/auth/register.js
import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import cors from "@/middleware/cors";

export default async function handler(req, res) {
  await cors(req, res);
  await connectDB();

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Metode tidak diizinkan" });
  }

  const { nama, email, password, role } = req.body;

  if (!email || !password || !nama) {
    return res.status(400).json({ message: "Semua field wajib diisi" });
  }

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ message: "Email sudah terdaftar" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      nama,
      email,
      passwordHash,
      role: role || "masyarakat",
    });

    res.status(201).json({
      message: "Registrasi berhasil",
      user: {
        id: newUser._id,
        nama: newUser.nama,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan saat registrasi", error });
  }
}
