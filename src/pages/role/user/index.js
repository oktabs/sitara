import { useEffect } from "react";
import { useRouter } from "next/router";
import { jwtDecode } from "jwt-decode"; 

const UserPage = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/"); // Jika tidak ada token, arahkan ke halaman utama
    } else {
      const userRole = jwtDecode(token).role; // Decode token untuk memeriksa role
      if (userRole !== "user") {
        router.push("/"); // Jika bukan user, arahkan ke halaman utama
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); // Menghapus token dari localStorage
    router.push("/"); // Arahkan kembali ke halaman utama
  };

  return (
    <div className="text-black">
      <h1>Welcome User</h1>
      <p>This is the User Dashboard</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;
