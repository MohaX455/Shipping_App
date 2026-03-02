"use client";

import { IMAGE_BASE } from "@/lib/constants";
import Image from "next/image";

type Props = {
  onSwitch: (view: "password" | "upcoming") => void;
};

export default function PasswordForm({ onSwitch }: Props) {
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
          className="w-full bg-[var(--color-gray)] text-black py-3 rounded mb-3"
        >
          Change Password
        </button>

        <button
          onClick={() => onSwitch("upcoming")}
          className="w-full bg-white py-3 rounded text-[var(--color-lightblue)]"
        >
          upcoming list
        </button>

      </aside>

      {/* Main */}
      <main className="flex-1 flex justify-center items-center p-6 bg-gray-100">
        <div className="w-full max-w-xl bg-white shadow-md rounded p-8">
          
          <h1 className="text-2xl font-bold mb-6 text-center">
            Change Password
          </h1>

          <form className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                placeholder="Enter New Password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-lightblue)]"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block mb-1">
                New Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Enter New Confirm Password"
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--color-lightblue)]"
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