"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const CalendarPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const startDay = (firstDay + 6) % 7;
  const prevMonthDays = new Date(year, month, 0).getDate();
  const prevMonth = Array.from({ length: startDay }, (_, i) =>
    prevMonthDays - startDay + i + 1
  );
  const currentMonth = Array.from({ length: totalDays }, (_, i) => i + 1);
  const nextMonth = Array.from(
    { length: 42 - (startDay + totalDays) },
    (_, i) => i + 1
  );
  const handleDateClick = (day: number) => {
    const clicked = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(clicked);
      setEndDate(null);
    } else if (clicked >= startDate) {
      setEndDate(clicked);
    } else {
      setStartDate(clicked);
      setEndDate(null);
    }
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const d = new Date(year, month, day);
    return d >= startDate && d <= endDate;
  };

  const isStart = (day: number) =>
    startDate &&
    day === startDate.getDate() &&
    month === startDate.getMonth() &&
    year === startDate.getFullYear();

  const isEnd = (day: number) =>
    endDate &&
    day === endDate.getDate() &&
    month === endDate.getMonth() &&
    year === endDate.getFullYear();

  const nextMonthHandler = () =>
    setCurrentDate(new Date(year, month + 1, 1));

  const prevMonthHandler = () =>
    setCurrentDate(new Date(year, month - 1, 1));

  const monthName = currentDate.toLocaleString("default", {
    month: "long",
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="w-125 bg-[blue] shadow-2xl relative overflow-hidden flex flex-col font-sans">
        {/* IMAGE SECTION */}
        <div className="relative h-75 w-full">
          <img
            src="https://images.unsplash.com/photo-1522163182402-834f871fd851?q=80&w=2000"
            alt="Climber"
            className="w-full h-full object-cover relative z-10"
            style={{
              clipPath:
                "polygon(28% 100%, 100% 45%, 100% 0, 0 0, 0 73%)",
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full h-50 bg-white z-0"
            style={{
              clipPath:
                "polygon(28% 75%, 77% 100%, 100% 80%, 100% 100%, 0 100%, 0 86%)",
            }}
          />

          {/* Month switch buttons */}
          <div className="absolute top-4 left-4 z-30 flex gap-2">
            <button onClick={prevMonthHandler} className="bg-white/70 px-3 py-1 rounded-full hover:bg-white shadow-md backdrop-blur">
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button onClick={nextMonthHandler} className="bg-white/70 px-3 py-1 rounded-full hover:bg-white shadow-md backdrop-blur">
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>

          <div className="absolute bottom-10 right-6 text-right text-white z-20">
            <div className="text-2xl font-light tracking-widest leading-none">
              {year}
            </div>
            <div className="text-4xl font-black tracking-tighter uppercase">
              {monthName}
            </div>
          </div>
        </div>

        {/* SAME BOTTOM */}
        <div className="flex p-8 gap-8 bg-white">
          {/* Notes */}
          <div className="flex-1">
            <h3 className="text-sm font-bold text-gray-800 mb-4">Notes</h3>
            <div className="space-y-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="border-b border-gray-300 w-full h-4"></div>
              ))}
            </div>
          </div>
          {/* Calendar */}
          <div className="flex-[1.5]">
            {/* Days */}
            <div className="grid grid-cols-7 mb-4">
              {days.map((day) => (
                <span key={day} className={`text-[10px] font-bold text-center ${day === "SAT" || day === "SUN" ? "text-blue-500" : "text-gray-800"}`}>
                  {day}
                </span>
              ))}
            </div>

            {/* Animated grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDate.toISOString()}
                initial={{ x: 60, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -60, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-7 text-center"
              >
                {/* Prev */}
                {prevMonth.map((d) => (
                  <div
                    key={`prev-${d}`}
                    className="py-2 text-xs text-gray-300"
                  >
                    {d}
                  </div>
                ))}
                {/* Current */}
                {currentMonth.map((d) => (
                  <div
                    key={d}
                    onClick={() => handleDateClick(d)}
                    className={`py-2 text-xs font-bold cursor-pointer
                      ${isInRange(d) ? "bg-blue-200" : ""}
                      ${isStart(d) ? "bg-blue-500 text-white rounded-l-full" : ""}
                      ${isEnd(d) ? "bg-blue-500 text-white rounded-r-full" : ""}`}
                  >
                    {d}
                  </div>
                ))}
                {/* Next */}
                {nextMonth.map((d) => (
                  <div key={`next-${d}`} className="py-2 text-xs text-gray-200">
                    {d}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
        <div className="h-12 bg-white"></div>
      </div>
    </div>
  );
};
export default CalendarPage;