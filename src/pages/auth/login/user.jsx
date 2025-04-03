import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { TabLogin } from "@/components/global/TabLogin";

const UserLoginPage = () => {
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
      router.push("/dashboard"); // Redirect to user dashboard after login
    } catch (error) {
      setError("Invalid credentials or server error.");
    }
  };

  return (
    <div className="text-black mt-28">
      <TabLogin />
      <h2>Login as User</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default UserLoginPage;