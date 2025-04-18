import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { TabRegister } from "@/components/global/TabRegister";
import Link from "next/link";

const UserRegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Semua field wajib diisi.");
      return;
    }

    try {
      await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });

      router.push("/auth/login/user");
    } catch (error) {
      setError("Registrasi gagal. Silakan coba lagi.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-green-100 flex items-center justify-center px-4">
      <div className="w-full max-w-6xl bg-white shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        {/* Left Side with Image */}
        <div className="hidden md:flex items-center justify-center bg-green-600">
          <img
            src="/pasar.png"
            alt="Pasar"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Side Form */}
        <div className="p-10 md:p-14">
          <TabRegister />
          <h2 className="text-3xl font-extrabold text-center mb-6 text-gray-800">
            Daftar Sebagai Pengguna
          </h2>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Nama Lengkap
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
            >
              Daftar
            </button>

            <p className="text-center text-sm mt-3 text-gray-600">
              Sudah punya akun?{" "}
              <Link
                href="/auth/login/user"
                className="text-green-600 hover:underline font-medium"
              >
                Login di sini
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
