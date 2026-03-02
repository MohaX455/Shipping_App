"use client";

import { useState } from "react";
import Image from "next/image";
import { Trip } from "./SwitchForms";
import { IMAGE_BASE } from "@/lib/constants";

type Props = {
  onSwitch: (view: "password" | "upcoming") => void;
  onAdd?: (trip: Trip) => void;
};

export default function UpcomingForm({ onSwitch, onAdd }: Props) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onAdd) {
      onAdd({ from, to, date });
    }
    setFrom("");
    setTo("");
    setDate("");
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">

      {/* Sidebar */}
      <aside className="w-full lg:w-1/3 bg-[var(--color-lightblue)] text-white flex flex-col items-center py-10 px-6">
        
        <div className="w-24 h-24 relative mb-4">
          <Image
            src={`${IMAGE_BASE}/male-user.png`}
            alt="User Avatar"
            fill
            className="object-contain"
          />
        </div>

        <button className="text-sm underline mb-2">
          Edit Avatar
        </button>

        <h2 className="text-lg font-semibold mb-10">example1</h2>

        <button
          onClick={() => onSwitch("password")}
          className="w-full bg-white py-3 rounded text-[var(--color-lightblue)] mb-3"
        >
          Change Password
        </button>

        <button
          onClick={() => onSwitch("upcoming")}
          className="w-full bg-[var(--color-gray)] text-black py-3 rounded"
        >
          upcoming list
        </button>

      </aside>

      {/* Main */}
      <main className="flex-1 p-6 bg-gray-100">
        <div className="max-w-2xl mx-auto bg-white shadow-md rounded p-8">

          <h1 className="text-2xl font-bold mb-6 text-center">
            From Where, To Where And When Do You Go
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block mb-1">From where</label>
              <input
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[var(--color-lightblue)]"
              />
            </div>

            <div>
              <label className="block mb-1">To where</label>
              <input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[var(--color-lightblue)]"
              />
            </div>

            <div>
              <label className="block mb-1">When do you go</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-[var(--color-lightblue)]"
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-[var(--color-lightblue)] text-white px-6 py-2 rounded"
              >
                Save
              </button>
            </div>

          </form>

        </div>
      </main>
    </div>
  );
}