import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; 

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Jika tidak ada token, arahkan ke halaman utama
    } else {
      const userRole = jwtDecode(token).role; // Decode token untuk memeriksa role
      if (userRole !== "admin") {
        router.push("/"); // Jika bukan admin, arahkan ke halaman utama
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Menghapus token dari localStorage
    router.push("/"); // Arahkan kembali ke halaman utama
  };

  return (
    <div className="text-black">
      <h1>Welcome Admin</h1>
      <p>This is the Admin Dashboard</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default AdminPage;