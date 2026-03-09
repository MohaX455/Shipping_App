"use client";

import { useState } from "react";
import PasswordForm from "./PasswordForm";
import UpcomingForm from "./UpcomingForm";


export type Trip = {
  from: string;
  to: string;
  date: string;
  weight: string
};

export function SwitchForms() {
  const [view, setView] = useState<"password" | "upcoming">("password");

  return (
    <div className="px-4 md:px-0">
      {view === "password" ? (
        <PasswordForm onSwitch={setView} />
      ) : (
        <>
          <UpcomingForm onSwitch={setView}/>
        </>
      )}
    </div>
  );
}