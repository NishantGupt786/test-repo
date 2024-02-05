"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Submitting login data", formData);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Login data submitted successfully");
      } else {
        console.error("Failed to submit login data");
      }
    } catch (error) {
      console.error("Error submitting login data", error);
    }
  };

  const handleGetRequest = async () => {
    try {
      const response = await fetch("/api/data");

      if (response.ok) {
        const data = await response.json();
        console.log("Data retrieved:", data);
      } else {
        console.error("Failed to retrieve data");
      }
    } catch (error) {
      console.error("Error retrieving data", error);
    }
  };

  return (
    <>
      <div>
        <h1>Login</h1>
        <form onSubmit={handleLoginSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="text-black"
            value={formData.name}
            onChange={handleInputChange}
          />

          <br />
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="text-black"
            value={formData.password}
            onChange={handleInputChange}
          />

          <br />
          <button type="submit">Submit</button>
        </form>
        <button onClick={handleGetRequest}>Fetch Data</button>
      </div>
    </>
  );
}
