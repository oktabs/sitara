// src/pages/api/auth/register.js
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connectDB from "@/lib/mongodb";
import Cors from "cors";
import initMiddleware from "@/lib/middleware";

const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["POST", "GET", "OPTIONS"],
    credentials: true,
  }),
);

const register = async (req, res) => {
  await cors(req, res);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  const allowedRoles = ["masyarakat", "kontraktor_desa", "admin_kecamatan"];
  const selectedRole = allowedRoles.includes(role) ? role : "masyarakat";

  try {
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: selectedRole,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export default register;
