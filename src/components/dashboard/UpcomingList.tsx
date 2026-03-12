"use client";

import { Trip } from "./SwitchForms";

type Props = {
    trips?: Trip[];
};

export default function UpcomingList({ trips = [] }: Props) {
    if (!trips.length) {
        return (
            <div className="text-center py-10">
                No trips added.
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto py-10 space-y-4">
            {trips.map((trip, index) => (
                <div key={index} className="bg-white shadow rounded p-4 border">
                    <p><strong>From:</strong> {trip.from}</p>
                    <p><strong>To:</strong> {trip.to}</p>
                    <p><strong>Date:</strong> {trip.date}</p>
                </div>
            ))}
        </div>
    );
}