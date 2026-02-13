import { useState } from "react";
import API from "../api/api";

export default function Login() {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleLogin = async () => {
    const res = await API.post("/user/login", { email, password });

    localStorage.setItem("token", res.data.token);
    alert("Logged in!");
  };

  return (
    <div>
      <h2>Login</h2>
      <input onChange={e=>setEmail(e.target.value)} placeholder="email" />
      <input type="password"
             onChange={e=>setPassword(e.target.value)}
             placeholder="password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
