"use client";

import { useState } from "react";
import PasswordForm from "./PasswordForm";
import UpcomingForm from "./UpcomingForm";
import UpcomingList from "./UpcomingList";

export type Trip = {
  from: string;
  to: string;
  date: string;
};

export function SwitchForms() {
  const [view, setView] = useState<"password" | "upcoming">("password");
  const [trips, setTrips] = useState<Trip[]>([]);

  const handleAddTrip = (trip: Trip) => {
    setTrips((prev) => [...prev, trip]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {view === "password" ? (
        <PasswordForm onSwitch={setView} />
      ) : (
        <>
          <UpcomingForm onSwitch={setView} onAdd={handleAddTrip} />
          <UpcomingList trips={trips} />
        </>
      )}
    </div>
  );
}