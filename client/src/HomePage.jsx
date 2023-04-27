import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      window.location.href = "http://localhost:5001/login";
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/users/me", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const data = await response.json();
        setName(data.name);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "http://localhost:5001/login";
  };

  return (
    <div>
      <h1>Hello, {name}!</h1>
      <button type="button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default HomePage;
