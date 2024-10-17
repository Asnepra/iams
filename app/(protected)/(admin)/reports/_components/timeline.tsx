"use client";
import React, { useState } from "react";

const timelineStates = [
  { status: "Creating", description: "Ticket is being created." },
  { status: "Created", description: "Ticket has been created." },
  { status: "Assigned", description: "Ticket has been assigned." },
  { status: "Working On", description: "Work is in progress." },
  { status: "Closed", description: "Ticket has been closed." },
];

export const TicketTimeline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < timelineStates.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="w-full bg-white dark:bg-neutral-950 font-sans px-4 md:px-10">
      <div className="">
        <div className="relative w-full">
          {/* Timeline Beam */}
          <div className="absolute px-2 h-full">
            <div className="w-[2px] h-full bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 " />
          </div>
          {timelineStates.map((item, index) => (
            <div key={index} className="flex items-center pt-10 relative">
              <span className="relative flex h-4 w-4">
                {index < currentIndex ? (
                  <div className="h-4 w-4 rounded-full bg-gradient-to-r from-teal-500 to-blue-500" />
                ) : index === currentIndex ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gradient-to-r from-teal-400 to-blue-500"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-gradient-to-r from-teal-500 to-blue-500"></span>
                  </>
                ) : (
                  <div className={`h-4 w-4 rounded-full border border-gray-500 bg-white dark:bg-gray-600`} />
                )}
              </span>

              <div className="ml-4">
                <h3 className="text-lg font-bold text-neutral-500 dark:text-neutral-500">
                  {item.status}
                </h3>
                <span className="text-sm text-gray-500">
                  {index === currentIndex ? new Date().toLocaleString() : ""} {/* Placeholder timestamp */}
                </span>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

// Tailwind CSS styles for gradient line

export default TicketTimeline;
