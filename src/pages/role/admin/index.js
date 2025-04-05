import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      try {
        const decoded = jwtDecode(token);
        const userRole = decoded?.role;
        if (userRole !== "admin") {
          router.push("/");
        }
      } catch (error) {
        console.error("Invalid token:", error);
        router.push("/");
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Welcome, Admin</h1>
        <p className="text-gray-600 mb-6">This is the Admin Dashboard</p>
        
        <div className="space-y-4">
          {/* Contoh tampilan form atau info */}
          <div className="bg-gray-50 p-4 rounded-lg border">
            <p className="text-sm text-gray-500">Form Area (opsional)</p>
            <input
              type="text"
              placeholder="Contoh input nama"
              className="w-full mt-2 p-2 border rounded-md"
            />
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
