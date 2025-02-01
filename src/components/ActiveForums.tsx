'use client'
import React, { useState, useEffect } from "react";

interface Forum {
  _id: number;
  title: string;
  description: string;
  maxSize: number;
  currentSize: number;
  startDate: string;
  endDate: string;
  languages: string[];
}

export default function ActiveForums() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await fetch("https://hack-gang-backend.vercel.app/");
        if (!response.ok) {
          throw new Error("Failed to fetch forums");
        }
        const data = await response.json();
        setForums(data); // Assuming the response is an array of forums
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchForums();
  }, []);

  if (loading) {
    return <p>Loading forums...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Active Hackathon Forums</h2>
      {forums.length === 0 ? (
        <p>No active forums available.</p>
      ) : (
        forums.map((forum) => (
          <div key={forum._id} className="border-b pb-4 mb-4">
            <h3 className="text-lg font-bold">{forum.title}</h3>
            <p>{forum.description}</p>
            <p>
              <strong>Participants:</strong> {forum.currentSize} / {forum.maxSize}
            </p>
            <p>
              <strong>Duration:</strong> {forum.startDate} - {forum.endDate}
            </p>
            <p>
              <strong>Languages:</strong> {forum.languages.join(", ")}
            </p>
            <button className="bg-blue-500 text-white py-1 px-2 rounded mt-2">
              Join Forum
            </button>
          </div>
        ))
      )}
    </div>
  );
}
