'use client'
import { useState } from "react";
import GroupPage from "./GroupPage";

export default function CreateGroupButton() {
    const [showGroupPage, setShowGroupPage] = useState(false);

    function onClick() {
        console.log("Create Group Button Clicked");
        setShowGroupPage(true);  // Show GroupPage when button is clicked
    }

    return (
        <div className="flex justify-center flex-col items-center">
            <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={onClick}
            >
                Create Group
            </button>

            {showGroupPage && <GroupPage />} {/* Conditionally render GroupPage */}
        </div>
    );
}
