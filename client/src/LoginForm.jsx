import React, { useState } from "react";


const LoginForm = ({ toggleView }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("accessToken", data.accessToken);
        window.location.href = "http://localhost:5001/";
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error(error);
      // display error message to user
    }
  };

  return (
    <div>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don't have an account yet?{" "}
        <button onClick={toggleView}>Register here</button>
      </p>
    </div>
  );
};

export default LoginForm;
