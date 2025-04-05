import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { TabLogin } from "@/components/global/TabLogin";
import Link from "next/link";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      router.push("/role/admin");
    } catch (error) {
      setError("Email atau password salah, atau terjadi kesalahan server.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
        <TabLogin />
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login Admin</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 mb-4 rounded-md text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition duration-200"
          >
            Login
          </button>

          <p className="text-center text-sm mt-3">
            Login sebagai{" "}
            <Link href="/auth/login/user" className="text-blue-600 hover:underline">
              User
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
