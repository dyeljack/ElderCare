// import React from "react";
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




function Sidebar() {
    const [activeTab, setActiveTab] = useState("dashboard");
    
{/* <div className="min-h-screen bg-[#faf8ff] text-[#131b2e] font-sans py-0"> */}

    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-64 bg-[#faf8ff] border-r border-[#c3c6d7] p-6 z-40">
        <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-[#004ac6] tracking-tight">
                ElderCare Connect
            </h1>
            <p className="text-xs font-bold text-[#434655] tracking-widest uppercase mt-1">
                Compassionate Care
            </p>
        </div>
        <button
            className="lg:hidden p-1 text-gray-500 hover:text-gray-800"
            onClick={() => setIsOpenMobile(true)}
            aria-label="Close menu"
        >
            X
            <X className="w-6 h-6" />
        </button>

        <nav className="flex-1 space-y-2">
            {[
                { id: "dashboard", label: "Dashboard", icon: <LayoutDashboard /> },
                { id: "health", label: "Health", icon: <HeartPulse /> },
                { id: "appointments", label: "Appointments", icon: <Calendar /> },
                { id: "caretakers", label: "Caretakers", icon: <Stethoscope /> },
                { id: "family", label: "Family", icon: <Users /> },
                { id: "billing", label: "Billing", icon: <CreditCard /> },
                { id: "settings", label: "Settings", icon: <Settings /> },
            ].map((item) => (
                <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl font-bold text-lg cursor-pointer transition-all ${activeTab === item.id
                            ? "bg-[#2563eb] text-white shadow-sm"
                            : "text-[#434655] hover:bg-[#e2e7ff] hover:text-[#004ac6]"
                        }`}
                >
                    <span className="w-6 h-6">{item.icon}</span>
                    <span>{item.label}</span>
                </button>
            ))}
        </nav>

        <div className="pt-4 border-t border-[#c3c6d7] space-y-1">
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-lg text-[#434655] hover:bg-[#e2e7ff]">
                <HelpCircle className="w-6 h-6" />
                <span>Help Center</span>
            </button>
            <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl font-bold text-lg text-[#ba1a1a] hover:bg-[#ffdad6]">
                <LogOut className="w-6 h-6" />
                <span>Logout</span>
            </button>
        </div>
    </aside>

        }
        export default Sidebar;