'use client'
import React, { useState } from "react";

export default function GroupPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [maxSize, setMaxSize] = useState(1);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [languages, setLanguages] = useState("");

  const createGroup = async () => {
    const groupData = {
      title,
      description,
      maxSize,
      startDate,
      endDate,
      languages: languages.split(",").map((lang) => lang.trim()),
    };
  
    try {
      const response = await fetch("https://hack-gang-backend.vercel.app/addGroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(groupData), // Send the group data in the request body
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log("Group created successfully:", result);
        // Optionally, reset form values or navigate to another page
      } else {
        console.error("Error creating group:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };
  

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Create Hackathon Group</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Max Group Size"
        value={maxSize}
        onChange={(e) => setMaxSize(Number(e.target.value))}
        className="w-full mb-2 p-2 border rounded"
        min="1"
      />
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Programming Languages (comma-separated)"
        value={languages}
        onChange={(e) => setLanguages(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />
     
      <button
        onClick={createGroup}
        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        Create Group
      </button>
    </div>
  );
}
