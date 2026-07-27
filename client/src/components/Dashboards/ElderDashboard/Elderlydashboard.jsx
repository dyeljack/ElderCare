// import React from 'react';
// import { useState } from 'react';
// import axios from "axios";



// function Elderly() {
//     return (
//            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8 font-size-lg font-family-sans-serif">
//                 <div className="topnavbar navbar navbar-dark bg-gradient-info shadow py-0 mt-0  border-bottom border-2 border-light bg-color-gra flex ">
//                     <li className="ul">Home</li>
//                     <li className="ul">Health</li>
//                     <li className="ul">Profile</li>
//                 </div>

//            </div>
//     );
//                     }

// export default Elderly;

import React, { useState } from "react";
import {
  LayoutDashboard,
  HeartPulse,
  Calendar,
  Stethoscope,
  Users,
  CreditCard,
  Settings,
  HelpCircle,
  LogOut,
  Sun,
  Headset,
  Mic,
  Pill,
  Clock,
  Check,
  CheckCircle2,
  Activity,
  Heart,
  Droplet,
  Menu,
  Bell,
  AlertCircle,
  X,
} from "lucide-react";
import { Sidebar } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [medTaken1, setMedTaken1] = useState(false);
  const [medTaken2, setMedTaken2] = useState(true);
  const [sosActive, setSosActive] = useState(false);

  return (
    <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans py-0 flex">
      {/* 1. Left Sidebar Navigation */}
      <Sidebar />
      {/* 2. Main Content Wrapper */}
      <div className="lg:ml-64 min-h-screen flex flex-col">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex justify-between items-center px-6 py-4 bg-[#faf8ff] border-b border-[#c3c6d7]">
          <div className="flex items-center gap-6">
            <button
          onClick={() => setIsOpenMobile(true)}
          className="lg:hidden p-2 text-[#004ac6] hover:bg-blue-50 rounded-lg"
          aria-label="Open menu"
        >
          <Menu className="w-8 h-8" />
        </button>
            <div className="hidden md:flex items-center gap-8 font-bold text-sm tracking-widest uppercase">
              <span className="text-[#004ac6] hover:text-[#004ac6] cursor-pointer">
                <a href="#dashboard">Dashboard</a>
              </span>
              <span className="text-[#004ac6] hover:text-[#004ac6] cursor-pointer">
                <a href="#health">Health</a>
              </span>
              <span className="text-[#004ac6] hover:text-[#004ac6] cursor-pointer">
                <a href="#family">Family</a>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-[#434655]">
              <Bell className="w-9 h-9" />
              <span className="absolute top-1 right-1 w-3 h-3 bg-[#ba1a1a] rounded-full border-2 border-white" />
            </button>
            <button className="p-2 text-[#434655]">
              <Settings className="w-10 h-10" />
            </button>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA80FYxDo1TBxZ37_Q2cxCzJZ4mDU6k34PyhwvE8sFOEb9E9xkUODle5RdZZrjwsZa2lwRtL79ujO-wD2yeOEkKEWiSneRuHjHrrOSG9_xf7sY6CIxqZNWVu7pzwGTHcEpGCXo-F2A8aUAtetHduH7dlxkZODZQ_IXRcjc07NadXRjnAxsMG9WF8rOsoMP4URvidHik_f96SsTGea5UhNqsQ2VeaUoTc51G4Po2jSW-GK0jz9Jhpi-wkZMK78BEq6-P6axUKR_3EbE"
              alt="Arthur"
              className="w-15 h-15 rounded-full object-cover border-2 border-[#004ac6]"
            />
          </div>
        </header>

        {/* Dashboard Grid Canvas */}
        <main className="p-1 min-w-7xl mx-auto w-full space-y-8">
          {/* Welcome Bento */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white rounded-2xl p-8 border border-[#c3c6d7] shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
              <div>
                <h2 className="text-4xl sm:text-5xl font-black text-[#131b2e] tracking-tight">
                  Good Morning, Arthur
                </h2>
                {/* <div className="flex items-center gap-3 text-[#434655] font-semibold text-2xl mt-2">
                  <Sun className="w-8 h-8 text-[#784b00]" />
                  <span>72°F — Sunny Day</span>
                </div> */}
              </div>
              <button className="px-8 py-4 bg-[#004ac6] text-white rounded-xl font-bold text-xl shadow-md hover:bg-[#003ea8] flex items-center gap-2 cursor-pointer">
                <Headset className="w-10 h-10" />
                <span>Need Help?</span>
              </button>
            </div>

            <button className="bg-[#2563eb] text-white rounded-2xl p-6 border border-[#c3c6d7] flex flex-col items-center justify-center gap-3 hover:bg-[#004ac6] cursor-pointer">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                <Mic className="w-12 h-12" />
              </div>
              <span className="text-3xl font-extrabold">Voice Control</span>
              <p className="text-base text-blue-100">
                "Call my daughter" or "Remind me..."
              </p>
            </button>
          </div>

          {/* Medications & Schedule Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            <div className="xl:col-span-2 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-3xl font-extrabold text-[#131b2e] flex items-center gap-3">
                  <Pill className="w-10 h-10 text-[#004ac6]" />
                  <span>Daily Medications</span>
                </h3>
                {/* <span className="text-xs font-bold text-[#434655] bg-[#eaedff] px-4 py-2 rounded-full border border-[#c3c6d7]">
                  3 REMAINING TODAY
                </span> */}
              </div>

              {/* Pill 1 */}
              <div className="bg-white rounded-2xl p-6 border border-[#c3c6d7] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full">
                  <div className="w-20 h-20 bg-[#dbe1ff] text-[#004ac6] rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-10 h-10" />
                  </div>
                  <div>
                    <span className="text-xl font-extrabold text-[#004ac6]">
                      09:00 AM
                    </span>
                    <h4 className="text-3xl font-black text-[#131b2e]">
                      Heart Medication
                    </h4>
                    <p className="text-[#434655] font-medium text-lg">
                      Take 1 tablet with water after breakfast
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMedTaken1(!medTaken1)}
                  className={`w-full md:w-64 h-20 rounded-xl font-bold text-xl flex items-center justify-center gap-2 cursor-pointer ${medTaken1
                      ? "bg-[#6df5e1] text-[#006f64]"
                      : "bg-[#004ac6] text-white hover:bg-[#003ea8]"
                    }`}
                >
                  <Check className="w-9 h-9" />
                  <span>{medTaken1 ? "Taken" : "Mark Taken"}</span>
                </button>
              </div>
              <br></br>

              {/* Pill 2 */}
              <div className="bg-white rounded-2xl p-6 border border-[#c3c6d7] flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 w-full">
                  <div className="w-20 h-20 bg-[#eaedff] text-[#434655] rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-10 h-10 text-[#006f64]" />
                  </div>
                  <div>
                    <span className="text-xl font-extrabold text-[#004ac6]">
                      07:00 AM
                    </span>
                    <h4 className="text-3xl font-black  text-[#131b2e]">
                      Blood Pressure Pill
                    </h4>
                    <p className="text-[#434655] font-medium text-lg">
                      Check the Blood Pressure before taking the pill and take 1 tablet with water
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setMedTaken2(!medTaken2)}
                  className={`w-full md:w-64 h-20 rounded-xl font-bold text-xl flex items-center justify-center gap-2 cursor-pointer ${medTaken2
                      ? "bg-[#6df5e1] text-[#006f64]"
                      : "bg-[#004ac6] text-white hover:bg-[#003ea8]"
                    }`}
                >
                  <Check className="w-9 h-9" />
                  <span>{medTaken2 ? "Taken" : "Mark Taken"}</span>
                </button>
              </div>
            </div>

            {/* Schedule */}
            <div className="space-y-4">
              <h3 className="text-3xl font-extrabold text-[#131b2e] flex items-center gap-3">
                <Calendar className="w-8 h-8 text-[#004ac6]" />
                <span>Upcoming</span>
              </h3>
              <div className="bg-white rounded-2xl p-6 border border-[#c3c6d7] space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#2563eb] border-4 border-[#dbe1ff] shrink-0" />
                  <div>
                    <p className="text-xl font-bold text-[#2563eb]">11:30 AM</p>
                    <p className="text-xl font-extrabold text-[#131b2e]">
                      Nurse visit: Maria
                    </p>
                    <p className="text-base text-[#434655]">
                      Regular health checkup
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#784b00] border-4 border-[#ffddb8] shrink-0" />
                  <div>
                    <p className="text-xl font-bold text-[#784b00]">02:00 PM</p>
                    <p className="text-xl font-extrabold text-[#131b2e]">
                      Walk in the park
                    </p>
                    <p className="text-base text-[#434655]">Caregiver scheduled</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#006b5f] border-4 border-[#71f8e4] shrink-0" />
                  <div>
                    <p className="text-xl font-bold text-[#006b5f]">06:00 PM</p>
                    <p className="text-xl font-extrabold text-[#131b2e]">
                      Video call with Emily
                    </p>
                    <p className="text-base text-[#434655]">Family catch-up</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Vitals */}
          <div className="space-y-4">
            <h3 className="text-3xl font-extrabold text-[#131b2e] flex items-center gap-3">
              <Activity className="w-8 h-8 text-[#004ac6]" />
              <span>Health Vitals</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 border border-[#c3c6d7] space-y-4">
                <div className="flex justify-between items-start">
                  <Heart className="w-10 h-10 text-[#ba1a1a] fill-[#ba1a1a]" />
                  <span className="bg-[#6df5e1] text-[#006f64] px-4 py-1 rounded-full font-bold text-xs">
                    NORMAL
                  </span>
                </div>
                <div>
                  <p className="text-[#434655] font-bold text-xs uppercase">
                    HEART RATE
                  </p>
                  <p className="text-5xl font-black text-[#131b2e]">
                    72 <span className="text-2xl font-normal text-[#434655]">BPM</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#c3c6d7] space-y-4">
                <div className="flex justify-between items-start">
                  <Activity className="w-10 h-10 text-[#004ac6]" />
                  <span className="bg-[#ffddb8] text-[#653e00] px-4 py-1 rounded-full font-bold text-xs">
                    SLIGHTLY HIGH
                  </span>
                </div>
                <div>
                  <p className="text-[#434655] font-bold text-xs uppercase">
                    BLOOD PRESSURE
                  </p>
                  <p className="text-5xl font-black text-[#131b2e]">
                    135/85 <span className="text-2xl font-normal text-[#434655]">mmHg</span>
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 border border-[#c3c6d7] space-y-4">
                <div className="flex justify-between items-start">
                  <Droplet className="w-10 h-10 text-[#784b00]" />
                  <span className="bg-[#6df5e1] text-[#006f64] px-4 py-1 rounded-full font-bold text-xs">
                    NORMAL
                  </span>
                </div>
                <div>
                  <p className="text-[#434655] font-bold text-xs uppercase">
                    BLOOD SUGAR
                  </p>
                  <p className="text-5xl font-black text-[#131b2e]">
                    98 <span className="text-2xl font-normal text-[#434655]">mg/dL</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Emergency SOS Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setSosActive(!sosActive)}
          className="w-32 h-32 bg-[#ba1a1a] text-white rounded-full flex flex-col items-center justify-center shadow-2xl cursor-pointer hover:scale-105 active:scale-95 transition-all border-4 border-white animate-pulse"
        >
          <AlertCircle className="w-12 h-12" />
          <span className="font-black text-2xl tracking-wide">SOS</span>
        </button>
      </div>
    </div>
  );
}